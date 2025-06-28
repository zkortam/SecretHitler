import React from 'react';
import styled from 'styled-components';
import { Colors, Shadows, BorderRadius, Typography, Spacing, Transitions } from '../styles/designSystem';

const Container = styled.div`
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  padding: ${Spacing.lg};
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${Spacing.xl};
`;

const Title = styled.h1`
  font-family: ${Typography.display};
  font-size: 3rem;
  margin-bottom: ${Spacing.sm};
  color: ${Colors.primary};
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  letter-spacing: 2px;
`;

const GameCode = styled.div`
  background: linear-gradient(135deg, ${Colors.glassDark}, ${Colors.glassDarkBorder});
  backdrop-filter: blur(20px);
  border-radius: ${BorderRadius.large};
  padding: ${Spacing.xl};
  margin-bottom: ${Spacing.lg};
  border: 2px solid ${Colors.glassBorder};
  box-shadow: ${Shadows.large};
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${Colors.primary}, ${Colors.secondary});
  }
`;

const CodeTitle = styled.h2`
  font-family: ${Typography.heading};
  font-size: 1.5rem;
  margin-bottom: ${Spacing.md};
  color: ${Colors.primary};
  font-weight: 700;
`;

const CodeDisplay = styled.div`
  font-family: ${Typography.display};
  font-size: 3.5rem;
  font-weight: bold;
  letter-spacing: 1.5rem;
  color: ${Colors.primary};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin: ${Spacing.md} 0;
  padding-left: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    letter-spacing: 1rem;
    padding-left: 1rem;
  }
`;

const CodeDescription = styled.p`
  font-family: ${Typography.body};
  font-size: 1.1rem;
  opacity: 0.9;
  line-height: 1.5;
`;

const PlayerList = styled.div`
  background: linear-gradient(135deg, ${Colors.glassDark}, ${Colors.glassDarkBorder});
  backdrop-filter: blur(20px);
  border-radius: ${BorderRadius.large};
  padding: ${Spacing.xl};
  border: 2px solid ${Colors.glassBorder};
  box-shadow: ${Shadows.large};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${Colors.primary}, ${Colors.secondary});
  }
`;

const PlayerListTitle = styled.h2`
  font-family: ${Typography.heading};
  font-size: 1.8rem;
  margin-bottom: ${Spacing.lg};
  color: ${Colors.primary};
  font-weight: 700;
  text-align: center;
`;

const PlayerItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${Spacing.md};
  margin: ${Spacing.sm} 0;
  background: linear-gradient(135deg, 
    ${props => props.$isHost ? 'rgba(255, 215, 0, 0.15)' : 'rgba(255, 255, 255, 0.08)'}, 
    ${props => props.$isHost ? 'rgba(255, 215, 0, 0.05)' : 'rgba(255, 255, 255, 0.03)'}
  );
  border-radius: ${BorderRadius.medium};
  border: 2px solid ${props => props.$isHost ? Colors.primary : Colors.glassBorder};
  transition: ${Transitions.normal};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${props => props.$isHost ? Colors.primary : 'transparent'};
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${Shadows.medium};
  }
`;

const PlayerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${Spacing.md};
`;

const PlayerAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.$isHost ? Colors.primary : Colors.glassBorder};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: ${props => props.$isHost ? Colors.dark : Colors.light};
  font-size: 1rem;
  font-family: ${Typography.body};
  box-shadow: ${Shadows.small};
`;

const PlayerName = styled.span`
  font-family: ${Typography.body};
  font-size: 1.2rem;
  font-weight: ${props => props.$isHost ? '700' : '600'};
  color: ${props => props.$isHost ? Colors.primary : Colors.light};
`;

const HostBadge = styled.span`
  background: linear-gradient(135deg, ${Colors.primary}, #e6c200);
  color: ${Colors.dark};
  padding: ${Spacing.xs} ${Spacing.sm};
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: bold;
  font-family: ${Typography.body};
  box-shadow: ${Shadows.small};
  border: 1px solid ${Colors.primary};
`;

const Button = styled.button`
  background: linear-gradient(135deg, ${Colors.success}, #45a049);
  color: ${Colors.light};
  border: none;
  padding: ${Spacing.md} ${Spacing.xxl};
  font-size: 1.3rem;
  font-weight: 600;
  font-family: ${Typography.body};
  border-radius: ${BorderRadius.medium};
  cursor: pointer;
  margin: 0.5rem 0 ${Spacing.lg} 0;
  transition: ${Transitions.normal};
  box-shadow: ${Shadows.medium};
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 400px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${Shadows.large};
    
    &::before {
      left: 100%;
    }
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.5), ${Shadows.medium};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const StatusMessage = styled.div`
  text-align: center;
  margin: ${Spacing.lg} 0;
  padding: ${Spacing.lg};
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03));
  border-radius: ${BorderRadius.medium};
  border: 1px solid ${Colors.glassBorder};
  font-family: ${Typography.body};
  font-size: 1.2rem;
  font-weight: 600;
`;

const WaitingMessage = styled.div`
  text-align: center;
  opacity: 0.8;
  padding: ${Spacing.lg};
  font-family: ${Typography.body};
  font-size: 1.1rem;
`;

const LobbyScreen = ({ gameState, playerId, onStartGame }) => {
  if (!gameState) return (
    <Container>
      <Header>
        <Title>Game Lobby</Title>
      </Header>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <p>Loading lobby...</p>
      </div>
    </Container>
  );

  const isHost = gameState.players.find(p => p.id === playerId)?.isHost;
  const canStart = gameState.players.length >= 5 && gameState.players.length <= 10;

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <Container>
      <Header>
        <Title>Game Lobby</Title>
      </Header>

      <GameCode>
        <CodeTitle>Game Code</CodeTitle>
        <CodeDisplay>{gameState.gameId}</CodeDisplay>
        <CodeDescription>Share this code with other players to join the game</CodeDescription>
      </GameCode>

      {isHost && (
        <div style={{ textAlign: 'center' }}>
          <Button 
            onClick={onStartGame} 
            disabled={!canStart}
          >
            Start Game
          </Button>
        </div>
      )}

      <PlayerList>
        <PlayerListTitle>Players ({gameState.players.length}/10)</PlayerListTitle>
        {gameState.players.map((player) => (
          <PlayerItem key={player.id} $isHost={player.isHost}>
            <PlayerInfo>
              <PlayerAvatar $isHost={player.isHost}>
                {getInitials(player.name)}
              </PlayerAvatar>
              <PlayerName $isHost={player.isHost}>
                {player.name}
              </PlayerName>
            </PlayerInfo>
            {player.isHost && <HostBadge>HOST</HostBadge>}
          </PlayerItem>
        ))}
      </PlayerList>

      <StatusMessage>
        {gameState.players.length < 5 ? (
          <p>Waiting for more players... (Need at least 5)</p>
        ) : gameState.players.length > 10 ? (
          <p>Too many players! Maximum is 10</p>
        ) : (
          <p>Ready to start! ({gameState.players.length} players)</p>
        )}
      </StatusMessage>

      {!isHost && (
        <WaitingMessage>
          <p>Waiting for host to start the game...</p>
        </WaitingMessage>
      )}
    </Container>
  );
};

export default LobbyScreen; 