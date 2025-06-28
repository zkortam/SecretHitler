# Secret Hitler - Digital Edition

A fully functional, responsive web application for the social deduction game Secret Hitler, supporting 5-10 players with real-time multiplayer features.

## Features

### Core Game Mechanics
- **Real-time multiplayer** with Socket.IO
- **Private role assignment** (Liberal, Fascist, Hitler)
- **Complete game logic enforcement** including:
  - President nomination and voting
  - Policy card dealing and discarding
  - Executive powers (Investigate, Special Election, Execute)
  - Win condition checking
  - Failed election tracking

### User Interface
- **Mobile-first responsive design** with styled-components
- **Real-time game state updates**
- **Intuitive player interaction** with clear phase indicators
- **Beautiful policy board** showing enacted policies and executive powers
- **Role-specific information** for fascist players

### Technical Features
- **Node.js backend** with Express and Socket.IO
- **React frontend** with modern hooks and state management
- **Robust error handling** and validation
- **Cross-platform compatibility**
- **Real-time synchronization** across all players

## Game Rules

### Setup
- 5-10 players are secretly divided into Liberals and Fascists
- One Fascist is Hitler, who doesn't know other Fascists in 7+ player games
- Liberals know each other, Fascists know each other (except Hitler in 7+ games)

### Gameplay
1. **Nomination Phase**: Current President nominates a Chancellor
2. **Voting Phase**: All players vote Ja/Nein on the government
3. **Policy Phase**: If approved, President discards one policy, then Chancellor discards one
4. **Executive Powers**: Fascist policies may grant executive powers
5. **Next Round**: Presidency passes to the next player

### Win Conditions
- **Liberals win** by enacting 5 Liberal policies or assassinating Hitler
- **Fascists win** by enacting 6 Fascist policies or getting Hitler elected Chancellor after 3 Fascist policies

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
1. Clone the repository:
```bash
git clone <repository-url>
cd SecretHitler
```

2. Install dependencies:
```bash
npm run install-all
```

3. Start the development servers:
```bash
npm run dev
```

This will start:
- Backend server on port 3001
- Frontend development server on port 3000

### Production Build
```bash
npm run build
npm start
```

## Project Structure

```
SecretHitler/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── GameScreen.js
│   │   │   ├── LobbyScreen.js
│   │   │   ├── HomeScreen.js
│   │   │   ├── RoleScreen.js
│   │   │   ├── VotingPhase.js
│   │   │   ├── PolicyPhase.js
│   │   │   ├── ExecutivePowerPhase.js
│   │   │   ├── PlayerList.js
│   │   │   ├── PolicyBoard.js
│   │   │   └── GameOverScreen.js
│   │   ├── App.js          # Main app component
│   │   └── index.js        # Entry point
│   └── public/             # Static assets
├── server/                 # Node.js backend
│   ├── gameManager.js      # Game logic and state management
│   └── index.js           # Express server and Socket.IO
├── package.json           # Root package.json
└── README.md             # This file
```

## Game Flow

1. **Home Screen**: Players create or join games
2. **Lobby**: Players wait for the game to start (5-10 players required)
3. **Role Assignment**: Players see their secret roles
4. **Game Screen**: Main gameplay with real-time updates
5. **Game Over**: Results and option to play again

## Technical Implementation

### Backend (Node.js + Express + Socket.IO)
- **GameManager**: Manages multiple game sessions
- **Game Class**: Handles individual game state and logic
- **Real-time Events**: Socket.IO for instant communication
- **Validation**: Comprehensive input validation and error handling

### Frontend (React + Styled Components)
- **Component Architecture**: Modular, reusable components
- **State Management**: React hooks for local state
- **Real-time Updates**: Socket.IO client for live game updates
- **Responsive Design**: Mobile-first approach with styled-components

### Key Features Implemented
- ✅ Real-time multiplayer with Socket.IO
- ✅ Complete game logic enforcement
- ✅ Private role assignment and communication
- ✅ Policy deck management and shuffling
- ✅ Executive powers (Investigate, Special Election, Execute)
- ✅ Win condition checking
- ✅ Failed election tracking and chaos policy
- ✅ Mobile-responsive UI
- ✅ Error handling and validation
- ✅ Cross-platform compatibility

## API Endpoints

### REST API
- `POST /api/games` - Create a new game
- `GET /api/games/:gameId` - Get game state

### Socket.IO Events
- `join-game` - Join a game session
- `start-game` - Start the game (host only)
- `nominate-chancellor` - Nominate a chancellor
- `vote` - Submit a vote
- `president-discard` - President discards a policy
- `chancellor-discard` - Chancellor discards a policy
- `use-executive-power` - Use an executive power

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Acknowledgments

- Based on the board game "Secret Hitler" by Goat, Wolf, & Cabbage
- Built with modern web technologies for the best gaming experience
