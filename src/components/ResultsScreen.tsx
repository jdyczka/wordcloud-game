import React from "react";
import styled from 'styled-components';
import { Button, Heading } from "../commonStyled";

interface ResultsScreenProps {
    name: string;
    points: number;
    onNewGame(): void;
}

export default function ResultsScreen({name, points, onNewGame}: ResultsScreenProps) {

    return (
        <Wrapper>
            <Heading>Congratulations, {name || 'stranger'}</Heading>
            <Heading>Your score:</Heading>
            <Heading color='primary'>{points} points</Heading>
            <Button onClick={onNewGame}>New game</Button>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    ${Heading}[color] {
        margin: 10px 0 20px;
    }
`;