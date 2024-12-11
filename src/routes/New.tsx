import styled from 'styled-components';
import Header from '../components/Header';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import Editor from '../components/Editor';

const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    padding: 0px 20px;
`;

function New() {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    const onSubmit = () => {

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
            <Editor onSubmit={onSubmit} />
        </Wrapper>
    );
}

export default New;