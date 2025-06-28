import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import styled from 'styled-components';
import HomeScreen from './components/HomeScreen';
import LobbyScreen from './components/LobbyScreen';
import GameScreen from './components/GameScreen';
import RoleScreen from './components/RoleScreen';
import GameOverScreen from './components/GameOverScreen';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const App = () => {
  const [socket, setSocket] = useState(null);
  const [gameState, setGameState] = useState(null);
  const [playerRole, setPlayerRole] = useState(null);
  const [currentScreen, setCurrentScreen] = useState('home');
  const [playerId, setPlayerId] = useState(null);
  const [gameOver, setGameOver] = useState(null);

  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to server');
      setPlayerId(newSocket.id);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from server');
      setPlayerId(null);
    });

    newSocket.on('game-updated', (state) => {
      console.log('Game state updated:', state);
      setGameState(state);
    });

    newSocket.on('game-started', (state) => {
      console.log('Game started:', state);
      setGameState(state);
      setCurrentScreen('game');
    });

    newSocket.on('chancellor-nominated', (data) => {
      console.log('Chancellor nominated:', data);
      setGameState(data.gameState);
    });

    newSocket.on('player-joined', (data) => {
      console.log('Player joined:', data);
    });

    newSocket.on('roles-assigned', (roleInfo) => {
      console.log('Role assigned:', roleInfo);
      setPlayerRole(roleInfo);
      setCurrentScreen('role');
    });

    newSocket.on('game-over', (result) => {
      setGameOver(result);
      setCurrentScreen('gameOver');
    });

    newSocket.on('error', (error) => {
      console.error('Socket error:', error);
      alert(error.message);
    });

    return () => {
      newSocket.close();
    };
  }, []);

  const createGame = async (hostName) => {
    if (!hostName || !hostName.trim()) {
      alert('Please enter a valid name');
      return;
    }
    
    try {
      const response = await fetch('/api/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ hostName: hostName.trim() }),
      });
      const data = await response.json();
      
      if (data.success) {
        console.log('Game created, joining as host...');
        socket.emit('join-game', { gameId: data.gameId, playerName: hostName.trim() });
        setCurrentScreen('lobby');
      } else {
        alert('Failed to create game: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error creating game:', error);
      alert('Failed to create game. Please check your connection.');
    }
  };

  const joinGame = (gameId, playerName) => {
    if (!gameId || !gameId.trim() || !playerName || !playerName.trim()) {
      alert('Please enter valid game code and name');
      return;
    }
    
    socket.emit('join-game', { gameId: gameId.trim().toUpperCase(), playerName: playerName.trim() });
    setCurrentScreen('lobby');
  };

  const startGame = () => {
    if (socket) {
      socket.emit('start-game');
    } else {
      alert('Not connected to server');
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onCreateGame={createGame} onJoinGame={joinGame} />;
      case 'lobby':
        return (
          <LobbyScreen
            gameState={gameState}
            playerId={playerId}
            onStartGame={startGame}
          />
        );
      case 'role':
        return (
          <RoleScreen
            roleInfo={playerRole}
            onContinue={() => setCurrentScreen('game')}
          />
        );
      case 'game':
        return (
          <GameScreen
            gameState={gameState}
            playerRole={playerRole}
            playerId={playerId}
            socket={socket}
          />
        );
      case 'gameOver':
        return (
          <GameOverScreen
            result={gameOver}
            onPlayAgain={() => {
              setCurrentScreen('home');
              setGameState(null);
              setPlayerRole(null);
              setGameOver(null);
            }}
          />
        );
      default:
        return <HomeScreen onCreateGame={createGame} onJoinGame={joinGame} />;
    }
  };

  return (
    <AppContainer>
      {renderScreen()}
    </AppContainer>
  );
};

export default App; 