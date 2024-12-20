import React from 'react';
import { IDiary } from '../hooks/useDiary';
import styled from 'styled-components';
import Button from './Button';
import { getEmotionColorById, getEmotionImgById } from '../utils/util';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { myIdSelector } from '../recoil/tokenAtom';

const Wrapper = styled.div`
    padding: 15px 0px;
    border-bottom: 1px solid #e2e2e2;
    display: flex;
    justify-content: space-between;
    &:last-child {
        border-bottom: none;
    }
`;

const ImgWrapper = styled.div<{ $bgColor: string }>`
    cursor: pointer;
    min-width: 120px;
    height: 80px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    background-color: ${(props) => props.$bgColor};
`;

const Img = styled.img``;

const InfoWrapper = styled.div`
    flex-grow: 1;
    margin-left: 20px;
    cursor: pointer;
`;

const Date = styled.div`
    font-weight: 700;
    font-size: 25px;
    margin-bottom: 5px;
`;

const Title = styled.div`
    font-weight: 400;
    font-size: 18px;
    margin-bottom: 5px;
`;

const Author = styled.div`
    font-size: 14px;
    opacity: 0.8;
`;

const ButtonWrapper = styled.div`
    min-width: 70px;
`;

function Diary(data: IDiary) {
    const navigate = useNavigate();

    const myId = useRecoilValue(myIdSelector);

    const goDetail = () => {
        navigate(`/diary/${data.id}`);
    };

    const goEdit = () => {
        navigate(`/edit/${data.id}`);
    };

    return (
        <Wrapper>
            <ImgWrapper $bgColor={getEmotionColorById(data.status)} onClick={goDetail}>
                <Img src={getEmotionImgById(data.status)} />
            </ImgWrapper>
            <InfoWrapper onClick={goDetail}>
                <Date>{data.today}</Date>
                <Title>{data.title}</Title>
                <Author>{data.username}</Author>
            </InfoWrapper>
            <ButtonWrapper>
                {
                    myId === data.userId && (
                        <Button
                            text={'수정하기'}
                            colorType={'DEFAULT'}
                            onClick={goEdit}
                        />
                    )
                }
            </ButtonWrapper>
        </Wrapper>
    );
}

export default React.memo(Diary);