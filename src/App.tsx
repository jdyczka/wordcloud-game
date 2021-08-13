import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import './App.css';
import Game from './components/Game';
import IntroScreen from './components/IntroScreen';
import ResultsScreen from './components/ResultsScreen';


import { GameSet } from './declarations';

const gameSets: GameSet[] = [
  {
    question: "select animals",
    all_words: [
      "hole",
      "sofa",
      "pear",
      "tiger",
      "oatmeal",
      "square",
      "nut",
      "cub",
      "shirt",
      "tub",
      "passenger",
      "cow"
    ],
    good_words: [
      "tiger",
      "cow",
    ]
  },
  {
    question: "select colors",
    all_words: [
      "jeans",
      "existence",
      "ink",
      "red",
      "blue",
      "yellow",
      "laugh",
      "behavior",
      "expansion",
      "white",
      "black",
      "cakes"
    ],
    good_words: [
      "red",
      "blue",
      "yellow",
      "white",
      "black"
    ]
  },
  {
    question: "select vehicles",
    all_words: [
      "belief",
      "wire",
      "car",
      "bus",
      "star",
      "river",
      "hat",
      "skirt",
      "train",
    ],
    good_words: [
      "car",
      "bus",
      "train"
    ]
  }
];

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
  box-sizing: border-box;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
`;