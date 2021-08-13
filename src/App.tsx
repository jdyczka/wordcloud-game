import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import './App.css';
import Game from './components/Game';


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


function App() {

  useEffect(() => {
    const setId = Math.floor(Math.random() * gameSets.length);
    setGameData(gameSets[setId]);
  }, []);

  const [gameData, setGameData] = useState<GameSet>();

  if (gameData) {
    return (
      <Wrapper>
        <Game gameData={gameData} />
      </Wrapper>
    );

  }
  return <div className="App">No data</div>
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