import styled from 'styled-components';
import { emotionList, getEmotionColorById } from '../utils/util';

const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    padding: 20px 20px;
`;

const Section = styled.section`
    width: 100%;
    margin-bottom: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`;

const Title = styled.h4`
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 20px;
`;

const ImgWrapper = styled.div<{ $bgColor: string }>`
    width: 250px;
    height: 250px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background-color: ${(props) => props.$bgColor};
`;

const Img = styled.img``;

const ImgDescription = styled.div`
    font-size: 25px;
    color: white;
`;

const ContentWrapper = styled.div`
    width: 100%;
    background-color: ${(props) => props.theme.inputColor};
    border-radius: 5px;
    word-break: keep-all;
    overflow-wrap: break-word;
`;

const Content = styled.p`
    padding: 20px;
    text-align: left;
    font-size: 20px;
    font-family: Hi Melody, serif;
    font-weight: 400;
    line-height: 2.5;
    white-space: pre-line;
`;

interface IViewer {
    title?: string;
    content?: string;
    emotionId?: number;
}

function Viewer({ title, content, emotionId }: IViewer) {
    const emotionItem = emotionList.find((emotion) => emotion.id === emotionId);
    const bgColor = emotionId ? getEmotionColorById(emotionId) : '#ececec';

    return (
        <Wrapper>
            <Section>
                <Title>오늘의 감정</Title>
                <ImgWrapper $bgColor={bgColor}>
                    <Img src={emotionItem?.img} />
                    <ImgDescription>{emotionItem?.name}</ImgDescription>
                </ImgWrapper>
            </Section>
            <Section>
                <Title>오늘의 한 줄 요약</Title>
                <ContentWrapper>
                    <Content>{title}</Content>
                </ContentWrapper>
            </Section>
            <Section>
                <Title>오늘의 일기</Title>
                <ContentWrapper>
                    <Content>{content}</Content>
                </ContentWrapper>
            </Section>
        </Wrapper>
    );
}

export default Viewer;