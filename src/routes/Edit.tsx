import styled from 'styled-components';
import Header from '../components/Header';
import Button from '../components/Button';
import { useNavigate, useParams } from 'react-router-dom';
import Editor, { IPost } from '../components/Editor';
import { useDeleteDiaryMutation, useDiaryQuery, useUpdateDiaryMutation } from '../hooks/useDiary';
import Loading from '../components/Loading';
import { IModalOpen, useModal } from '../hooks/useModal';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { myIdSelector } from '../recoil/tokenAtom';

const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    padding: 0px 20px;
`;

function Edit() {
    const navigate = useNavigate();

    const myId = useRecoilValue(myIdSelector);

    const { id } = useParams();
    const diaryId = id ? +id : 0;

    const { data, isLoading, isError } = useDiaryQuery(diaryId);
    const { mutate, isPending } = useUpdateDiaryMutation(diaryId);
    const { mutate: deleteMutate, isPending: disabledDeleteBtn } = useDeleteDiaryMutation();

    const [initData, setInitData] = useState<IPost | undefined>(undefined);

    useEffect(() => {
        if (data) {
            setInitData({
                title: data.title,
                today: data.today,
                status: data.status,
                content: data.content,
            });
        }
    }, [data]);

    const { open, close } = useModal();

    const goBack = () => {
        navigate('/');
    };

    const onClickDelete = () => {
        const confirm: IModalOpen = {
            title: '정말 삭제할까요?',
            type: 'A',
            callBack: () => {
                deleteMutate(diaryId);
            },
        };

        open(confirm);
    };

    const onSubmit = (editData: IPost) => {
        mutate(editData);
    };

    useEffect(() => {
        const goHome = () => {
            navigate('/');
            close();
        };

        if (isError) {
            const modal: IModalOpen = {
                title: '잘못된 접근입니다.',
                type: 'C',
                callBack: goHome,
            }
    
            open(modal);
        }
    }, [isError, open, close, navigate]);

    return (
        <Wrapper>
            <Header
                title='내 일기 수정하기'
                leftChild={
                    <Button
                        text='< 뒤로 가기'
                        colorType='DEFAULT'
                        onClick={goBack}
                    />
                }
                rightChild={
                    myId === data?.userId && (
                        <Button
                            text='삭제하기'
                            colorType='NEGATIVE'
                            onClick={onClickDelete}
                            disabled={disabledDeleteBtn}
                        />
                    )
                }
            /> 
            {
                data && !isLoading ? (
                    <Editor onSubmit={onSubmit} disabled={isPending} initData={initData} />
                ) : (
                    <Loading />
                )
            }
            
        </Wrapper>
    );
}

export default Edit;