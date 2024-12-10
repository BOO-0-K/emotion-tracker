import styled from 'styled-components';
import { IEmotion } from '../utils/util';

const EmotionWrapper = styled.div`
    cursor: pointer;
    border-radius: 5px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const EmotionImg = styled.img`
    width: 50%;
    margin-bottom: 10px;
`;

const EmotionTitle = styled.span`
    font-size: 18px;
`;

function EmotionItem({ id, img, name }: IEmotion) {
    return (
        <EmotionWrapper>
            <EmotionImg key={id} src={img} />
            <EmotionTitle>{name}</EmotionTitle>
        </EmotionWrapper>
    );
}

export default EmotionItem;