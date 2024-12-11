import styled from 'styled-components';
import Button from './Button';
import { emotionList, IEmotion } from '../utils/util';
import EmotionItem from './EmotionItem';

const EditorWrapper = styled.div`
    margin-top: 20px;
`;

const EditorSection = styled.div`
    margin-bottom: 40px;
`;

const Title = styled.h4`
    font-size: 22px;
    font-weight: 600;
`;

const InputWrapper = styled.div`
    padding: 20px 0px;
    input, textarea {
        border: none;
        border-radius: 5px;
        background-color: ${(props) => props.theme.inputColor};
        padding: 20px;
        font-size: 20px;
        font-family: Hi Melody, serif;
    }
    input {
        padding: 10px 0px;
        cursor: pointer;
    }
    textarea {
        width: 100%;
        min-height: 200px;
        box-sizing: border-box;
        resize: vertical;
    }
`;

const EmotionListWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    gap: 2%;
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

function Editor() {
    return(
        <EditorWrapper>
            <EditorSection>
                <Title>오늘의 날짜</Title>
                <InputWrapper>
                    <input type="date" />
                </InputWrapper>
            </EditorSection>
            <EditorSection>
                <Title>오늘의 감정</Title>
                <InputWrapper>
                    <EmotionListWrapper>
                        {
                            emotionList.map((emotion: IEmotion) => (
                                <EmotionItem key={emotion.id} {...emotion} />
                            ))
                        }
                    </EmotionListWrapper>
                </InputWrapper>
            </EditorSection>
            <EditorSection>
                <Title>오늘의 일기</Title>
                <InputWrapper>
                    <textarea />
                </InputWrapper>
            </EditorSection>
            <EditorSection>
                <ButtonWrapper>
                    <Button text={'취소하기'} colorType={'DEFAULT'} onClick={()=>{}} />
                    <Button text={'작성하기'} colorType={'POSITIVE'} onClick={()=>{}} />
                </ButtonWrapper>
            </EditorSection>
        </EditorWrapper>
    );
}

export default Editor;