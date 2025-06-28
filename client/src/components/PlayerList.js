import React from 'react';
import styled from 'styled-components';
import { Colors, Shadows, BorderRadius, Typography, Spacing, Transitions } from '../styles/designSystem';

const Container = styled.div`
  background: linear-gradient(135deg, ${Colors.glassDark}, ${Colors.glassDarkBorder});
  backdrop-filter: blur(20px);
  border-radius: ${BorderRadius.large};
  padding: ${Spacing.lg};
  border: 2px solid ${Colors.glassBorder};
  box-shadow: ${Shadows.large};
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: ${Spacing.md};
  }
  
  @media (max-width: 480px) {
    padding: ${Spacing.sm};
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

const Title = styled.h3`
  font-family: ${Typography.heading};
  margin-bottom: ${Spacing.md};
  color: ${Colors.primary};
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin-bottom: ${Spacing.sm};
  }
  
  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const PlayerItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${Spacing.md};
  margin: ${Spacing.sm} 0;
  background: linear-gradient(135deg, 
    ${props => props.$isCurrentPlayer ? 'rgba(255, 215, 0, 0.15)' : 'rgba(255, 255, 255, 0.08)'}, 
    ${props => props.$isCurrentPlayer ? 'rgba(255, 215, 0, 0.05)' : 'rgba(255, 255, 255, 0.03)'}
  );
  border: 2px solid ${props => {
    if (props.$isDead) return Colors.dark;
    if (props.$isCurrentPlayer) return Colors.primary;
    if (props.$isPresident) return Colors.primary;
    if (props.$isChancellor) return Colors.secondary;
    return Colors.glassBorder;
  }};
  border-radius: ${BorderRadius.medium};
  position: relative;
  overflow: hidden;
  transition: ${Transitions.normal};
  opacity: ${props => props.$isDead ? 0.5 : 1};
  cursor: ${props => props.$selectable ? 'pointer' : 'default'};
  
  @media (max-width: 768px) {
    padding: ${Spacing.sm} ${Spacing.md};
    margin: ${Spacing.xs} 0;
  }
  
  @media (max-width: 480px) {
    padding: ${Spacing.sm};
    flex-direction: column;
    align-items: flex-start;
    gap: ${Spacing.xs};
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${props => {
      if (props.$isDead) return Colors.dark;
      if (props.$isCurrentPlayer) return Colors.primary;
      if (props.$isPresident) return Colors.primary;
      if (props.$isChancellor) return Colors.secondary;
      return 'transparent';
    }};
  }
  
  &:hover {
    transform: ${props => props.$selectable ? 'translateY(-2px)' : 'none'};
    box-shadow: ${props => props.$selectable ? Shadows.medium : 'none'};
    background: ${props => props.$selectable ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.08)'};
  }
`;

const PlayerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${Spacing.md};
  flex: 1;
  
  @media (max-width: 480px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const PlayerAvatar = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: ${props => {
    if (props.$isDead) return Colors.dark;
    if (props.$isPresident) return Colors.primary;
    if (props.$isChancellor) return Colors.secondary;
    if (props.$isCurrentPlayer) return Colors.info;
    return Colors.glassBorder;
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
  font-size: 1.1rem;
  font-family: ${Typography.body};
  box-shadow: ${Shadows.small};
  border: 2px solid ${props => {
    if (props.$isDead) return Colors.dark;
    if (props.$isPresident) return Colors.primary;
    if (props.$isChancellor) return Colors.secondary;
    if (props.$isCurrentPlayer) return Colors.info;
    return 'transparent';
  }};
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
  
  @media (max-width: 480px) {
    width: 35px;
    height: 35px;
    font-size: 0.9rem;
  }
`;

const PlayerDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Spacing.xs};
  
  @media (max-width: 480px) {
    flex: 1;
  }
`;

const PlayerName = styled.span`
  font-family: ${Typography.body};
  font-weight: ${props => props.$isCurrentPlayer ? '700' : '600'};
  color: ${props => props.$isCurrentPlayer ? Colors.primary : Colors.light};
  font-size: 1.1rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

const StatusBadges = styled.div`
  display: flex;
  gap: ${Spacing.xs};
  flex-wrap: wrap;
  
  @media (max-width: 480px) {
    gap: ${Spacing.xs};
  }
`;

const Badge = styled.span`
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: bold;
  font-family: ${Typography.body};
  background: ${props => {
    switch (props.type) {
      case 'president': return `linear-gradient(135deg, ${Colors.primary}, #e6c200)`;
      case 'chancellor': return `linear-gradient(135deg, ${Colors.secondary}, #d32f2f)`;
      case 'nominated': return `linear-gradient(135deg, ${Colors.success}, #45a049)`;
      case 'dead': return `linear-gradient(135deg, ${Colors.dark}, #424242)`;
      case 'host': return `linear-gradient(135deg, #9c27b0, #7b1fa2)`;
      default: return 'rgba(255, 255, 255, 0.2)';
    }
  }};
  color: ${props => props.type === 'president' || props.type === 'chancellor' ? Colors.dark : Colors.light};
  box-shadow: ${Shadows.small};
  border: 1px solid ${props => {
    switch (props.type) {
      case 'president': return Colors.primary;
      case 'chancellor': return Colors.secondary;
      case 'nominated': return Colors.success;
      case 'dead': return Colors.dark;
      case 'host': return '#9c27b0';
      default: return 'transparent';
    }
  }};
  
  @media (max-width: 480px) {
    font-size: 0.7rem;
    padding: 0.15rem 0.5rem;
  }
`;

const SelectButton = styled.button`
  background: linear-gradient(135deg, ${Colors.success}, #45a049);
  color: ${Colors.light};
  border: none;
  padding: ${Spacing.sm} ${Spacing.md};
  border-radius: ${BorderRadius.medium};
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  font-family: ${Typography.body};
  transition: ${Transitions.normal};
  box-shadow: ${Shadows.small};
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: ${Spacing.xs} ${Spacing.sm};
    font-size: 0.85rem;
  }
  
  @media (max-width: 480px) {
    padding: ${Spacing.xs};
    font-size: 0.8rem;
    width: 100%;
    margin-top: ${Spacing.xs};
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
    transform: translateY(-1px);
    box-shadow: ${Shadows.medium};
    
    &::before {
      left: 100%;
    }
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.5), ${Shadows.small};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${Spacing.lg};
  color: ${Colors.light};
  opacity: 0.7;
  font-family: ${Typography.body};
`;

const PlayerList = ({ 
  players, 
  currentPlayer, 
  onSelectPlayer, 
  excludePlayers = [], 
  filterAlive = false,
  showRoles = false,
  compact = false,
  nominatedChancellor = null
}) => {
  if (!players || players.length === 0) {
    return (
      <Container>
        <Title>Players (0)</Title>
        <EmptyState>No players available</EmptyState>
      </Container>
    );
  }

  const filteredPlayers = players.filter(player => {
    if (filterAlive && !player.isAlive) return false;
    if (excludePlayers.includes(player.id)) return false;
    return true;
  });

  const handlePlayerSelect = (playerId) => {
    if (onSelectPlayer && playerId) {
      onSelectPlayer(playerId);
    }
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <Container>
      <Title>Players ({filteredPlayers.length})</Title>
      {filteredPlayers.map((player) => (
        <PlayerItem
          key={player.id}
          $isDead={!player.isAlive}
          $isPresident={player.isPresident}
          $isChancellor={player.isChancellor}
          $isNominated={player.id === nominatedChancellor}
          $isCurrentPlayer={player.id === currentPlayer}
          $selectable={!!onSelectPlayer && player.isAlive}
          onClick={() => handlePlayerSelect(player.id)}
        >
          <PlayerInfo>
            <PlayerAvatar
              $isDead={!player.isAlive}
              $isPresident={player.isPresident}
              $isChancellor={player.isChancellor}
              $isCurrentPlayer={player.id === currentPlayer}
            >
              {getInitials(player.name)}
            </PlayerAvatar>
            <PlayerDetails>
              <PlayerName $isCurrentPlayer={player.id === currentPlayer}>
                {player.name}
              </PlayerName>
              <StatusBadges>
                {player.isHost && <Badge type="host">HOST</Badge>}
                {player.isPresident && <Badge type="president">PRESIDENT</Badge>}
                {player.isChancellor && <Badge type="chancellor">CHANCELLOR</Badge>}
                {player.id === nominatedChancellor && <Badge type="nominated">NOMINATED</Badge>}
                {!player.isAlive && <Badge type="dead">DEAD</Badge>}
              </StatusBadges>
            </PlayerDetails>
          </PlayerInfo>
          
          {onSelectPlayer && player.isAlive && (
            <SelectButton>
              Select
            </SelectButton>
          )}
        </PlayerItem>
      ))}
    </Container>
  );
};

export default PlayerList; 