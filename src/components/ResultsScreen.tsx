import React from "react";

interface ResultsScreenProps {
    name: string;
    points: number;
    onNewGame(): void;
}

export default function ResultsScreen({name, points, onNewGame}: ResultsScreenProps) {

    return (
        <div>
            <div>Congratulations, {name}</div>
            <div>Your score:</div>
            <div>{points} points</div>
            <button onClick={onNewGame}>New game</button>
        </div>
    )
}