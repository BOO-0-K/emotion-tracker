import { useSetRecoilState } from 'recoil';
import api from '../utils/api';
import { tokenState } from '../recoil/tokenAtom';
import { useMutation } from '@tanstack/react-query';

export interface IAuth {
    username: string;
    password: string;
}

// 로그인 API 호출 함수
const fetchSignin = (authData: IAuth) => {
    return api.post('/users/signin', authData);
}
// 로그인 커스텀 훅
export const useSigninMutation = () => {
    const setAccessToken = useSetRecoilState(tokenState);

    return useMutation({
        mutationFn: fetchSignin,
        onSuccess: (response) => {
            const { accessToken } = response.data;
            setAccessToken(accessToken);
        },
        onError: (error) => {
            // console.log(error);
        }
    })
}