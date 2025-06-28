const { v4: uuidv4 } = require('uuid');

class GameManager {
  constructor() {
    this.games = new Map();
  }

  createGame(hostName) {
    const gameId = this.generateGameCode();
    const game = new Game(gameId, hostName);
    this.games.set(gameId, game);
    return gameId;
  }

  getGame(gameId) {
    return this.games.get(gameId);
  }

  generateGameCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }
}

class Game {
  constructor(gameId, hostName) {
    this.gameId = gameId;
    this.hostId = null;
    this.players = new Map();
    this.gameState = 'lobby'; // lobby, playing, finished
    this.currentRound = 0;
    this.policyDeck = [];
    this.discardPile = [];
    this.enactedPolicies = { liberal: 0, fascist: 0 };
    this.currentPresident = null;
    this.currentChancellor = null;
    this.nominatedChancellor = null;
    this.votes = new Map();
    this.presidentCards = [];
    this.chancellorCards = [];
    this.failedElections = 0;
    this.lastElectedPresident = null;
    this.lastElectedChancellor = null;
    this.executivePowers = [];
    this.gamePhase = 'nomination'; // nomination, voting, president-discard, chancellor-discard
    this.roles = new Map();
    this.fascistPlayers = [];
    this.hitler = null;
    this.specialElectionTarget = null; // Track special election target
    
    // Add host as first player with a temporary ID
    const tempHostId = uuidv4();
    this.addPlayer(tempHostId, hostName);
    this.hostId = tempHostId;
  }

  addPlayer(playerId, playerName) {
    if (this.gameState !== 'lobby') return false;
    if (this.players.size >= 10) return false;
    
    this.players.set(playerId, {
      id: playerId,
      name: playerName,
      isHost: this.players.size === 0,
      isAlive: true,
      isPresident: false,
      isChancellor: false
    });
    
    return true;
  }

  removePlayer(playerId) {
    this.players.delete(playerId);
    if (this.players.size === 0) {
      // Game should be cleaned up
      return;
    }
    
    // If host left, assign new host
    if (playerId === this.hostId) {
      this.hostId = this.players.keys().next().value;
      this.players.get(this.hostId).isHost = true;
    }
  }

  isHost(playerId) {
    return playerId === this.hostId;
  }

  canStart() {
    const canStart = this.players.size >= 5 && this.players.size <= 10;
    console.log('canStart check:', {
      playerCount: this.players.size,
      canStart: canStart,
      gameState: this.gameState
    });
    return canStart;
  }

  startGame() {
    if (!this.canStart()) return false;
    
    console.log('Starting game with players:', Array.from(this.players.values()).map(p => p.name));
    
    this.gameState = 'playing';
    this.initializeGame();
    this.assignRoles();
    this.shufflePolicyDeck();
    this.selectInitialPresident();
    
    console.log('Game started successfully. Current president:', this.currentPresident);
    
    return true;
  }

  initializeGame() {
    // Initialize policy deck based on player count
    const playerCount = this.players.size;
    let liberalCards, fascistCards;
    
    if (playerCount <= 6) {
      liberalCards = 6;
      fascistCards = 11;
    } else if (playerCount <= 8) {
      liberalCards = 5;
      fascistCards = 13;
    } else {
      liberalCards = 4;
      fascistCards = 15;
    }
    
    this.policyDeck = [];
    for (let i = 0; i < liberalCards; i++) {
      this.policyDeck.push('liberal');
    }
    for (let i = 0; i < fascistCards; i++) {
      this.policyDeck.push('fascist');
    }
  }

  assignRoles() {
    const playerIds = Array.from(this.players.keys());
    const playerCount = playerIds.length;
    
    // Determine role distribution
    let fascistCount, liberalCount;
    if (playerCount <= 6) {
      fascistCount = 2;
      liberalCount = playerCount - 2;
    } else if (playerCount <= 8) {
      fascistCount = 3;
      liberalCount = playerCount - 3;
    } else {
      fascistCount = 4;
      liberalCount = playerCount - 4;
    }
    
    // Shuffle players
    for (let i = playerIds.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [playerIds[i], playerIds[j]] = [playerIds[j], playerIds[i]];
    }
    
    // Assign roles
    this.roles.clear();
    this.fascistPlayers = [];
    
    // Assign Hitler (first fascist)
    this.hitler = playerIds[0];
    this.roles.set(this.hitler, 'hitler');
    this.fascistPlayers.push(this.hitler);
    
    // Assign other fascists
    for (let i = 1; i < fascistCount; i++) {
      this.roles.set(playerIds[i], 'fascist');
      this.fascistPlayers.push(playerIds[i]);
    }
    
    // Assign liberals
    for (let i = fascistCount; i < playerIds.length; i++) {
      this.roles.set(playerIds[i], 'liberal');
    }
  }

  shufflePolicyDeck() {
    for (let i = this.policyDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.policyDeck[i], this.policyDeck[j]] = [this.policyDeck[j], this.policyDeck[i]];
    }
  }

  selectInitialPresident() {
    const alivePlayers = Array.from(this.players.keys()).filter(id => this.players.get(id).isAlive);
    this.currentPresident = alivePlayers[Math.floor(Math.random() * alivePlayers.length)];
    this.players.get(this.currentPresident).isPresident = true;
    
    console.log('Initial president selected:', {
      presidentId: this.currentPresident,
      presidentName: this.players.get(this.currentPresident).name,
      totalPlayers: alivePlayers.length
    });
  }

  nominateChancellor(presidentId, chancellorId) {
    if (presidentId !== this.currentPresident) return false;
    if (!this.players.get(chancellorId)?.isAlive) return false;
    if (chancellorId === this.lastElectedChancellor) return false;
    if (this.gamePhase !== 'nomination') return false;
    
    this.nominatedChancellor = chancellorId;
    this.players.get(chancellorId).isChancellor = true;
    this.gamePhase = 'voting';
    this.votes.clear();
    
    return true;
  }

  vote(playerId, vote) {
    if (this.gamePhase !== 'voting') return false;
    if (!this.players.get(playerId)?.isAlive) return false;
    if (this.votes.has(playerId)) return false;
    if (vote !== 'ja' && vote !== 'nein') return false;
    
    this.votes.set(playerId, vote);
    
    // Check if all alive players have voted
    const alivePlayers = Array.from(this.players.keys()).filter(id => this.players.get(id).isAlive);
    const allVoted = alivePlayers.every(id => this.votes.has(id));
    
    return { allVoted, totalVotes: this.votes.size, totalPlayers: alivePlayers.length };
  }

  getVoteResult() {
    const totalVotes = this.votes.size;
    const alivePlayers = Array.from(this.players.keys()).filter(id => this.players.get(id).isAlive).length;
    
    console.log('Vote result calculation:', {
      totalVotes,
      alivePlayers,
      votes: Array.from(this.votes.entries()),
      players: Array.from(this.players.entries()).map(([id, player]) => ({ id, name: player.name, isAlive: player.isAlive }))
    });
    
    // Only return complete result if ALL alive players have voted
    if (totalVotes < alivePlayers) {
      return { complete: false, votes: totalVotes, total: alivePlayers };
    }
    
    const jaVotes = Array.from(this.votes.values()).filter(vote => vote === 'ja').length;
    const neinVotes = totalVotes - jaVotes;
    const passed = jaVotes > neinVotes;
    
    console.log('Vote result:', { jaVotes, neinVotes, passed, totalVotes });
    
    return {
      complete: true,
      passed,
      jaVotes,
      neinVotes,
      totalVotes
    };
  }

  handleVoteResult(passed) {
    // Clear votes for next round
    this.votes.clear();
    
    if (passed) {
      this.currentChancellor = this.nominatedChancellor;
      this.lastElectedPresident = this.currentPresident;
      this.lastElectedChancellor = this.currentChancellor;
      this.failedElections = 0;
      this.gamePhase = 'president-discard';
      this.dealCards();
    } else {
      this.failedElections++;
      this.players.get(this.nominatedChancellor).isChancellor = false;
      this.nominatedChancellor = null;
      
      if (this.failedElections >= 3) {
        // Chaos - enact top policy
        if (this.policyDeck.length === 0) {
          this.reshuffleDiscard();
        }
        if (this.policyDeck.length > 0) {
          const topPolicy = this.policyDeck.pop();
          this.enactedPolicies[topPolicy]++;
          this.checkWinConditions();
        }
      }
      
      // Move to next president and reset nomination phase
      this.nextPresident();
      this.gamePhase = 'nomination';
      this.currentChancellor = null;
    }
  }

  dealCards() {
    this.presidentCards = [];
    for (let i = 0; i < 3; i++) {
      if (this.policyDeck.length === 0) {
        this.reshuffleDiscard();
      }
      this.presidentCards.push(this.policyDeck.pop());
    }
  }

  reshuffleDiscard() {
    this.policyDeck = [...this.discardPile];
    this.discardPile = [];
    this.shufflePolicyDeck();
  }

  presidentDiscard(presidentId, cardIndex) {
    if (presidentId !== this.currentPresident) return false;
    if (this.gamePhase !== 'president-discard') return false;
    if (cardIndex < 0 || cardIndex >= this.presidentCards.length) return false;
    if (!this.players.get(presidentId)?.isAlive) return false;
    
    const discardedCard = this.presidentCards.splice(cardIndex, 1)[0];
    this.discardPile.push(discardedCard);
    this.chancellorCards = [...this.presidentCards];
    this.presidentCards = [];
    this.gamePhase = 'chancellor-discard';
    
    return true;
  }

  chancellorDiscard(chancellorId, cardIndex) {
    if (chancellorId !== this.currentChancellor) return false;
    if (this.gamePhase !== 'chancellor-discard') return false;
    if (cardIndex < 0 || cardIndex >= this.chancellorCards.length) return false;
    if (!this.players.get(chancellorId)?.isAlive) return false;
    
    const discardedCard = this.chancellorCards.splice(cardIndex, 1)[0];
    this.discardPile.push(discardedCard);
    const enactedCard = this.chancellorCards[0];
    this.chancellorCards = [];
    
    return this.enactPolicy(enactedCard);
  }

  enactPolicy(policyType) {
    this.enactedPolicies[policyType]++;
    
    // Check for executive powers
    if (policyType === 'fascist') {
      this.checkExecutivePowers();
    }
    
    // Check win conditions
    const winResult = this.checkWinConditions();
    if (winResult.gameOver) {
      this.gameState = 'finished';
      return winResult;
    }
    
    // Next round
    this.nextPresident();
    this.gamePhase = 'nomination';
    this.players.get(this.currentChancellor).isChancellor = false;
    this.currentChancellor = null;
    this.nominatedChancellor = null;
    
    return {
      enactedPolicy: policyType,
      enactedPolicies: this.enactedPolicies,
      gameOver: false
    };
  }

  checkExecutivePowers() {
    const fascistCount = this.enactedPolicies.fascist;
    const playerCount = this.players.size;
    
    if (fascistCount === 1 && playerCount >= 7) {
      this.executivePowers.push('investigate');
    } else if (fascistCount === 2 && playerCount >= 7) {
      this.executivePowers.push('investigate');
    } else if (fascistCount === 3) {
      this.executivePowers.push('special-election');
    } else if (fascistCount === 4) {
      this.executivePowers.push('execute');
    } else if (fascistCount === 5) {
      this.executivePowers.push('execute');
    }
  }

  useExecutivePower(presidentId, power, targetId) {
    if (presidentId !== this.currentPresident) return false;
    if (!this.executivePowers.includes(power)) return false;
    if (!this.players.get(presidentId)?.isAlive) return false;
    if (targetId && !this.players.get(targetId)?.isAlive) return false;
    
    const powerIndex = this.executivePowers.indexOf(power);
    this.executivePowers.splice(powerIndex, 1);
    
    return true;
  }

  getExecutivePowerResult(power, targetId) {
    switch (power) {
      case 'investigate':
        const targetRole = this.roles.get(targetId);
        return {
          power: 'investigate',
          targetId,
          result: targetRole === 'fascist' || targetRole === 'hitler' ? 'fascist' : 'liberal'
        };
      case 'special-election':
        this.specialElectionTarget = targetId;
        return { power: 'special-election', targetId };
      case 'execute':
        this.players.get(targetId).isAlive = false;
        return { power: 'execute', targetId };
      default:
        return null;
    }
  }

  checkWinConditions() {
    // Liberal win conditions
    if (this.enactedPolicies.liberal >= 5) {
      return {
        gameOver: true,
        winner: 'liberal',
        reason: '5 Liberal policies enacted'
      };
    }
    
    // Fascist win conditions
    if (this.enactedPolicies.fascist >= 6) {
      return {
        gameOver: true,
        winner: 'fascist',
        reason: '6 Fascist policies enacted'
      };
    }
    
    // Hitler assassination
    if (!this.players.get(this.hitler)?.isAlive) {
      return {
        gameOver: true,
        winner: 'liberal',
        reason: 'Hitler was executed'
      };
    }
    
    // Hitler elected as Chancellor after 3 Fascist policies
    if (this.enactedPolicies.fascist >= 3 && 
        this.currentChancellor === this.hitler) {
      return {
        gameOver: true,
        winner: 'fascist',
        reason: 'Hitler was elected Chancellor'
      };
    }
    
    return { gameOver: false };
  }

  nextPresident() {
    const alivePlayers = Array.from(this.players.keys()).filter(id => this.players.get(id).isAlive);
    
    if (alivePlayers.length === 0) {
      // No alive players - game should end
      return;
    }
    
    // Clear current president status
    if (this.currentPresident && this.players.get(this.currentPresident)) {
      this.players.get(this.currentPresident).isPresident = false;
    }
    
    // Check if there's a special election target
    if (this.specialElectionTarget && this.players.get(this.specialElectionTarget)?.isAlive) {
      this.currentPresident = this.specialElectionTarget;
      this.specialElectionTarget = null; // Clear the special election target
    } else {
      // If current president is dead, doesn't exist, or is not in alive players, start from beginning
      if (!this.currentPresident || 
          !this.players.get(this.currentPresident)?.isAlive || 
          !alivePlayers.includes(this.currentPresident)) {
        this.currentPresident = alivePlayers[0];
      } else {
        // Find next alive president
        const currentIndex = alivePlayers.indexOf(this.currentPresident);
        const nextIndex = (currentIndex + 1) % alivePlayers.length;
        this.currentPresident = alivePlayers[nextIndex];
      }
    }
    
    // Set new president
    this.players.get(this.currentPresident).isPresident = true;
    
    console.log('Next president selected:', {
      newPresident: this.currentPresident,
      presidentName: this.players.get(this.currentPresident)?.name,
      alivePlayers: alivePlayers.length,
      wasSpecialElection: this.specialElectionTarget === null && this.currentPresident !== null
    });
  }

  getPublicState() {
    return {
      gameId: this.gameId,
      gameState: this.gameState,
      players: Array.from(this.players.values()).map(player => ({
        id: player.id,
        name: player.name,
        isHost: player.isHost,
        isAlive: player.isAlive,
        isPresident: player.isPresident,
        isChancellor: player.isChancellor
      })),
      currentPresident: this.currentPresident,
      currentChancellor: this.currentChancellor,
      nominatedChancellor: this.nominatedChancellor,
      lastElectedChancellor: this.lastElectedChancellor,
      enactedPolicies: this.enactedPolicies,
      failedElections: this.failedElections,
      gamePhase: this.gamePhase,
      executivePowers: this.executivePowers,
      policyDeckSize: this.policyDeck.length,
      discardPileSize: this.discardPile.length
    };
  }

  getPlayerRoles(playerId) {
    const playerRole = this.roles.get(playerId);
    const playerCount = this.players.size;
    
    let roleInfo = {
      role: playerRole,
      fascistPlayers: [],
      players: Array.from(this.players.values())
    };
    
    // Fascists know each other and know who Hitler is
    if (playerRole === 'fascist') {
      // Fascists know all other fascists (including Hitler)
      roleInfo.fascistPlayers = this.fascistPlayers.filter(id => id !== playerId);
    }
    
    // Hitler doesn't know other fascists in 7+ player games
    if (playerRole === 'hitler' && playerCount >= 7) {
      // Hitler doesn't know other fascists
      roleInfo.fascistPlayers = [];
    }
    
    return roleInfo;
  }

  getCurrentPresident() {
    return this.currentPresident;
  }

  getCurrentChancellor() {
    return this.currentChancellor;
  }

  getChancellorCards() {
    return this.chancellorCards;
  }

  getPresidentCards() {
    return this.presidentCards;
  }
}

module.exports = GameManager; 