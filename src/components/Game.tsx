import React, {useState} from "react";
import styled from "styled-components";
import { GameSet } from "../declarations";

interface GameProps {
    gameData: GameSet
}

export default function Game({gameData}: GameProps) {

    const [isFinished, setIsFinished] = useState(false);
    const [chosenWords, setChosenWords] = useState(new Set());

    const toggleAnswer = (word: string) => {
      const newChosenWords = new Set(chosenWords);
      if (chosenWords.has(word)) {
        newChosenWords.delete(word)
      } else {
        newChosenWords.add(word)
      }
      setChosenWords(newChosenWords);
    }
  
    const checkAnswers = () => {
  
    }

    if (isFinished) {
        return (
            <div>
                <div className="question">{gameData.question}</div>
                <Words>
                    {
                        gameData.all_words.map(word => <ResultWord
                            as='div'
                            key={word}
                            isChosen={chosenWords.has(word)}
                            isCorrect={gameData.good_words.includes(word)}
                        >{word}</ResultWord>)
                    }
                </Words>
                <button onClick={() => setIsFinished(true)}>finish game</button>
            </div>
        )
    }

    return (
        <div>
            <div className="question">{gameData.question}</div>
            <Words>
                {
                    gameData.all_words.map(word => <ClickableWord
                        key={word}
                        isChosen={chosenWords.has(word)}
                        onClick={() => toggleAnswer(word)}
                    >{word}</ClickableWord>)
                }
            </Words>
            <button onClick={() => setIsFinished(true)}>check answers</button>
        </div>
    )

}

interface ClickableWordProps {
    isChosen: boolean;
}

interface ResultWordProps {
    isChosen: boolean;
    isCorrect: boolean;
}

const Word = styled.button`
    background: none;
    border: none;
    font-weight: 900;
    padding: 1.5em;
    display: inline-block;
`;

const ClickableWord = styled(Word)<ClickableWordProps>`
    color: ${props => props.isChosen ? '#999' : '#000'};
    cursor: pointer;
`;

const ResultWord = styled(Word)<ResultWordProps>`
    color: ${props => props.isChosen 
        ? (props.isCorrect ? 'green' : 'red') 
        : (props.isCorrect ? '#999' : 'black')};
    position: relative;

    &:before {
        content: ${props => props.isChosen 
            ? (props.isCorrect ? "'good'" : "'bad'") 
            : (props.isCorrect ? "'missed'" : '')};
        opacity: .5;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%);
    }
`;

const Words = styled.div`
    border: 1px solid #000;
    border-radius: 5px;
`;