import styled from 'styled-components';
import Button from './Button';
import { ICreateComment, useCommentsQuery, useCreateCommentMutation, useDeleteCommentMutation } from '../hooks/useDiary';
import { useParams } from 'react-router-dom';
import Loading from './Loading';
import { getFormattedDate } from '../utils/util';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { myIdSelector } from '../recoil/tokenAtom';
import { useQueryClient } from '@tanstack/react-query';

const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    padding: 20px 0px;
    border-top: 1px solid #e2e2e2;
`;

const Section = styled.form`
    width: 100%;
    margin-bottom: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`;

const Title = styled.h4`
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 20px;
`;

const InputWrapper = styled.div`
    width: 100%;
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
`;

const Input = styled.input`
    padding: 10px 20px;
    width: 100%;
    border: none;
    border-radius: 5px;
    background-color: ${(props) => props.theme.inputColor};
    font-size: 20px;
    font-weight: 300;
    font-family: 'Nanum Gothic', serif;
`;

const CommentWrapper = styled.div`
    width: 100%;
    margin-bottom: 10px;
`;

const ContentWrapper = styled.div`
    width: 100%;
    background-color: ${(props) => props.theme.inputColor};
    border-radius: 5px;
    word-break: keep-all;
    overflow-wrap: break-word;
`;

const ButtonWrapper = styled.div`
    display: flex;
    gap: 10px;
`;

const Content = styled.div`
    padding: 0px 20px;
    text-align: left;
    font-size: 18px;
    font-family: 'Nanum Gothic', serif;
    line-height: 2.5;
    white-space: pre-line;
`;

const AuthorWrapper = styled.div`
    display: flex;
    justify-content: start;
`;

const Author = styled.span`
    text-align: right;
`;

function Comment() {
    const queryClient = useQueryClient();

    const { id } = useParams();
    const diaryId = id ? +id : 0;

    const myId = useRecoilValue(myIdSelector);

    const [state, setState] = useState<ICreateComment>({
        postId: diaryId,
        content: '',
    });

    const { data, isLoading } = useCommentsQuery(diaryId);
    const { mutate, isPending } = useCreateCommentMutation();
    const { mutate: deleteMutate, isPending: disabledDeleteBtn } = useDeleteCommentMutation();

    const handleChangeContent = (event: React.FormEvent<HTMLInputElement>) => {
        setState({
            ...state,
            content: event.currentTarget.value,
        });
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        mutate(state, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['comments', diaryId]});
                setState({
                    ...state,
                    content: '',
                });
            },
        });
    };

    const onClickDelete = (id: number) => {
        deleteMutate(id, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['comments', diaryId]});
            },
        });
    };

    return (
        <Wrapper>
            <Section onSubmit={handleSubmit}>
                <Title>오늘의 답장</Title>
                <InputWrapper>
                    <Input 
                        type='text'
                        value={state.content}
                        onChange={handleChangeContent}
                        placeholder='답장을 남길까요?'
                    />
                    <Button
                        text='전달'
                        colorType='DEFAULT'
                        type='submit'
                        disabled={isPending}
                    />
                </InputWrapper>
                {
                    data && !isLoading ? (
                        data.comments.map((comment) => (
                            <CommentWrapper key={comment.id}>
                                <AuthorWrapper>
                                    <Author>
                                        {comment.username}
                                        &nbsp;
                                        {getFormattedDate(new Date(comment.createdAt))}
                                    </Author>
                                </AuthorWrapper>
                                <ButtonWrapper>
                                    <ContentWrapper>
                                        <Content>{comment.content}</Content>
                                    </ContentWrapper>
                                    {
                                        myId === comment?.userId && (
                                            <Button
                                            text='삭제'
                                            colorType='NEGATIVE'
                                            onClick={() => onClickDelete(comment?.id)}
                                            disabled={disabledDeleteBtn}
                                        />
                                        )
                                    }
                                </ButtonWrapper>
                            </CommentWrapper>
                        ))
                    ) : (
                        <Loading />
                    )
                }
            </Section>
        </Wrapper>
    );
}

export default Comment;