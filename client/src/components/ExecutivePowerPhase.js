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
  
  @media (max-width: 768px) {
    padding: ${Spacing.lg};
  }
  
  @media (max-width: 480px) {
    padding: ${Spacing.md};
  }
  
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
  
  @media (max-width: 768px) {
    font-size: 1.6rem;
    margin-bottom: ${Spacing.sm};
  }
  
  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`;

const Description = styled.p`
  font-family: ${Typography.body};
  font-size: 1.1rem;
  margin-bottom: ${Spacing.lg};
  opacity: 0.9;
  line-height: 1.5;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: ${Spacing.md};
  }
  
  @media (max-width: 480px) {
    font-size: 0.95rem;
    margin-bottom: ${Spacing.sm};
  }
`;

const PowerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${Spacing.lg};
  margin: ${Spacing.lg} 0;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: ${Spacing.md};
    margin: ${Spacing.md} 0;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: ${Spacing.sm};
    margin: ${Spacing.sm} 0;
  }
`;

const PowerCard = styled.div`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03));
  border-radius: ${BorderRadius.medium};
  padding: ${Spacing.lg};
  border: 3px solid ${props => props.selected ? Colors.primary : Colors.glassBorder};
  cursor: pointer;
  transition: ${Transitions.slow};
  position: relative;
  overflow: hidden;
  box-shadow: ${props => props.selected ? Shadows.glow : Shadows.medium};
  
  @media (max-width: 768px) {
    padding: ${Spacing.md};
  }
  
  @media (max-width: 480px) {
    padding: ${Spacing.sm};
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${Shadows.large};
    border-color: ${Colors.primary};
    
    @media (max-width: 480px) {
      transform: translateY(-1px);
    }
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${props => {
      switch (props.power) {
        case 'investigate': return Colors.warning;
        case 'special-election': return '#9c27b0';
        case 'execute': return Colors.danger;
        default: return Colors.primary;
      }
    }};
  }
`;

const PowerTitle = styled.h3`
  font-family: ${Typography.heading};
  color: ${props => {
    switch (props.power) {
      case 'investigate': return Colors.warning;
      case 'special-election': return '#9c27b0';
      case 'execute': return Colors.danger;
      default: return Colors.light;
    }
  }};
  margin-bottom: ${Spacing.sm};
  font-size: 1.3rem;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: ${Spacing.xs};
  }
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const PowerDescription = styled.p`
  font-family: ${Typography.body};
  font-size: 1rem;
  opacity: 0.9;
  margin-bottom: ${Spacing.md};
  line-height: 1.5;
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
    margin-bottom: ${Spacing.sm};
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-bottom: ${Spacing.xs};
  }
`;

const PlayerSelection = styled.div`
  margin-top: ${Spacing.lg};
  padding: ${Spacing.lg};
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02));
  border-radius: ${BorderRadius.medium};
  border: 1px solid ${Colors.glassBorder};
  
  @media (max-width: 768px) {
    margin-top: ${Spacing.md};
    padding: ${Spacing.md};
  }
  
  @media (max-width: 480px) {
    margin-top: ${Spacing.sm};
    padding: ${Spacing.sm};
  }
`;

const PlayerSelectionTitle = styled.h4`
  font-family: ${Typography.heading};
  font-size: 1.2rem;
  margin-bottom: ${Spacing.md};
  color: ${Colors.primary};
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: ${Spacing.sm};
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: ${Spacing.xs};
  }
`;

const PlayerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${Spacing.sm};
  margin: ${Spacing.md} 0;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: ${Spacing.xs};
    margin: ${Spacing.sm} 0;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: ${Spacing.xs};
    margin: ${Spacing.xs} 0;
  }
`;

const PlayerItem = styled.div`
  background: linear-gradient(135deg, 
    ${props => props.selected ? 'rgba(255, 215, 0, 0.2)' : 'rgba(255, 255, 255, 0.05)'}, 
    ${props => props.selected ? 'rgba(255, 215, 0, 0.1)' : 'rgba(255, 255, 255, 0.02)'}
  );
  padding: ${Spacing.md};
  border-radius: ${BorderRadius.medium};
  cursor: pointer;
  transition: ${Transitions.normal};
  border: 2px solid ${props => props.selected ? Colors.primary : 'transparent'};
  font-family: ${Typography.body};
  font-weight: 600;
  
  @media (max-width: 768px) {
    padding: ${Spacing.sm};
    font-size: 0.95rem;
  }
  
  @media (max-width: 480px) {
    padding: ${Spacing.sm};
    font-size: 0.9rem;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${Shadows.medium};
    background: rgba(255, 255, 255, 0.1);
    
    @media (max-width: 480px) {
      transform: translateY(-1px);
    }
  }
`;

const UseButton = styled.button`
  background: linear-gradient(135deg, ${Colors.success}, #45a049);
  color: ${Colors.light};
  border: none;
  padding: ${Spacing.md} ${Spacing.xl};
  font-size: 1.2rem;
  font-weight: 600;
  font-family: ${Typography.body};
  border-radius: ${BorderRadius.medium};
  cursor: pointer;
  transition: ${Transitions.normal};
  box-shadow: ${Shadows.medium};
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: ${Spacing.sm} ${Spacing.lg};
    font-size: 1.1rem;
  }
  
  @media (max-width: 480px) {
    padding: ${Spacing.sm} ${Spacing.md};
    font-size: 1rem;
    width: 100%;
    max-width: 300px;
  }

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
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.5), ${Shadows.medium};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ResultDisplay = styled.div`
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(255, 215, 0, 0.05));
  border-radius: ${BorderRadius.medium};
  padding: ${Spacing.lg};
  margin: ${Spacing.md} 0;
  border: 2px solid rgba(255, 215, 0, 0.3);
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: ${Spacing.md};
    margin: ${Spacing.sm} 0;
  }
  
  @media (max-width: 480px) {
    padding: ${Spacing.sm};
    margin: ${Spacing.xs} 0;
  }
  
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

const ResultText = styled.p`
  font-family: ${Typography.body};
  font-size: 1.1rem;
  font-weight: 600;
  color: ${Colors.primary};
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

const EmptyState = styled.div`
  font-family: ${Typography.body};
  font-size: 1.1rem;
  opacity: 0.8;
  padding: ${Spacing.lg};
  
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: ${Spacing.md};
  }
  
  @media (max-width: 480px) {
    font-size: 0.95rem;
    padding: ${Spacing.sm};
  }
`;

const ExecutivePowerPhase = ({ powers, players, onUsePower, powerResult }) => {
  const [selectedPower, setSelectedPower] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  if (!powers || powers.length === 0) {
    return (
      <Container>
        <Title>Executive Powers</Title>
        <EmptyState>No executive powers available</EmptyState>
      </Container>
    );
  }

  if (!players || players.length === 0) {
    return (
      <Container>
        <Title>Executive Powers</Title>
        <EmptyState>No players available</EmptyState>
      </Container>
    );
  }

  const getPowerInfo = (power) => {
    switch (power) {
      case 'investigate':
        return {
          title: 'Investigate',
          description: 'Look at a player\'s role card to see if they are Liberal or Fascist'
        };
      case 'special-election':
        return {
          title: 'Special Election',
          description: 'Choose the next President (takes effect after current turn)'
        };
      case 'execute':
        return {
          title: 'Execute',
          description: 'Kill a player (they can no longer participate in the game)'
        };
      default:
        return {
          title: power,
          description: ''
        };
    }
  };

  const handlePowerSelect = (power) => {
    setSelectedPower(power);
    setSelectedPlayer(null);
  };

  const handlePlayerSelect = (playerId) => {
    setSelectedPlayer(playerId);
  };

  const handleUsePower = () => {
    if (selectedPower && selectedPlayer && onUsePower) {
      onUsePower(selectedPower, selectedPlayer);
    }
  };

  const getResultText = () => {
    if (!powerResult) return null;

    switch (powerResult.power) {
      case 'investigate':
        const targetPlayer = players.find(p => p.id === powerResult.targetId);
        return `${targetPlayer?.name} is a ${powerResult.result.toUpperCase()}`;
      case 'special-election':
        const newPresident = players.find(p => p.id === powerResult.targetId);
        return `${newPresident?.name} will be the next President`;
      case 'execute':
        const executedPlayer = players.find(p => p.id === powerResult.targetId);
        return `${executedPlayer?.name} has been executed`;
      default:
        return null;
    }
  };

  const alivePlayers = players.filter(p => p.isAlive);

  return (
    <Container>
      <Title>Executive Powers</Title>
      
      {!selectedPower ? (
        <>
          <Description>Choose an executive power to use:</Description>
          <PowerGrid>
            {powers.map((power, index) => {
              const powerInfo = getPowerInfo(power);
              return (
                <PowerCard
                  key={index}
                  power={power}
                  onClick={() => handlePowerSelect(power)}
                >
                  <PowerTitle power={power}>{powerInfo.title}</PowerTitle>
                  <PowerDescription>{powerInfo.description}</PowerDescription>
                </PowerCard>
              );
            })}
          </PowerGrid>
        </>
      ) : (
        <>
          <Description>Select a target for {getPowerInfo(selectedPower).title}:</Description>
          
          <PlayerSelection>
            <PlayerSelectionTitle>Available Targets</PlayerSelectionTitle>
            <PlayerGrid>
              {alivePlayers.map((player) => (
                <PlayerItem
                  key={player.id}
                  selected={selectedPlayer === player.id}
                  onClick={() => handlePlayerSelect(player.id)}
                >
                  {player.name}
                </PlayerItem>
              ))}
            </PlayerGrid>
          </PlayerSelection>

          <UseButton
            onClick={handleUsePower}
            disabled={!selectedPlayer}
          >
            Use {getPowerInfo(selectedPower).title}
          </UseButton>
        </>
      )}

      {powerResult && (
        <ResultDisplay>
          <ResultText>{getResultText()}</ResultText>
        </ResultDisplay>
      )}
    </Container>
  );
};

export default ExecutivePowerPhase; 