import styled from 'styled-components';

const SButton = styled.button<{ color: string, disabled: boolean }>`
    cursor: pointer;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 18px;
    white-space: nowrap;
    font-family: 'Nanum Gothic', serif;
    background-color: ${(props) => props.color};
    
    &:hover {
        opacity: ${(props) => props.disabled ? 1 : 0.8};
    }
`;

interface IButton {
    text: string;
    type?: 'submit' | 'button' | 'reset';
    disabled?: boolean;
    colorType: keyof typeof ButtonType;
    onClick?: () => void;
}

enum ButtonType {
    'POSITIVE' = '#64c964',
    'NEGATIVE' = '#fd565f',
    'DEFAULT' = '#ececec',
}

function Button({ text, type, disabled, colorType, onClick }: IButton) {
    return (
        <SButton 
            color={ButtonType[colorType]}
            type={type ?? 'button'}
            onClick={onClick}
            disabled={disabled ?? false}
        >
            {text}
        </SButton>
    );
}

export default Button;