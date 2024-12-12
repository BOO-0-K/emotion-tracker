import styled from 'styled-components';
import { emotionList, getEmotionColorById } from '../utils/util';

const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    padding: 10px 20px;
`;

const Section = styled.section`
    width: 100%;
    margin-bottom: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`;

const Title = styled.h4`
    font-size: 22px;
    font-weight: 500;
    margin-bottom: 20px;
`;

const ImgWrapper = styled.div<{ $bgColor: string }>`
    width: 200px;
    height: 200px;
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
    font-family: 'Sunflower', sans-serif;
    line-height: 2.5;
    white-space: pre-line;
`;

const AuthorWrapper = styled.div`
    display: flex;
    justify-content: end;
`;

const Author = styled.span`
    text-align: right;
`;

interface IViewer {
    title?: string;
    content?: string;
    emotionId?: number;
    author?: string;
}

function Viewer({ title, content, emotionId, author }: IViewer) {
    const emotionItem = emotionList.find((emotion) => emotion.id === emotionId);
    const bgColor = emotionId ? getEmotionColorById(emotionId) : '#ececec';

    return (
        <Wrapper>
            <AuthorWrapper>
                <Author>작성자: {author}</Author>
            </AuthorWrapper>
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