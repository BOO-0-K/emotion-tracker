import styled from 'styled-components';
import Button from './Button';

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
    font-weight: 500;
    margin-bottom: 20px;
`;

const InputWrapper = styled.div`
    width: 100%;
    display: flex;
    gap: 10px;
`;

const Input = styled.input`
    padding: 10px 20px;
    width: 100%;
    border: none;
    border-radius: 5px;
    background-color: ${(props) => props.theme.inputColor};
    font-size: 20px;
    font-weight: 300;
    font-family: 'Sunflower', sans-serif;
`;

function Comment() {
    return (
        <Wrapper>
            <Section>
                <Title>오늘의 답장</Title>
                <InputWrapper>
                    <Input />
                    <Button
                        text='전달'
                        colorType='DEFAULT'
                        type='submit'
                    />
                </InputWrapper>
            </Section>
        </Wrapper>
    );
}

export default Comment;