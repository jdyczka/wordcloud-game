import styled from 'styled-components';

const colorPrimary = '#187cd9';

const Button = styled.button`
    background: none;
    color: ${colorPrimary};
    border: 1px solid ${colorPrimary};
    border-radius: 5px;
    font-weight: 500;
    padding: 7px 35px;
    display: block;
    margin: 10px auto;
    transition: all .3s;

    &:focus, &:hover {
        background: ${colorPrimary}33;
    }
`;

interface HeadingProps {
    color?: string;
}

const Heading = styled.p<HeadingProps>`
    font-size: 1.5em;
    font-weight: 700;
    margin: 0;
    color: ${props => props.color === 'primary' ? colorPrimary : '#000'}
`;

export { Button, Heading };