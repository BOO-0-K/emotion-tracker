import styled from 'styled-components';

const Wrapper = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: start;
`;

const Text = styled.span`
    font-size: 24px;
    margin: 20px;
`;

function Loading() {
    return (
        <Wrapper>
            <Text>로딩 중...</Text>
        </Wrapper>
    );
}

export default Loading;