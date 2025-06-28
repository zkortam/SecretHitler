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

const GovernmentInfo = styled.div`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03));
  border-radius: ${BorderRadius.medium};
  padding: ${Spacing.lg};
  margin: ${Spacing.md} 0;
  border: 1px solid ${Colors.glassBorder};
`;

const GovernmentTitle = styled.h3`
  font-family: ${Typography.heading};
  font-size: 1.3rem;
  margin-bottom: ${Spacing.md};
  color: ${Colors.primary};
  font-weight: 700;
`;

const GovernmentMember = styled.p`
  font-family: ${Typography.body};
  font-size: 1.1rem;
  margin: ${Spacing.sm} 0;
  line-height: 1.5;
  
  strong {
    color: ${Colors.primary};
    font-weight: 700;
  }
`;

const VoteButtons = styled.div`
  display: flex;
  gap: ${Spacing.lg};
  justify-content: center;
  margin: ${Spacing.xl} 0;
  flex-wrap: wrap;
`;

const VoteButton = styled.button`
  background: ${props => props.vote === 'ja' ? 
    `linear-gradient(135deg, ${Colors.success}, #45a049)` : 
    `linear-gradient(135deg, ${Colors.danger}, #d32f2f)`};
  color: ${Colors.light};
  border: 3px solid ${props => props.selected ? Colors.primary : 'transparent'};
  padding: ${Spacing.lg} ${Spacing.xl};
  font-size: 1.4rem;
  font-weight: 700;
  font-family: ${Typography.body};
  border-radius: ${BorderRadius.medium};
  cursor: pointer;
  transition: ${Transitions.slow};
  box-shadow: ${Shadows.medium};
  min-width: 140px;
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
    box-shadow: 0 0 0 3px ${props => props.vote === 'ja' ? 'rgba(76, 175, 80, 0.5)' : 'rgba(244, 67, 54, 0.5)'}, ${Shadows.medium};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  &.selected {
    border-color: ${Colors.primary};
    transform: scale(1.05);
    box-shadow: ${Shadows.glow};
  }
`;

const VoteStatus = styled.div`
  margin: ${Spacing.md} 0;
  padding: ${Spacing.lg};
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03));
  border-radius: ${BorderRadius.medium};
  border: 1px solid ${Colors.glassBorder};
`;

const VoteStatusText = styled.p`
  font-family: ${Typography.body};
  font-size: 1.1rem;
  margin: ${Spacing.sm} 0;
  line-height: 1.5;
  
  strong {
    color: ${Colors.primary};
    font-weight: 700;
  }
`;

const VoteProgress = styled.div`
  margin-top: ${Spacing.md};
  padding: ${Spacing.sm};
  background: rgba(255, 255, 255, 0.05);
  border-radius: ${BorderRadius.medium};
  border: 1px solid ${Colors.glassBorder};
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  margin-top: ${Spacing.sm};
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, ${Colors.primary}, ${Colors.secondary});
  width: ${props => props.percentage}%;
  transition: width 0.5s ease;
  border-radius: 4px;
`;

const Question = styled.p`
  font-family: ${Typography.body};
  font-size: 1.2rem;
  margin: ${Spacing.lg} 0;
  font-weight: 600;
  color: ${Colors.light};
`;

const DeadMessage = styled.div`
  background: linear-gradient(135deg, rgba(244, 67, 54, 0.2), rgba(244, 67, 54, 0.1));
  border: 2px solid ${Colors.danger};
  border-radius: ${BorderRadius.medium};
  padding: ${Spacing.lg};
  margin: ${Spacing.md} 0;
`;

const LoadingMessage = styled.div`
  font-family: ${Typography.body};
  font-size: 1.1rem;
  opacity: 0.8;
  padding: ${Spacing.lg};
`;

const VotingPhase = ({ gameState, playerId, onVote, voteResult }) => {
  const [selectedVote, setSelectedVote] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

  if (!gameState || !playerId) {
    return (
      <Container>
        <Title>Voting Phase</Title>
        <LoadingMessage>Loading voting...</LoadingMessage>
      </Container>
    );
  }

  const currentPlayer = gameState.players.find(p => p.id === playerId);
  const president = gameState.players.find(p => p.id === gameState.currentPresident);
  const chancellor = gameState.players.find(p => p.id === gameState.nominatedChancellor);

  if (!currentPlayer) {
    return (
      <Container>
        <Title>Voting Phase</Title>
        <LoadingMessage>Player not found</LoadingMessage>
      </Container>
    );
  }

  const handleVote = (vote) => {
    if (hasVoted || !currentPlayer?.isAlive) return;
    
    setSelectedVote(vote);
    setHasVoted(true);
    onVote(vote);
  };

  if (!currentPlayer?.isAlive) {
    return (
      <Container>
        <Title>Voting Phase</Title>
        <DeadMessage>
          <p>You are dead and cannot vote.</p>
        </DeadMessage>
      </Container>
    );
  }

  const votePercentage = voteResult ? (voteResult.votes / voteResult.total) * 100 : 0;

  if (hasVoted) {
    return (
      <Container>
        <Title>Voting Phase</Title>
        <GovernmentInfo>
          <GovernmentTitle>Proposed Government</GovernmentTitle>
          <GovernmentMember><strong>President:</strong> {president?.name}</GovernmentMember>
          <GovernmentMember><strong>Chancellor:</strong> {chancellor?.name}</GovernmentMember>
        </GovernmentInfo>
        <VoteStatus>
          <VoteStatusText>You voted: <strong>{selectedVote === 'ja' ? 'JA' : 'NEIN'}</strong></VoteStatusText>
          <VoteStatusText>Waiting for other players to vote...</VoteStatusText>
          <VoteProgress>
            <VoteStatusText>Votes: {voteResult?.votes || 0} / {voteResult?.total || gameState.players.filter(p => p.isAlive).length}</VoteStatusText>
            <ProgressBar>
              <ProgressFill percentage={votePercentage} />
            </ProgressBar>
          </VoteProgress>
        </VoteStatus>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Vote on the Government</Title>
      
      <GovernmentInfo>
        <GovernmentTitle>Proposed Government</GovernmentTitle>
        <GovernmentMember><strong>President:</strong> {president?.name}</GovernmentMember>
        <GovernmentMember><strong>Chancellor:</strong> {chancellor?.name}</GovernmentMember>
      </GovernmentInfo>

      <Question>Do you approve this government?</Question>

      <VoteButtons>
        <VoteButton
          vote="ja"
          onClick={() => handleVote('ja')}
          selected={selectedVote === 'ja'}
        >
          JA
        </VoteButton>
        <VoteButton
          vote="nein"
          onClick={() => handleVote('nein')}
          selected={selectedVote === 'nein'}
        >
          NEIN
        </VoteButton>
      </VoteButtons>

      <VoteStatus>
        <VoteProgress>
          <VoteStatusText>Votes: {voteResult?.votes || 0} / {voteResult?.total || gameState.players.filter(p => p.isAlive).length}</VoteStatusText>
          <ProgressBar>
            <ProgressFill percentage={votePercentage} />
          </ProgressBar>
        </VoteProgress>
      </VoteStatus>
    </Container>
  );
};

export default VotingPhase; 