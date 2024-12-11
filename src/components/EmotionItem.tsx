import styled from 'styled-components';
import { getEmotionColorById } from '../utils/util';

const EmotionWrapper = styled.div<{ $bgColor: string }>`
    cursor: pointer;
    border-radius: 5px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.$bgColor};
    &:hover {
        opacity: 0.8;
    }
`;

const EmotionImg = styled.img`
    width: 50%;
    margin-bottom: 10px;
`;

const EmotionTitle = styled.span`
    font-size: 18px;
`;

export interface IEmotion {
    id: number;
    name: string;
    img: string;
}

export interface IEmotionItem {
    id: number;
    name: string;
    img: string;
    onClick: (id: number) => void;
    isSelected: boolean;
}

function EmotionItem({ id, img, name, isSelected, onClick }: IEmotionItem) {
    const handleOnClick = () => {
        onClick(id);
    }

    const bgColor = isSelected ? getEmotionColorById(id) : '#ececec';

    return (
        <EmotionWrapper 
            onClick={handleOnClick}
            $bgColor={bgColor}
        >
            <EmotionImg src={img} />
            <EmotionTitle>{name}</EmotionTitle>
        </EmotionWrapper>
    );
}

export default EmotionItem;