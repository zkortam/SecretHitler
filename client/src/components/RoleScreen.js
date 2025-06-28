import React from 'react';
import styled from 'styled-components';
import { Colors, Shadows, BorderRadius, Typography, Spacing, Transitions } from '../styles/designSystem';

const Container = styled.div`
  max-width: 800px;
  width: 100%;
  text-align: center;
  margin: 0 auto;
  padding: ${Spacing.lg};
`;

const RoleCard = styled.div`
  background: linear-gradient(135deg, ${Colors.glassDark}, ${Colors.glassDarkBorder});
  backdrop-filter: blur(20px);
  border-radius: ${BorderRadius.large};
  padding: ${Spacing.xxl} ${Spacing.xl};
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
      switch (props.role) {
        case 'hitler': return `linear-gradient(90deg, ${Colors.danger}, #ff4757)`;
        case 'fascist': return `linear-gradient(90deg, ${Colors.secondary}, #d32f2f)`;
        case 'liberal': return `linear-gradient(90deg, ${Colors.success}, #45a049)`;
        default: return Colors.primary;
      }
    }};
  }
`;

const RoleTitle = styled.h1`
  font-family: ${Typography.display};
  font-size: 3.5rem;
  margin-bottom: ${Spacing.md};
  color: ${props => {
    switch (props.role) {
      case 'hitler': return Colors.danger;
      case 'fascist': return Colors.secondary;
      case 'liberal': return Colors.success;
      default: return Colors.primary;
    }
  }};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  font-weight: 700;
  letter-spacing: 3px;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const RoleDescription = styled.p`
  font-family: ${Typography.body};
  font-size: 1.3rem;
  margin-bottom: ${Spacing.lg};
  line-height: 1.7;
  opacity: 0.95;
  font-weight: 400;
`;

const TeamInfo = styled.div`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03));
  border-radius: ${BorderRadius.medium};
  padding: ${Spacing.lg};
  margin: ${Spacing.md} 0;
  border: 2px solid ${Colors.glassBorder};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${props => {
      switch (props.role) {
        case 'hitler': return Colors.danger;
        case 'fascist': return Colors.secondary;
        case 'liberal': return Colors.success;
        default: return Colors.primary;
      }
    }};
  }
`;

const TeamInfoTitle = styled.h3`
  font-family: ${Typography.heading};
  font-size: 1.4rem;
  margin-bottom: ${Spacing.sm};
  color: ${Colors.primary};
  font-weight: 700;
`;

const TeamInfoText = styled.p`
  font-family: ${Typography.body};
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0;
  opacity: 0.9;
`;

const FascistList = styled.div`
  margin-top: ${Spacing.md};
`;

const FascistItem = styled.div`
  background: linear-gradient(135deg, rgba(255, 107, 107, 0.2), rgba(255, 107, 107, 0.1));
  padding: ${Spacing.sm} ${Spacing.md};
  margin: ${Spacing.sm} 0;
  border-radius: ${BorderRadius.medium};
  border: 2px solid rgba(255, 107, 107, 0.3);
  font-family: ${Typography.body};
  font-weight: 600;
  color: ${Colors.secondary};
  transition: ${Transitions.normal};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${Shadows.medium};
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, ${Colors.success}, #45a049);
  color: ${Colors.light};
  border: none;
  padding: ${Spacing.lg} ${Spacing.xl};
  font-size: 1.3rem;
  font-weight: 600;
  font-family: ${Typography.body};
  border-radius: ${BorderRadius.medium};
  cursor: pointer;
  margin: ${Spacing.md};
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
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.5), ${Shadows.medium};
  }
`;

const Warning = styled.div`
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(255, 215, 0, 0.05));
  border: 2px solid rgba(255, 215, 0, 0.3);
  border-radius: ${BorderRadius.medium};
  padding: ${Spacing.lg};
  margin: ${Spacing.md} 0;
  color: ${Colors.primary};
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

const WarningText = styled.p`
  font-family: ${Typography.body};
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0;
  
  strong {
    color: ${Colors.primary};
    font-weight: 700;
  }
`;

const RoleScreen = ({ roleInfo, onContinue }) => {
  const getRoleDescription = (role) => {
    switch (role) {
      case 'liberal':
        return "You are a Liberal! Your goal is to enact 5 Liberal policies or assassinate Hitler. Work with other Liberals to prevent Fascist policies from being enacted.";
      case 'fascist':
        return "You are a Fascist! Your goal is to enact 6 Fascist policies or get Hitler elected as Chancellor after 3 Fascist policies are enacted. You know the other Fascists.";
      case 'hitler':
        return "You are Hitler! Your goal is the same as the Fascists, but you don't know who the other Fascists are (in 7+ player games). Be careful not to reveal yourself!";
      default:
        return "Unknown role";
    }
  };

  const getWinConditions = (role) => {
    switch (role) {
      case 'liberal':
        return "Win by enacting 5 Liberal policies or assassinating Hitler";
      case 'fascist':
      case 'hitler':
        return "Win by enacting 6 Fascist policies or getting Hitler elected Chancellor after 3 Fascist policies";
      default:
        return "";
    }
  };

  return (
    <Container>
      <RoleCard role={roleInfo.role}>
        <RoleTitle role={roleInfo.role}>
          {roleInfo.role === 'hitler' ? 'HITLER' : 
           roleInfo.role === 'fascist' ? 'FASCIST' : 'LIBERAL'}
        </RoleTitle>
        
        <RoleDescription>
          {getRoleDescription(roleInfo.role)}
        </RoleDescription>

        <TeamInfo role={roleInfo.role}>
          <TeamInfoTitle>Your Mission</TeamInfoTitle>
          <TeamInfoText>{getWinConditions(roleInfo.role)}</TeamInfoText>
        </TeamInfo>

        {(roleInfo.role === 'fascist' || roleInfo.role === 'hitler') && roleInfo.fascistPlayers.length > 0 && (
          <TeamInfo role={roleInfo.role}>
            <TeamInfoTitle>Your Fascist Allies</TeamInfoTitle>
            <FascistList>
              {roleInfo.fascistPlayers.map((playerId, index) => {
                const player = roleInfo.players?.find(p => p.id === playerId);
                return (
                  <FascistItem key={playerId}>
                    {player ? player.name : `Player ${index + 1}`}
                  </FascistItem>
                );
              })}
            </FascistList>
          </TeamInfo>
        )}

        {roleInfo.role === 'fascist' && roleInfo.fascistPlayers.length === 0 && (
          <TeamInfo role={roleInfo.role}>
            <TeamInfoTitle>Your Fascist Allies</TeamInfoTitle>
            <FascistList>
              {roleInfo.players?.map((player) => {
                if (player.role === 'hitler') {
                  return (
                    <FascistItem key={player.id}>
                      {player.name} (HITLER)
                    </FascistItem>
                  );
                }
                return null;
              })}
            </FascistList>
          </TeamInfo>
        )}

        {roleInfo.role === 'hitler' && roleInfo.fascistPlayers.length === 0 && (
          <Warning>
            <WarningText>
              <strong>Important:</strong> You don't know who the other Fascists are. 
              They know you, but you must figure out who they are through gameplay.
            </WarningText>
          </Warning>
        )}

        <Warning>
          <WarningText>
            <strong>Remember:</strong> Keep your role secret! Don't reveal your identity 
            unless it's strategically beneficial for your team.
          </WarningText>
        </Warning>
      </RoleCard>

      <Button onClick={onContinue}>
        Continue to Game
      </Button>
    </Container>
  );
};

export default RoleScreen; 