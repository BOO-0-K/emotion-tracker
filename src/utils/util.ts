import emotion1 from '../assets/emotion1.png';
import emotion2 from '../assets/emotion2.png';
import emotion3 from '../assets/emotion3.png';
import emotion4 from '../assets/emotion4.png';
import emotion5 from '../assets/emotion5.png';

export const getEmotionImgById = (emotionId: number): string => {
    switch (emotionId) {
        case 1:
            return emotion1;
        case 2:
            return emotion2;
        case 3:
            return emotion3;
        case 4:
            return emotion4;
        case 5:
            return emotion5;
        default:
            return '';
    }
}

export interface IEmotion {
    id: number;
    name: string;
    img: string;
}

export const emotionList: IEmotion[] = [
    {
        id: 1,
        name: '완전 좋음',
        img: getEmotionImgById(1),
    },
    {
        id: 2,
        name: '좋음',
        img: getEmotionImgById(2),
    },
    {
        id: 3,
        name: '그럭저럭',
        img: getEmotionImgById(3),
    },
    {
        id: 4,
        name: '나쁨',
        img: getEmotionImgById(4),
    },
    {
        id: 5,
        name: '끔찍함',
        img: getEmotionImgById(5),
    },
];