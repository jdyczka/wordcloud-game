import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Game from './components/Game';
import IntroScreen from './components/IntroScreen';
import ResultsScreen from './components/ResultsScreen';
import { GameSet } from './declarations';
import gameSets from './apiData';

type GameStatus = 'intro' | 'game' | 'results';


function App() {

  useEffect(() => {
    setGameData(getGameData());
  }, []);

  const [gameData, setGameData] = useState<GameSet>();
  const [gameStatus, setGameStatus] = useState<GameStatus>('intro');
  const [username, setUsername] = useState('');
  const [points, setPoints] = useState(0);

  const getGameData = () => {
    const setId = Math.floor(Math.random() * gameSets.length);
    return gameSets[setId];
  }

  const handleNameSubmit = (name:string) => {
    setUsername(name);
    setGameStatus('game');
  }

  const handleFinishGame = (points: number) => {
    setPoints(points);
    setGameStatus('results');
  }

  const handleNewGame = () => {
    setGameData(getGameData());
    setPoints(0);
    setGameStatus('game');
  }

  return (
    <Wrapper>
      {gameStatus === 'intro' && <IntroScreen onNameSubmit={handleNameSubmit} />}
      {gameStatus === 'game' && (gameData ? <Game gameData={gameData} onFinishGame={handleFinishGame} /> : 'No data')}
      {gameStatus === 'results' && <ResultsScreen name={username} points={points} onNewGame={handleNewGame} />}

    </Wrapper>
  )
}

export default App;

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
`;