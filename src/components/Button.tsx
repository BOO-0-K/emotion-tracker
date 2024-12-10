import styled from 'styled-components';

const SButton = styled.button<{ color: string }>`
    cursor: pointer;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 18px;
    white-space: nowrap;
    font-family: 'Hi Melody', serif;
    background-color: ${(props) => props.color};
    
    &:hover {
        opacity: 0.8;
    }
`;

interface IButton {
    text: string;
    type: keyof typeof ButtonType;
    onClick: () => void;
}

enum ButtonType {
    'POSITIVE' = '#64c964',
    'NEGATIVE' = '#fd565f',
    'DEFAULT' = '#ececec',
}

function Button({ text, type, onClick }: IButton) {
    return (
        <SButton 
            color={ButtonType[type]}
            onClick={onClick}
        >
            {text}
        </SButton>
    );
}

export default Button;