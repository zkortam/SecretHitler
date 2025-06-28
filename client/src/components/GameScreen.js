import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Colors, Shadows, BorderRadius, Typography, Spacing } from '../styles/designSystem';
import PolicyBoard from './PolicyBoard';
import PlayerList from './PlayerList';
import VotingPhase from './VotingPhase';
import PolicyPhase from './PolicyPhase';
import ExecutivePowerPhase from './ExecutivePowerPhase';

const Container = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: ${Spacing.lg};
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: ${Spacing.xl};
  
  @media (max-width: 1200px) {
    grid-template-columns: 1fr 300px;
    gap: ${Spacing.lg};
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${Spacing.md};
    padding: ${Spacing.md};
  }
  
  @media (max-width: 480px) {
    padding: ${Spacing.sm};
    gap: ${Spacing.sm};
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${Spacing.lg};
  grid-column: 1 / -1;
  
  @media (max-width: 768px) {
    margin-bottom: ${Spacing.md};
  }
  
  @media (max-width: 480px) {
    margin-bottom: ${Spacing.sm};
  }
`;

const Title = styled.h1`
  font-family: ${Typography.display};
  font-size: 2.5rem;
  margin-bottom: ${Spacing.sm};
  color: ${Colors.primary};
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  letter-spacing: 2px;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    letter-spacing: 1px;
  }
  
  @media (max-width: 480px) {
    font-size: 1.8rem;
    margin-bottom: ${Spacing.xs};
  }
`;

const GamePhase = styled.div`
  background: linear-gradient(135deg, ${Colors.glassDark}, ${Colors.glassDarkBorder});
  backdrop-filter: blur(20px);
  border-radius: ${BorderRadius.large};
  padding: ${Spacing.md};
  margin-bottom: ${Spacing.sm};
  text-align: center;
  border: 2px solid ${Colors.glassBorder};
  box-shadow: ${Shadows.large};
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: ${Spacing.sm};
    margin-bottom: ${Spacing.xs};
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

const PhaseTitle = styled.h3`
  font-family: ${Typography.heading};
  font-size: 1.4rem;
  margin-bottom: ${Spacing.sm};
  color: ${Colors.primary};
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: ${Spacing.xs};
  }
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const PhaseInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${Spacing.md};
  flex-wrap: wrap;
  margin-top: ${Spacing.sm};
  
  @media (max-width: 768px) {
    gap: ${Spacing.sm};
    margin-top: ${Spacing.xs};
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: ${Spacing.xs};
  }
`;

const FailedElections = styled.div`
  background: linear-gradient(135deg, rgba(244, 67, 54, 0.2), rgba(244, 67, 54, 0.1));
  border: 1px solid rgba(244, 67, 54, 0.3);
  border-radius: ${BorderRadius.medium};
  padding: ${Spacing.sm} ${Spacing.md};
  font-family: ${Typography.body};
  font-weight: 600;
  color: ${Colors.danger};
  
  @media (max-width: 768px) {
    padding: ${Spacing.xs} ${Spacing.sm};
    font-size: 0.9rem;
  }
  
  @media (max-width: 480px) {
    padding: ${Spacing.xs};
    font-size: 0.85rem;
  }
`;

const CurrentPresident = styled.div`
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 215, 0, 0.1));
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: ${BorderRadius.medium};
  padding: ${Spacing.xs} ${Spacing.md};
  font-family: ${Typography.body};
  font-weight: 600;
  color: ${Colors.primary};
  position: relative;
  
  @media (max-width: 768px) {
    padding: ${Spacing.xs} ${Spacing.sm};
    font-size: 0.9rem;
  }
  
  @media (max-width: 480px) {
    padding: ${Spacing.xs};
    font-size: 0.85rem;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;
    background: ${Colors.primary};
    border-radius: ${BorderRadius.medium} 0 0 ${BorderRadius.medium};
  }
`;

const YouIndicator = styled.span`
  color: ${Colors.primary};
  margin-left: ${Spacing.sm};
  font-weight: 700;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
  
  @media (max-width: 480px) {
    margin-left: ${Spacing.xs};
  }
`;

const MainArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Spacing.md};
  
  @media (max-width: 768px) {
    gap: ${Spacing.sm};
  }
  
  @media (max-width: 480px) {
    gap: ${Spacing.xs};
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Spacing.lg};
  position: sticky;
  top: ${Spacing.lg};
  height: fit-content;
  
  @media (max-width: 768px) {
    gap: ${Spacing.md};
    position: static;
    order: -1;
  }
  
  @media (max-width: 480px) {
    gap: ${Spacing.sm};
  }
`;

const VoteResult = styled.div`
  background: ${props => props.voteResult.passed ? 
    'linear-gradient(135deg, rgba(76, 175, 80, 0.2), rgba(76, 175, 80, 0.1))' : 
    'linear-gradient(135deg, rgba(244, 67, 54, 0.2), rgba(244, 67, 54, 0.1))'};
  border: 2px solid ${props => props.voteResult.passed ? Colors.success : Colors.danger};
  border-radius: ${BorderRadius.large};
  padding: ${Spacing.lg};
  text-align: center;
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
    background: ${props => props.voteResult.passed ? Colors.success : Colors.danger};
  }
`;

const VoteResultTitle = styled.h3`
  font-family: ${Typography.heading};
  font-size: 1.5rem;
  margin-bottom: ${Spacing.md};
  color: ${props => props.$passed ? Colors.success : Colors.danger};
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin-bottom: ${Spacing.sm};
  }
  
  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const VoteStats = styled.p`
  font-family: ${Typography.body};
  font-size: 1.2rem;
  margin-bottom: ${Spacing.sm};
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const VoteOutcome = styled.p`
  font-family: ${Typography.body};
  font-size: 1.1rem;
  font-weight: 700;
  color: ${props => props.$passed ? Colors.success : Colors.danger};
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

const LoadingState = styled.div`
  text-align: center;
  padding: ${Spacing.xl};
  font-family: ${Typography.body};
  font-size: 1.1rem;
  opacity: 0.8;
  
  @media (max-width: 768px) {
    padding: ${Spacing.lg};
    font-size: 1rem;
  }
  
  @media (max-width: 480px) {
    padding: ${Spacing.md};
    font-size: 0.95rem;
  }
`;

const ErrorState = styled.div`
  text-align: center;
  padding: ${Spacing.xl};
  font-family: ${Typography.body};
  font-size: 1.1rem;
  color: ${Colors.danger};
  
  @media (max-width: 768px) {
    padding: ${Spacing.lg};
    font-size: 1rem;
  }
  
  @media (max-width: 480px) {
    padding: ${Spacing.md};
    font-size: 0.95rem;
  }
`;

const GameScreen = ({ gameState, playerRole, playerId, socket }) => {
  const [voteResult, setVoteResult] = useState(null);
  const [presidentCards, setPresidentCards] = useState([]);
  const [chancellorCards, setChancellorCards] = useState([]);
  const [executivePowerResult, setExecutivePowerResult] = useState(null);

  useEffect(() => {
    if (!socket) return;

    socket.on('vote-complete', (result) => {
      console.log('Vote complete received:', result);
      setVoteResult(result);
    });

    socket.on('vote-update', (result) => {
      console.log('Vote update received:', result);
      setVoteResult(result);
    });

    socket.on('government-formed', (data) => {
      setPresidentCards(data.presidentCards || []);
    });

    socket.on('government-failed', (data) => {
      setVoteResult(null);
    });

    socket.on('president-discarded', (data) => {
      setChancellorCards(data.remainingCards);
    });

    socket.on('policy-enacted', (result) => {
      setVoteResult(null);
      setPresidentCards([]);
      setChancellorCards([]);
    });

    socket.on('executive-power-used', (result) => {
      setExecutivePowerResult(result);
    });

    socket.on('chancellor-nominated', (data) => {
      console.log('Chancellor nominated:', data);
      setVoteResult(null); // Reset vote state for new nomination
    });

    return () => {
      socket.off('vote-complete');
      socket.off('vote-update');
      socket.off('government-formed');
      socket.off('government-failed');
      socket.off('president-discarded');
      socket.off('policy-enacted');
      socket.off('executive-power-used');
      socket.off('chancellor-nominated');
    };
  }, [socket]);

  const getPhaseDescription = () => {
    switch (gameState?.gamePhase) {
      case 'nomination':
        return 'President nominates a Chancellor';
      case 'voting':
        return 'All players vote on the government';
      case 'president-discard':
        return 'President discards one policy card';
      case 'chancellor-discard':
        return 'Chancellor discards one policy card';
      default:
        return 'Game in progress';
    }
  };

  const isCurrentPresident = gameState?.currentPresident === playerId;
  const isCurrentChancellor = gameState?.currentChancellor === playerId;

  const handleNominateChancellor = (chancellorId) => {
    if (socket && chancellorId) {
      socket.emit('nominate-chancellor', { chancellorId });
    }
  };

  const handleVote = (vote) => {
    console.log('Sending vote:', vote);
    if (socket && (vote === 'ja' || vote === 'nein')) {
      socket.emit('vote', { vote });
    }
  };

  const handlePresidentDiscard = (cardIndex) => {
    if (socket && typeof cardIndex === 'number' && cardIndex >= 0) {
      socket.emit('president-discard', { cardIndex });
    }
  };

  const handleChancellorDiscard = (cardIndex) => {
    if (socket && typeof cardIndex === 'number' && cardIndex >= 0) {
      socket.emit('chancellor-discard', { cardIndex });
    }
  };

  const handleExecutivePower = (power, targetId) => {
    if (socket && power && targetId) {
      socket.emit('use-executive-power', { power, targetId });
    }
  };

  if (!gameState) return (
    <Container>
      <Header>
        <Title>Secret Hitler</Title>
      </Header>
      <LoadingState>Loading game...</LoadingState>
    </Container>
  );

  if (!socket) return (
    <Container>
      <Header>
        <Title>Secret Hitler</Title>
      </Header>
      <ErrorState>Not connected to server. Please refresh the page.</ErrorState>
    </Container>
  );

  return (
    <Container>
      <Header>
        <Title>Secret Hitler</Title>
        <GamePhase>
          <PhaseTitle>Current Phase: {getPhaseDescription()}</PhaseTitle>
          <PhaseInfo>
            {gameState.failedElections > 0 && (
              <FailedElections>
                Failed Elections: {gameState.failedElections}/3
              </FailedElections>
            )}
            {gameState.currentPresident && (
              <CurrentPresident>
                <strong>Current President:</strong> {gameState.players.find(p => p.id === gameState.currentPresident)?.name}
                {isCurrentPresident && <YouIndicator>← YOU!</YouIndicator>}
              </CurrentPresident>
            )}
          </PhaseInfo>
        </GamePhase>
      </Header>

      <MainArea>
        <PolicyBoard 
          enactedPolicies={gameState.enactedPolicies}
          executivePowers={gameState.executivePowers}
        />

        {gameState.gamePhase === 'nomination' && isCurrentPresident && (
          <div>
            <h3>Nominate a Chancellor</h3>
            <PlayerList
              players={gameState.players}
              currentPlayer={playerId}
              onSelectPlayer={handleNominateChancellor}
              excludePlayers={[gameState.lastElectedChancellor]}
              filterAlive={true}
              nominatedChancellor={gameState.nominatedChancellor}
            />
          </div>
        )}

        {gameState.gamePhase === 'voting' && (
          <VotingPhase
            gameState={gameState}
            playerId={playerId}
            onVote={handleVote}
            voteResult={voteResult}
          />
        )}

        {gameState.gamePhase === 'president-discard' && isCurrentPresident && (
          <div>
            <PolicyPhase
              title="President: Discard One Policy"
              cards={presidentCards}
              onDiscard={handlePresidentDiscard}
              playerRole={playerRole}
            />
            
            {gameState.executivePowers.length > 0 && (
              <div style={{ marginTop: '20px' }}>
                <ExecutivePowerPhase
                  powers={gameState.executivePowers}
                  players={gameState.players}
                  onUsePower={handleExecutivePower}
                  powerResult={executivePowerResult}
                />
              </div>
            )}
          </div>
        )}

        {gameState.gamePhase === 'chancellor-discard' && isCurrentChancellor && (
          <PolicyPhase
            title="Chancellor: Discard One Policy"
            cards={chancellorCards}
            onDiscard={handleChancellorDiscard}
            playerRole={playerRole}
          />
        )}

        {gameState.executivePowers.length > 0 && isCurrentPresident && gameState.gamePhase !== 'president-discard' && (
          <ExecutivePowerPhase
            powers={gameState.executivePowers}
            players={gameState.players}
            onUsePower={handleExecutivePower}
            powerResult={executivePowerResult}
          />
        )}

        {voteResult && voteResult.allVoted && (
          <VoteResult voteResult={voteResult}>
            <VoteResultTitle $passed={voteResult.passed}>Vote Result</VoteResultTitle>
            <VoteStats>Ja: {voteResult.jaVotes} | Nein: {voteResult.neinVotes}</VoteStats>
            <VoteOutcome $passed={voteResult.passed}>
              <strong>{voteResult.passed ? 'Government Approved!' : 'Government Rejected!'}</strong>
            </VoteOutcome>
          </VoteResult>
        )}
      </MainArea>

      <Sidebar>
        <PlayerList
          players={gameState.players}
          currentPlayer={playerId}
          showRoles={false}
          compact={true}
          nominatedChancellor={gameState.nominatedChancellor}
        />
      </Sidebar>
    </Container>
  );
};

export default GameScreen; 