import { useRecoilState } from 'recoil';
import { meState } from '../recoil/tokenAtom';
import styled from 'styled-components';
import Header from '../components/Header';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { IUpdateMe, useUpdateMeMutation } from '../hooks/useAuth';
import { useForm } from 'react-hook-form';

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

function Me() {
    const navigate = useNavigate();

    const [me, setMe] = useRecoilState(meState);

    const goBack = () => {
        navigate(-1);
    };

    const {register, setValue, handleSubmit, formState: { errors }} = useForm<IUpdateMe>();
    
    const { mutate, isPending: isLoading, isError, error } = useUpdateMeMutation();

    const onValid = ({ password }: { password: string }) => {
        const data = {
            password,
            isActive: true,
        };
        mutate(data, {
            onSuccess: () => {
                setMe({
                    ...me,
                    isActive: true,
                });
                setValue('password', '');
            }
        });
    }

    return (
        <Wrapper>
            <Header
                title='내 정보'
                leftChild={
                    <Button
                        text='< 뒤로 가기'
                        colorType='DEFAULT'
                        onClick={goBack}
                    />
                }
            />
            <Form onSubmit={handleSubmit(onValid)}>
                <InputWrapper>
                    <Title>사용자 이름</Title>
                    <Input 
                        type='text'
                        value={me?.username || ''}
                        readOnly 
                        disabled
                    />
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
                    <Button text='비밀번호 변경' colorType='DEFAULT' type='submit' disabled={isLoading} />
                </ButtonWrapper>

                { isError && <Error>{error?.message}</Error>}
            </Form>
        </Wrapper>
    );
}

export default Me;