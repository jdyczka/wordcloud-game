import React, { useState } from "react";
import styled from 'styled-components';
import { Button } from "../commonStyled";

interface IntroScreenProps {
    onNameSubmit(name: string): void;
}

export default function IntroScreen({ onNameSubmit }: IntroScreenProps) {

    const [name, setName] = useState('');

    return (
        <Wrapper>
            <h1>Wordcloud game</h1>
            <input
                type="text"
                placeholder="Enter your nickname here..."
                value={name}
                onChange={ev => setName(ev.target.value)} />
            <Button disabled={!name} onClick={() => { onNameSubmit(name) }}>play</Button>
        </Wrapper>
    )
}

const Wrapper = styled.div`

    h1 {
        margin: 10px 20px;
    }

    input[type='text'] {
        padding: 12px 5px;
        margin: 10px auto;  
        width: 100%;

        &::placeholder {
            font-size: .8em;
        }
    }
`;