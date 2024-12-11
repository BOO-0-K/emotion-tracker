import styled from 'styled-components';
import Button from './Button';
import { emotionList, getFormattedDate } from '../utils/util';
import EmotionItem, { IEmotion } from './EmotionItem';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';

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
        font-size: 20px;
        font-family: Hi Melody, serif;
    }
`;

const Input = styled.input`
    padding: 10px 20px;
    cursor: pointer;
`;

const Textarea = styled.textarea`
    width: 100%;
    padding: 20px;
    min-height: 200px;
    box-sizing: border-box;
    resize: vertical;
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

interface IEditor {
    initData?: object;
    onSubmit: () => void;
}

interface IPost {
    today: string;
    status: number;
    content: string;
}

function Editor({ initData, onSubmit }: IEditor) {
    const navigate = useNavigate();

    const [state, setState] = useState<IPost>({
        today: getFormattedDate(new Date()),
        status: 1,
        content: '',
    });

    useEffect(() => {
        console.log(state);
    }, [state]);

    const handleChangeDate = (event: React.FormEvent<HTMLInputElement>) => {
        setState({
            ...state,
            today: event.currentTarget.value,
        });
    }

    const handleChangeStatus = useCallback((emotionId: number) => {
        setState((state) => ({
            ...state,
            status: emotionId,
        }));
    }, []);

    const handleChangeContent = (event: React.FormEvent<HTMLTextAreaElement>) => {
        setState({
            ...state,
            content: event.currentTarget.value,
        });
    }

    const handleOnGoBack = () => {
        navigate(-1);
    };

    const handleSubmit = () => {
        onSubmit();
    };

    return(
        <EditorWrapper>
            <EditorSection>
                <Title>오늘의 날짜</Title>
                <InputWrapper>
                    <Input type="date" value={state.today} onChange={handleChangeDate} />
                </InputWrapper>
            </EditorSection>
            <EditorSection>
                <Title>오늘의 감정</Title>
                <InputWrapper>
                    <EmotionListWrapper>
                        {
                            emotionList.map((emotion: IEmotion) => (
                                <EmotionItem 
                                    key={emotion.id} 
                                    {...emotion}
                                    onClick={handleChangeStatus}
                                    isSelected={state.status === emotion.id}
                                />
                            ))
                        }
                    </EmotionListWrapper>
                </InputWrapper>
            </EditorSection>
            <EditorSection>
                <Title>오늘의 일기</Title>
                <InputWrapper>
                    <Textarea
                        placeholder='오늘 하루는 어땠나요?'
                        value={state.content}
                        onChange={handleChangeContent}
                    />
                </InputWrapper>
            </EditorSection>
            <EditorSection>
                <ButtonWrapper>
                    <Button text={'취소하기'} colorType={'DEFAULT'} onClick={handleOnGoBack} />
                    <Button text={'작성하기'} colorType={'POSITIVE'} onClick={handleSubmit} />
                </ButtonWrapper>
            </EditorSection>
        </EditorWrapper>
    );
}

export default Editor;