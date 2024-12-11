import styled from 'styled-components';
import Button from '../components/Button';
import Header from '../components/Header';

const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    padding: 0px 20px;
`;

function Home() {
    return (
        <Wrapper>
            <Header
                title={'홈'}
                leftChild={
                    <Button 
                        colorType={'DEFAULT'} 
                        text={'<'}
                        onClick={() => {}}
                    />
                }
                rightChild={
                    <Button 
                        colorType={'DEFAULT'} 
                        text={'>'}
                        onClick={() => {}}
                    />
                }
            />
        </Wrapper>
    );
}

export default Home;