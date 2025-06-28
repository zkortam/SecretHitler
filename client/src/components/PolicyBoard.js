import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Colors, Shadows, BorderRadius, Typography, Spacing, Transitions } from '../styles/designSystem';

const policyEnacted = keyframes`
  0% { transform: scale(0.8); opacity: 0; }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); opacity: 1; }
`;

const Board = styled.div`
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
    background: linear-gradient(90deg, ${Colors.success}, ${Colors.danger});
  }
`;

const Title = styled.h2`
  font-family: ${Typography.heading};
  text-align: center;
  margin-bottom: ${Spacing.lg};
  color: ${Colors.primary};
  font-size: 2rem;
  font-weight: 700;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

const PolicyTrack = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${Spacing.xl};
  gap: ${Spacing.lg};
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${Spacing.md};
  }
`;

const PolicyColumn = styled.div`
  flex: 1;
  text-align: center;
  padding: ${Spacing.md};
  background: rgba(255, 255, 255, 0.05);
  border-radius: ${BorderRadius.medium};
  border: 1px solid ${Colors.glassBorder};
`;

const PolicyType = styled.h3`
  font-family: ${Typography.heading};
  color: ${props => props.type === 'liberal' ? Colors.success : Colors.danger};
  margin-bottom: ${Spacing.md};
  font-size: 1.3rem;
  font-weight: 700;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
`;

const PolicySlots = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Spacing.xs};
  align-items: center;
`;

const PolicySlot = styled.div`
  width: 50px;
  height: 50px;
  border: 3px solid ${props => props.$filled ? 'transparent' : Colors.glassBorder};
  border-radius: ${BorderRadius.medium};
  background: ${props => props.$filled ? 
    `linear-gradient(135deg, ${props.$type === 'liberal' ? Colors.success : Colors.danger}, ${props.$type === 'liberal' ? '#45a049' : '#d32f2f'})` : 
    'transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  position: relative;
  transition: ${Transitions.slow};
  
  ${props => props.$filled && css`
    animation: ${policyEnacted} 0.6s ease-out;
    box-shadow: 0 0 20px ${props.$type === 'liberal' ? Colors.success : Colors.danger}40;
  `}
  
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
  
  ${props => props.$filled && css`
    &::before {
      opacity: 1;
    }
  `}
`;

const PolicyCount = styled.p`
  font-family: ${Typography.body};
  font-size: 1.1rem;
  font-weight: 600;
  margin-top: ${Spacing.sm};
  color: ${Colors.light};
`;

const ExecutivePowers = styled.div`
  margin-top: ${Spacing.lg};
  padding-top: ${Spacing.md};
  border-top: 2px solid ${Colors.glassBorder};
`;

const ExecutivePowersTitle = styled.h3`
  font-family: ${Typography.heading};
  font-size: 1.4rem;
  margin-bottom: ${Spacing.md};
  color: ${Colors.primary};
  text-align: center;
`;

const PowerList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${Spacing.sm};
  justify-content: center;
`;

const PowerBadge = styled.div`
  background: ${props => {
    switch (props.power) {
      case 'investigate': return 'linear-gradient(135deg, rgba(255, 193, 7, 0.3), rgba(255, 193, 7, 0.1))';
      case 'special-election': return 'linear-gradient(135deg, rgba(156, 39, 176, 0.3), rgba(156, 39, 176, 0.1))';
      case 'execute': return 'linear-gradient(135deg, rgba(244, 67, 54, 0.3), rgba(244, 67, 54, 0.1))';
      default: return 'rgba(255, 255, 255, 0.1)';
    }
  }};
  border: 2px solid ${props => {
    switch (props.power) {
      case 'investigate': return 'rgba(255, 193, 7, 0.5)';
      case 'special-election': return 'rgba(156, 39, 176, 0.5)';
      case 'execute': return 'rgba(244, 67, 54, 0.5)';
      default: return Colors.glassBorder;
    }
  }};
  border-radius: 25px;
  padding: ${Spacing.sm} ${Spacing.md};
  font-size: 0.9rem;
  font-weight: 600;
  font-family: ${Typography.body};
  color: ${props => {
    switch (props.power) {
      case 'investigate': return '#ffc107';
      case 'special-election': return '#9c27b0';
      case 'execute': return '#f44336';
      default: return Colors.light;
    }
  }};
  transition: ${Transitions.normal};
  cursor: help;
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
    box-shadow: ${Shadows.medium};
    
    &::before {
      left: 100%;
    }
  }
`;

const PolicyBoard = ({ enactedPolicies, executivePowers }) => {
  const getPowerDisplayName = (power) => {
    switch (power) {
      case 'investigate': return 'Investigate';
      case 'special-election': return 'Special Election';
      case 'execute': return 'Execute';
      default: return power;
    }
  };

  const getPowerDescription = (power) => {
    switch (power) {
      case 'investigate': return 'Look at a player\'s role';
      case 'special-election': return 'Choose the next President';
      case 'execute': return 'Kill a player';
      default: return '';
    }
  };

  return (
    <Board>
      <Title>Policy Board</Title>
      
      <PolicyTrack>
        <PolicyColumn>
          <PolicyType type="liberal">Liberal Policies</PolicyType>
          <PolicySlots>
            {[...Array(5)].map((_, index) => (
              <PolicySlot
                key={index}
                $type="liberal"
                $filled={index < enactedPolicies.liberal}
              >
                {index < enactedPolicies.liberal && '✓'}
              </PolicySlot>
            ))}
          </PolicySlots>
          <PolicyCount>{enactedPolicies.liberal}/5</PolicyCount>
        </PolicyColumn>

        <PolicyColumn>
          <PolicyType type="fascist">Fascist Policies</PolicyType>
          <PolicySlots>
            {[...Array(6)].map((_, index) => (
              <PolicySlot
                key={index}
                $type="fascist"
                $filled={index < enactedPolicies.fascist}
              >
                {index < enactedPolicies.fascist && '✗'}
              </PolicySlot>
            ))}
          </PolicySlots>
          <PolicyCount>{enactedPolicies.fascist}/6</PolicyCount>
        </PolicyColumn>
      </PolicyTrack>

      {executivePowers.length > 0 && (
        <ExecutivePowers>
          <ExecutivePowersTitle>Executive Powers Available</ExecutivePowersTitle>
          <PowerList>
            {executivePowers.map((power, index) => (
              <PowerBadge 
                key={index} 
                power={power} 
                title={getPowerDescription(power)}
              >
                {getPowerDisplayName(power)}
              </PowerBadge>
            ))}
          </PowerList>
        </ExecutivePowers>
      )}
    </Board>
  );
};

export default PolicyBoard; 