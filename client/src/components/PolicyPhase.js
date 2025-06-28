import React, { useState } from 'react';
import styled from 'styled-components';
import { Colors, Shadows, BorderRadius, Typography, Spacing, Transitions } from '../styles/designSystem';

const Container = styled.div`
  background: linear-gradient(135deg, ${Colors.glassDark}, ${Colors.glassDarkBorder});
  backdrop-filter: blur(20px);
  border-radius: ${BorderRadius.large};
  padding: ${Spacing.xl};
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

const Title = styled.h2`
  font-family: ${Typography.heading};
  color: ${Colors.primary};
  margin-bottom: ${Spacing.md};
  font-size: 1.8rem;
  font-weight: 700;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

const Description = styled.p`
  font-family: ${Typography.body};
  font-size: 1.1rem;
  margin-bottom: ${Spacing.lg};
  opacity: 0.9;
  line-height: 1.5;
`;

const CardContainer = styled.div`
  display: flex;
  gap: ${Spacing.md};
  justify-content: center;
  margin: ${Spacing.lg} 0;
  flex-wrap: wrap;
`;

const PolicyCard = styled.div`
  width: 140px;
  height: 180px;
  border: 3px solid ${props => props.selected ? Colors.primary : Colors.glassBorder};
  border-radius: ${BorderRadius.medium};
  background: ${props => {
    if (props.type === 'liberal') return `linear-gradient(135deg, ${Colors.success}, #45a049)`;
    if (props.type === 'fascist') return `linear-gradient(135deg, ${Colors.danger}, #d32f2f)`;
    return 'rgba(255, 255, 255, 0.1)';
  }};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: ${Transitions.slow};
  position: relative;
  transform: ${props => props.selected ? 'scale(1.05) rotateY(5deg)' : 'scale(1)'};
  box-shadow: ${props => props.selected ? Shadows.glow : Shadows.medium};

  &:hover {
    transform: scale(1.05) rotateY(5deg);
    box-shadow: ${Shadows.glow};
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.2) 50%, transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: ${BorderRadius.medium};
  }
  
  &:hover::before {
    opacity: 1;
  }
`;

const CardType = styled.div`
  font-family: ${Typography.heading};
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  margin-bottom: ${Spacing.sm};
`;

const CardSymbol = styled.div`
  font-size: 2.5rem;
  margin: ${Spacing.sm} 0;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

const DiscardButton = styled.button`
  background: linear-gradient(135deg, ${Colors.danger}, #d32f2f);
  color: ${Colors.light};
  border: none;
  padding: ${Spacing.md} ${Spacing.lg};
  font-size: 1.2rem;
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
    transform: translateY(-2px);
    box-shadow: ${Shadows.large};
    
    &::before {
      left: 100%;
    }
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.5), ${Shadows.medium};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const RoleReminder = styled.div`
  margin-top: ${Spacing.lg};
  padding: ${Spacing.md};
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(255, 215, 0, 0.05));
  border-radius: ${BorderRadius.medium};
  border: 2px solid rgba(255, 215, 0, 0.3);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${Colors.primary};
  }
`;

const RoleText = styled.p`
  font-family: ${Typography.body};
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
  
  strong {
    color: ${Colors.primary};
    font-weight: 700;
  }
`;

const PolicyPhase = ({ title, cards, onDiscard, playerRole }) => {
  const [selectedCard, setSelectedCard] = useState(null);

  if (!cards || cards.length === 0) {
    return (
      <Container>
        <Title>{title}</Title>
        <Description>No policy cards available</Description>
      </Container>
    );
  }

  const handleCardSelect = (index) => {
    if (index >= 0 && index < cards.length) {
      setSelectedCard(index);
    }
  };

  const handleDiscard = () => {
    if (selectedCard !== null && selectedCard >= 0 && selectedCard < cards.length) {
      onDiscard(selectedCard);
    }
  };

  const getCardSymbol = (type) => {
    return type === 'liberal' ? '✓' : '✗';
  };

  return (
    <Container>
      <Title>{title}</Title>
      
      <Description>Select one policy card to discard:</Description>

      <CardContainer>
        {cards.map((card, index) => (
          <PolicyCard
            key={index}
            type={card}
            selected={selectedCard === index}
            onClick={() => handleCardSelect(index)}
          >
            <CardType>{card.toUpperCase()}</CardType>
            <CardSymbol>{getCardSymbol(card)}</CardSymbol>
          </PolicyCard>
        ))}
      </CardContainer>

      <DiscardButton
        onClick={handleDiscard}
        disabled={selectedCard === null}
      >
        Discard Selected Card
      </DiscardButton>

      {playerRole && (
        <RoleReminder>
          <RoleText>
            <strong>Remember:</strong> You are a {(typeof playerRole === 'string' ? playerRole : playerRole.role).toUpperCase()}. 
            Choose wisely based on your team's goals!
          </RoleText>
        </RoleReminder>
      )}
    </Container>
  );
};

export default PolicyPhase; 