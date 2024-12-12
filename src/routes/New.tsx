import styled from 'styled-components';
import Header from '../components/Header';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import Editor, { IPost } from '../components/Editor';
import { useCreateDiaryMutation } from '../hooks/useDiary';

const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    padding: 0px 20px;
`;

function New() {
    const navigate = useNavigate();

    const { mutate, isPending: isLoading } = useCreateDiaryMutation();

    const goBack = () => {
        navigate('/');
    };

    const onSubmit = (data: IPost) => {
        mutate(data);
    };

    return (
        <Wrapper>
            <Header
                title='새 일기 작성하기'
                leftChild={
                    <Button
                        text='< 뒤로 가기'
                        colorType='DEFAULT'
                        onClick={goBack}
                    />
                }
            />
            <Editor onSubmit={onSubmit} disabled={isLoading} />
        </Wrapper>
    );
}

export default New;