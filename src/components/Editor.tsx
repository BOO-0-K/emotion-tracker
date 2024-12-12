import styled from 'styled-components';
import Button from './Button';
import { emotionList, getFormattedDate } from '../utils/util';
import EmotionItem, { IEmotion } from './EmotionItem';
import { useNavigate } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react';

const EditorWrapper = styled.div`
    margin-top: 20px;
`;

const EditorSection = styled.div`
    margin-bottom: 20px;
`;

const Title = styled.h4`
    font-size: 22px;
    font-weight: 500;
`;

const InputWrapper = styled.div`
    padding: 20px 0px;
    input, textarea {
        border: none;
        border-radius: 5px;
        background-color: ${(props) => props.theme.inputColor};
        font-size: 20px;
        font-family: 'Sunflower', sans-serif;
    }
`;

const Input = styled.input`
    padding: 10px 20px;
    &[type='date'] {
        cursor: pointer;
    }
    &[type='text'] {
        width: 100%;
    }
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
    initData?: IPost;
    onSubmit: (data: IPost) => void;
    disabled: boolean;
}

export interface IPost {
    title: string;
    today: string;
    status: number;
    content: string;
}

function Editor({ initData, onSubmit, disabled }: IEditor) {
    const navigate = useNavigate();

    const [state, setState] = useState<IPost>({
        title: '',
        today: getFormattedDate(new Date()),
        status: 1,
        content: '',
    });

    useEffect(() => {
        if (initData) {
            setState({
                ...initData,
            });
        }
    }, [initData]);

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

    const handleChangeTitle = (event: React.FormEvent<HTMLInputElement>) => {
        setState({
            ...state,
            title: event.currentTarget.value,
        });
    };

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
        onSubmit(state);
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
                <Title>오늘의 한 줄 요약</Title>
                <InputWrapper>
                    <Input 
                        type="text" 
                        value={state.title} 
                        onChange={handleChangeTitle} 
                        placeholder='오늘 하루는 어땠나요?'
                    />
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
                        placeholder='더 자세히 들려주세요!'
                        value={state.content}
                        onChange={handleChangeContent}
                    />
                </InputWrapper>
            </EditorSection>
            <EditorSection>
                <ButtonWrapper>
                    <Button text={'취소하기'} colorType={'DEFAULT'} onClick={handleOnGoBack} disabled={disabled} />
                    <Button text={'저장하기'} colorType={'POSITIVE'} onClick={handleSubmit} disabled={disabled} />
                </ButtonWrapper>
            </EditorSection>
        </EditorWrapper>
    );
}

export default Editor;