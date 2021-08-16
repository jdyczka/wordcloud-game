import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Button } from "../commonStyled";
import { GameSet } from "../declarations";

interface GameProps {
    gameData: GameSet;
    onFinishGame(points: number): void;
}

interface ClickableWordProps {
    isChosen: boolean;
}

interface ResultWordProps {
    isChosen: boolean;
    isCorrect: boolean;
}

interface WordsProps {
    columns: number;
}

export default function Game({ gameData, onFinishGame }: GameProps) {

    const [isFinished, setIsFinished] = useState(false);
    const [chosenWords, setChosenWords] = useState(new Set());
    const [columns, setColumns] = useState(0);

    let points = useRef<number>(0);

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleAnswer = (word: string) => {
        const newChosenWords = new Set(chosenWords);
        if (chosenWords.has(word)) {
            newChosenWords.delete(word)
        } else {
            newChosenWords.add(word)
        }
        setChosenWords(newChosenWords);
    }

    const handleResize = () => {
        const cols =  Math.ceil(gameData.all_words.length * window.innerWidth / window.innerHeight / 3);
        setColumns(cols);
    }

    const checkResults = () => {

    }

    return (
        <div>
            <Question>{gameData.question}</Question>
            <Wordcloud columns={columns}>
                {
                    isFinished
                        ? gameData.all_words.map(word => {
                                const isChosen = chosenWords.has(word);
                                const isCorrect = gameData.good_words.includes(word);
                                let pointsToAdd = isChosen
                                    ? isCorrect ? 2 : -1
                                    : isCorrect ? -1 : 0;
                                points.current += pointsToAdd;
                                return <ResultWord
                                    as='div'
                                    key={word}
                                    isChosen={isChosen}
                                    isCorrect={isCorrect}
                                >{word}</ResultWord>
                            })
                        : gameData.all_words.map(word => <ClickableWord
                                key={word}
                                isChosen={chosenWords.has(word)}
                                onClick={() => toggleAnswer(word)}
                            >{word}</ClickableWord>)
                }
            </Wordcloud>
            {
                isFinished
                    ? <Button onClick={() => onFinishGame(points.current)}>finish game</Button>
                    : <Button onClick={() => setIsFinished(true)}>check answers</Button>
            }
        </div>
    )

}

const Question = styled.h2`

    &:first-letter {
        text-transform: capitalize;
    }
`;

const Word = styled.button`
    background: none;
    border: none;
    font-weight: 900;
    display: inline-block;

    &:nth-child(2n) {
        transform: translate(10%, 50%)
    }

    &:nth-child(2n + 1) {
        transform: translate(-10%, -50%)
    }
`;

const ClickableWord = styled(Word) <ClickableWordProps>`
    color: ${props => props.isChosen ? '#999' : '#000'};
    cursor: pointer;
`;

const ResultWord = styled(Word) <ResultWordProps>`
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
        bottom: 100%;
        left: 50%;
        transform: translate(-50%);
    }
`;

const Wordcloud = styled.div<WordsProps>`
    border: 1px solid #000;
    border-radius: 5px;
    margin: 20px 0 30px;

    max-width: 600px;
    padding: 2em;
    display: flex;
    flex-wrap: wrap;
    justify-items: center;
    justify-content: center;
    gap: 3em;
    
    ${Word} {
        width: ${props => 100 / props.columns }%;
    }
`;