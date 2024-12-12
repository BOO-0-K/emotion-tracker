import styled from 'styled-components';
import Header from '../components/Header';
import Button from '../components/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useDiaryQuery } from '../hooks/useDiary';
import { useRecoilValue } from 'recoil';
import { myIdSelector } from '../recoil/tokenAtom';
import Viewer from '../components/Viewer';
import { useEffect } from 'react';
import { IModalOpen, useModal } from '../hooks/useModal';
import Loading from '../components/Loading';

const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    padding: 0px 20px;
`;

function Diary() {
    const navigate = useNavigate();

    const myId = useRecoilValue(myIdSelector);

    const { id } = useParams();
    const diaryId = id ? +id : 0;

    const { open, close } = useModal();

    const { data, isLoading, isError } = useDiaryQuery(diaryId);

    const goBack = () => {
        navigate('/');
    };

    const goEdit = () => {
        navigate(`/edit/${id}`);
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
                title={`${data?.today} 기록`}
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
                            text='수정하기'
                            colorType='DEFAULT'
                            onClick={goEdit}
                        />
                    )
                }
            /> 
            {
                data && !isLoading ? (
                    <Viewer title={data?.title} content={data?.content} emotionId={data?.status} />
                ) : (
                    <Loading />
                )
            }
        </Wrapper>
    );
}

export default Diary;