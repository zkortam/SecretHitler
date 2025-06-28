import React, { useState } from 'react';
import styled from 'styled-components';
import { Colors, Shadows, BorderRadius, Typography, Spacing, Transitions } from '../styles/designSystem';

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  text-align: center;
  padding: ${Spacing.lg};
`;

const Title = styled.h1`
  font-family: ${Typography.display};
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: ${Spacing.sm};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  color: ${Colors.primary};
  letter-spacing: 2px;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Subtitle = styled.p`
  font-family: ${Typography.body};
  font-size: 1.3rem;
  font-weight: 300;
  margin-bottom: ${Spacing.xl};
  opacity: 0.9;
  line-height: 1.6;
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${Spacing.xl};
  margin-bottom: ${Spacing.xl};
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${Spacing.lg};
  }
`;

const Card = styled.div`
  background: linear-gradient(135deg, ${Colors.glassDark}, ${Colors.glassDarkBorder});
  backdrop-filter: blur(20px);
  border-radius: ${BorderRadius.large};
  padding: ${Spacing.xl};
  margin-bottom: ${Spacing.lg};
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

const CardTitle = styled.h2`
  font-family: ${Typography.heading};
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: ${Spacing.sm};
  color: ${Colors.primary};
`;

const CardDescription = styled.p`
  font-family: ${Typography.body};
  font-size: 1.1rem;
  margin-bottom: ${Spacing.md};
  opacity: 0.9;
  line-height: 1.5;
`;

const Button = styled.button`
  background: linear-gradient(135deg, ${Colors.secondary}, #ee5a24);
  color: ${Colors.light};
  border: none;
  padding: ${Spacing.sm} ${Spacing.lg};
  font-size: 1.1rem;
  font-weight: 600;
  font-family: ${Typography.body};
  border-radius: ${BorderRadius.medium};
  cursor: pointer;
  margin: ${Spacing.xs};
  transition: ${Transitions.normal};
  box-shadow: ${Shadows.medium};
  position: relative;
  overflow: hidden;

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
    transform: translateY(-2px);
    box-shadow: ${Shadows.large};
    
    &::before {
      left: 100%;
    }
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.5), ${Shadows.medium};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: ${Spacing.sm};
  margin: ${Spacing.sm} 0;
  border: 2px solid ${Colors.glassBorder};
  border-radius: ${BorderRadius.medium};
  background: rgba(255, 255, 255, 0.1);
  color: ${Colors.light};
  font-size: 1rem;
  font-family: ${Typography.body};
  backdrop-filter: blur(10px);
  transition: ${Transitions.normal};

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  &:focus {
    outline: none;
    border-color: ${Colors.primary};
    box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.2);
  }
`;

const GameCodeInput = styled(Input)`
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: bold;
  text-align: center;
  font-size: 1.2rem;
`;

const HowToPlay = styled.div`
  margin-top: ${Spacing.xl};
  opacity: 0.8;
  background: linear-gradient(135deg, ${Colors.glass}, ${Colors.glassBorder});
  border-radius: ${BorderRadius.medium};
  padding: ${Spacing.lg};
  border: 1px solid ${Colors.glassBorder};
`;

const HowToPlayTitle = styled.h3`
  font-family: ${Typography.heading};
  font-size: 1.5rem;
  margin-bottom: ${Spacing.md};
  color: ${Colors.primary};
`;

const HowToPlayList = styled.ul`
  text-align: left;
  display: inline-block;
  list-style: none;
  padding: 0;
`;

const HowToPlayItem = styled.li`
  font-family: ${Typography.body};
  font-size: 1rem;
  margin-bottom: ${Spacing.sm};
  padding-left: ${Spacing.md};
  position: relative;
  line-height: 1.6;
  
  &::before {
    content: '•';
    color: ${Colors.primary};
    font-weight: bold;
    position: absolute;
    left: 0;
  }
`;

const HomeScreen = ({ onCreateGame, onJoinGame }) => {
  const [hostName, setHostName] = useState('');
  const [joinGameCode, setJoinGameCode] = useState('');
  const [joinPlayerName, setJoinPlayerName] = useState('');

  const handleCreateGame = () => {
    if (hostName.trim()) {
      onCreateGame(hostName.trim());
    }
  };

  const handleJoinGame = () => {
    if (joinGameCode.trim() && joinPlayerName.trim()) {
      onJoinGame(joinGameCode.trim().toUpperCase(), joinPlayerName.trim());
    }
  };

  return (
    <Container>
      <Title>Secret Hitler</Title>
      <Subtitle>A digital social deduction game for 5-10 players</Subtitle>

      <CardsContainer>
        <Card>
          <CardTitle>Create a New Game</CardTitle>
          <CardDescription>Host a new game session and invite others to join</CardDescription>
          <Input
            type="text"
            placeholder="Enter your name"
            value={hostName}
            onChange={(e) => setHostName(e.target.value)}
            maxLength={20}
          />
          <Button onClick={handleCreateGame} disabled={!hostName.trim()}>
            Create Game
          </Button>
        </Card>

        <Card>
          <CardTitle>Join an Existing Game</CardTitle>
          <CardDescription>Enter the game code and your name to join</CardDescription>
          <GameCodeInput
            type="text"
            placeholder="Enter 4-letter game code"
            value={joinGameCode}
            onChange={(e) => setJoinGameCode(e.target.value)}
            maxLength={4}
          />
          <Input
            type="text"
            placeholder="Enter your name"
            value={joinPlayerName}
            onChange={(e) => setJoinPlayerName(e.target.value)}
            maxLength={20}
          />
          <Button 
            onClick={handleJoinGame} 
            disabled={!joinGameCode.trim() || !joinPlayerName.trim()}
          >
            Join Game
          </Button>
        </Card>
      </CardsContainer>

      <HowToPlay>
        <HowToPlayTitle>How to Play</HowToPlayTitle>
        <HowToPlayList>
          <HowToPlayItem>5-10 players are secretly divided into Liberals and Fascists</HowToPlayItem>
          <HowToPlayItem>One Fascist is Hitler, who doesn't know other Fascists in 7+ player games</HowToPlayItem>
          <HowToPlayItem>Liberals win by enacting 5 Liberal policies or assassinating Hitler</HowToPlayItem>
          <HowToPlayItem>Fascists win by enacting 6 Fascist policies or getting Hitler elected Chancellor</HowToPlayItem>
        </HowToPlayList>
      </HowToPlay>
    </Container>
  );
};

export default HomeScreen; 