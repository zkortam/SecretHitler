const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const GameManager = require('./gameManager');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

const gameManager = new GameManager();

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// API Routes
app.post('/api/games', (req, res) => {
  const { hostName } = req.body;
  const gameId = gameManager.createGame(hostName);
  res.json({ gameId, success: true });
});

app.get('/api/games/:gameId', (req, res) => {
  const { gameId } = req.params;
  const game = gameManager.getGame(gameId);
  if (game) {
    res.json({ game: game.getPublicState(), success: true });
  } else {
    res.status(404).json({ error: 'Game not found', success: false });
  }
});

// Socket.IO event handlers
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-game', ({ gameId, playerName }) => {
    const game = gameManager.getGame(gameId);
    console.log('Join game attempt:', { gameId, playerName, socketId: socket.id });
    
    if (game) {
      // Check if this is the host joining (first player)
      const isHostJoining = game.players.size === 1 && game.players.values().next().value.name === playerName;
      
      console.log('Join game details:', {
        isHostJoining,
        currentPlayers: game.players.size,
        firstPlayerName: game.players.values().next().value?.name
      });
      
      if (isHostJoining) {
        // Host is already in the game, just update their socket ID
        const hostPlayer = game.players.values().next().value;
        const oldId = hostPlayer.id;
        hostPlayer.id = socket.id;
        game.hostId = socket.id;
        
        // Update currentPresident if the host was the president
        if (game.currentPresident === oldId) {
          game.currentPresident = socket.id;
          // Also update isPresident flag
          hostPlayer.isPresident = true;
          // Remove isPresident from oldId if it exists
          if (game.players.has(oldId)) {
            game.players.get(oldId).isPresident = false;
          }
        }
        // Remove the oldId entry from players map if it exists
        if (oldId !== socket.id && game.players.has(oldId)) {
          game.players.delete(oldId);
        }
        // Ensure the new socket.id is the key in the players map
        game.players.set(socket.id, hostPlayer);
        
        console.log('Host joined, updated socket ID:', { oldId, newId: socket.id, hostName: hostPlayer.name });
      } else if (game.addPlayer(socket.id, playerName)) {
        // Regular player joining
        console.log('Regular player joined:', playerName);
      } else {
        socket.emit('error', { message: 'Failed to join game' });
        return;
      }
      
      socket.join(gameId);
      socket.gameId = gameId;
      socket.playerId = socket.id;
      
      // Send game state to all players in the room
      const gameState = game.getPublicState();
      console.log('Sending game state to room:', gameState);
      console.log('Current president in game state:', gameState.currentPresident);
      io.to(gameId).emit('game-updated', gameState);
      io.to(gameId).emit('player-joined', { playerName, playerId: socket.id });
    } else {
      socket.emit('error', { message: 'Game not found' });
    }
  });

  socket.on('start-game', () => {
    const game = gameManager.getGame(socket.gameId);
    console.log('Start game attempt:', {
      gameExists: !!game,
      isHost: game?.isHost(socket.id),
      canStart: game?.canStart(),
      playerCount: game?.players.size
    });
    
    if (game && game.isHost(socket.id) && game.canStart()) {
      const success = game.startGame();
      if (success) {
        console.log('Game started successfully, sending roles to players');
        
        // First, send game-started event to all players to move them to game screen
        io.to(socket.gameId).emit('game-started', game.getPublicState());
        
        // Then send roles to each player individually
        game.players.forEach((player, playerId) => {
          const roleInfo = game.getPlayerRoles(playerId);
          console.log(`Sending role to player ${player.name} (${playerId}):`, roleInfo);
          
          // Use the player's socket ID to send the role
          // For the host, make sure we're using the updated socket ID
          const targetSocketId = player.isHost ? game.hostId : playerId;
          io.to(targetSocketId).emit('roles-assigned', roleInfo);
        });
        
        console.log('Game state after start:', {
          currentPresident: game.currentPresident,
          presidentName: game.players.get(game.currentPresident)?.name,
          allPlayers: Array.from(game.players.values()).map(p => ({ id: p.id, name: p.name, isPresident: p.isPresident }))
        });
      } else {
        socket.emit('error', { message: 'Failed to start game' });
      }
    } else {
      socket.emit('error', { message: 'Cannot start game' });
    }
  });

  socket.on('nominate-chancellor', ({ chancellorId }) => {
    console.log('Nominate chancellor event received:', { 
      socketId: socket.id, 
      chancellorId, 
      gameId: socket.gameId 
    });
    
    const game = gameManager.getGame(socket.gameId);
    console.log('Game found:', !!game, 'Current president:', game?.currentPresident);
    
    if (game && game.nominateChancellor(socket.id, chancellorId)) {
      console.log('Chancellor nominated successfully');
      io.to(socket.gameId).emit('chancellor-nominated', {
        president: game.getCurrentPresident(),
        chancellor: game.getCurrentChancellor(),
        gameState: game.getPublicState()
      });
      io.to(socket.gameId).emit('game-updated', game.getPublicState());
    } else {
      console.log('Failed to nominate chancellor');
    }
  });

  socket.on('vote', ({ vote }) => {
    console.log('Vote received:', { socketId: socket.id, vote });
    const game = gameManager.getGame(socket.gameId);
    if (game) {
      const voteResult = game.vote(socket.id, vote);
      if (voteResult) {
        console.log('Vote accepted for player:', socket.id, 'All voted:', voteResult.allVoted);
        
        // Send vote update to all players
        io.to(socket.gameId).emit('vote-update', {
          votes: voteResult.totalVotes,
          total: voteResult.totalPlayers,
          allVoted: voteResult.allVoted
        });
        
        // Only process vote result if all players have voted
        if (voteResult.allVoted) {
          const finalVoteResult = game.getVoteResult();
          console.log('All votes in, processing result:', finalVoteResult);
          
          if (finalVoteResult.complete) {
            console.log('Vote complete, handling result...');
            // Handle the vote result
            game.handleVoteResult(finalVoteResult.passed);
            
            io.to(socket.gameId).emit('vote-complete', finalVoteResult);
            io.to(socket.gameId).emit('game-updated', game.getPublicState());
            
            if (finalVoteResult.passed) {
              console.log('Government approved, forming government...');
              io.to(socket.gameId).emit('government-formed', {
                president: game.getCurrentPresident(),
                chancellor: game.getCurrentChancellor(),
                presidentCards: game.getPresidentCards()
              });
            } else {
              console.log('Government rejected, moving to next president...');
              io.to(socket.gameId).emit('government-failed', game.getPublicState());
            }
          }
        }
      } else {
        console.log('Vote rejected for player:', socket.id);
      }
    }
  });

  socket.on('president-discard', ({ cardIndex }) => {
    const game = gameManager.getGame(socket.gameId);
    if (game && game.presidentDiscard(socket.id, cardIndex)) {
      io.to(socket.gameId).emit('president-discarded', {
        remainingCards: game.getChancellorCards(),
        gameState: game.getPublicState()
      });
      io.to(socket.gameId).emit('game-updated', game.getPublicState());
    }
  });

  socket.on('chancellor-discard', ({ cardIndex }) => {
    const game = gameManager.getGame(socket.gameId);
    const result = game && game.chancellorDiscard(socket.id, cardIndex);
    if (result) {
      io.to(socket.gameId).emit('policy-enacted', result);
      io.to(socket.gameId).emit('game-updated', game.getPublicState());
      
      if (result.gameOver) {
        io.to(socket.gameId).emit('game-over', result);
      }
    }
  });

  socket.on('use-executive-power', ({ power, targetId }) => {
    const game = gameManager.getGame(socket.gameId);
    if (game && game.useExecutivePower(socket.id, power, targetId)) {
      const result = game.getExecutivePowerResult(power, targetId);
      io.to(socket.gameId).emit('executive-power-used', result);
      io.to(socket.gameId).emit('game-updated', game.getPublicState());
      
      // Check for win conditions after execution
      if (power === 'execute') {
        const winResult = game.checkWinConditions();
        if (winResult.gameOver) {
          game.gameState = 'finished';
          io.to(socket.gameId).emit('game-over', winResult);
        }
      }
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    if (socket.gameId) {
      const game = gameManager.getGame(socket.gameId);
      if (game) {
        game.removePlayer(socket.id);
        io.to(socket.gameId).emit('player-left', { playerId: socket.id });
        io.to(socket.gameId).emit('game-updated', game.getPublicState());
      }
    }
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 