import React from 'react';
import { IDiary } from '../hooks/useDiary';
import styled from 'styled-components';
import Button from './Button';
import { getEmotionColorById, getEmotionImgById } from '../utils/util';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
    padding: 15px 0px;
    border-bottom: 1px solid #e2e2e2;
    display: flex;
    justify-content: space-between;
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
    font-weight: 600;
    font-size: 25px;
    margin-bottom: 5px;
`;

const Title = styled.div`
    font-size: 18px;
`;

const ButtonWrapper = styled.div`
    min-width: 70px;
`;

function Diary(data: IDiary) {
    const navigate = useNavigate();

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
            </InfoWrapper>
            <ButtonWrapper>
                <Button
                    text={'수정하기'}
                    colorType={'DEFAULT'}
                    onClick={goEdit}
                />
            </ButtonWrapper>
        </Wrapper>
    );
}

export default React.memo(Diary);