import { useRecoilValue } from 'recoil';
import { isLoginSelector } from '../recoil/tokenAtom';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import Button from '../components/Button';
import { useForm } from 'react-hook-form';
import { IAuth, useSigninMutation } from '../hooks/useAuth';
import { useEffect } from 'react';

const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    padding: 0px 20px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const Title = styled.h4`
    font-size: 22px;
    font-weight: 600;
`;

const InputWrapper = styled.div`
    padding: 20px 0px;
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    border: none;
    border-radius: 5px;
    background-color: ${(props) => props.theme.inputColor};
    font-size: 20px;
    font-family: Hi Melody, serif;
    padding: 10px;
`;

const ButtonWrapper = styled.div`
    padding: 20px 0px;
`;

const Error = styled.span`
    font-weight: 600;
    color: ${(props) => props.theme.negativeColor};
`;

function Login() {
    const isLogin = useRecoilValue(isLoginSelector);

    const navigate = useNavigate();

    const location = useLocation();
    const from = location?.state?.redirectedFrom?.pathname || '/';

    useEffect(() => {
        if (isLogin) {
            navigate(from);
        }
    }, [isLogin, navigate, from]);

    const {register, handleSubmit, formState: { errors }} = useForm<IAuth>();
    
    const { mutate, isPending: isLoading, isError, error } = useSigninMutation();

    const onValid = (data: IAuth) => {
        mutate(data, {
            onSuccess: () => {
                navigate(from);
            }
        });
    }

    return (
        <Wrapper>
            <Header title={'로그인'} />
            <Form onSubmit={handleSubmit(onValid)}>
                <InputWrapper>
                    <Title>사용자 이름</Title>
                    <Input 
                        type='text' 
                        {...register('username', {
                            required: '사용자 이름을 입력해주세요.',
                        })}
                    />
                    { errors.username && <Error>{errors.username.message}</Error> }
                </InputWrapper>

                <InputWrapper>
                    <Title>비밀번호</Title>
                    <Input 
                        type='password' 
                        {...register('password', {
                            required: '비밀번호를 입력해주세요.',
                            minLength: {
                                value: 4,
                                message: '비밀번호는 4자 이상 입력해주세요.',
                            },
                        })}
                    />
                    { errors.password && <Error>{errors.password.message}</Error> }
                </InputWrapper>

                <ButtonWrapper>
                    <Button text='로그인' colorType='DEFAULT' type='submit' disabled={isLoading} />
                </ButtonWrapper>

                { isError && <Error>{error?.message}</Error>}
            </Form>
        </Wrapper>
    );
}

export default Login;