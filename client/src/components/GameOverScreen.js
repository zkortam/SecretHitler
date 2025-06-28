import React from 'react';
import styled from 'styled-components';
import { Colors, Shadows, BorderRadius, Typography, Spacing, Transitions } from '../styles/designSystem';

const Container = styled.div`
  max-width: 800px;
  width: 100%;
  text-align: center;
  margin: 0 auto;
  padding: ${Spacing.xl};
`;

const ResultCard = styled.div`
  background: linear-gradient(135deg, ${Colors.glassDark}, ${Colors.glassDarkBorder});
  backdrop-filter: blur(20px);
  border-radius: ${BorderRadius.large};
  padding: ${Spacing.xxl};
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
    height: 6px;
    background: ${props => {
      if (props.winner === 'liberal') return `linear-gradient(90deg, ${Colors.success}, #45a049)`;
      if (props.winner === 'fascist') return `linear-gradient(90deg, ${Colors.danger}, #d32f2f)`;
      return Colors.primary;
    }};
  }
`;

const Title = styled.h1`
  font-family: ${Typography.display};
  font-size: 3.5rem;
  margin-bottom: ${Spacing.md};
  color: ${Colors.primary};
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  letter-spacing: 3px;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const WinnerTitle = styled.h2`
  font-family: ${Typography.heading};
  font-size: 2.5rem;
  margin-bottom: ${Spacing.lg};
  color: ${props => {
    if (props.winner === 'liberal') return Colors.success;
    if (props.winner === 'fascist') return Colors.danger;
    return Colors.primary;
  }};
  font-weight: 700;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Reason = styled.p`
  font-family: ${Typography.body};
  font-size: 1.3rem;
  margin-bottom: ${Spacing.xl};
  line-height: 1.6;
  opacity: 0.9;
  font-weight: 400;
`;

const Button = styled.button`
  background: linear-gradient(135deg, ${Colors.primary}, #e6c200);
  color: ${Colors.dark};
  border: none;
  padding: ${Spacing.lg} ${Spacing.xl};
  font-size: 1.3rem;
  font-weight: 600;
  font-family: ${Typography.body};
  border-radius: ${BorderRadius.medium};
  cursor: pointer;
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
    transform: translateY(-3px);
    box-shadow: ${Shadows.large};
    
    &::before {
      left: 100%;
    }
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.5), ${Shadows.medium};
  }
`;

const GameOverScreen = ({ result, onPlayAgain }) => (
  <Container>
    <ResultCard winner={result?.winner}>
      <Title>Game Over</Title>
      <WinnerTitle winner={result?.winner}>
        {result?.winner ? `${result.winner.toUpperCase()}S WIN!` : 'Game Ended'}
      </WinnerTitle>
      <Reason>{result?.reason}</Reason>
    </ResultCard>
    
    <Button onClick={onPlayAgain}>
      Back to Home
    </Button>
  </Container>
);

export default GameOverScreen; 