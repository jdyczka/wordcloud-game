import React, {useState} from "react";

interface IntroScreenProps {
    onNameSubmit(name: string): void;
}

export default function IntroScreen({onNameSubmit}: IntroScreenProps) {

    const [name, setName] = useState('');

    return (
        <div>
            <h1>Wordcloud game</h1>
            <input 
                type="text" 
                placeholder="Enter your nickname here..." 
                value={name}
                onChange={ev => setName(ev.target.value)}/>
            <button onClick={() => {onNameSubmit(name)}}>play</button>
        </div>
    )
}