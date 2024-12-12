import { useSetRecoilState } from 'recoil';
import api from '../utils/api';
import { tokenState } from '../recoil/tokenAtom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { IModalOpen, useModal } from './useModal';

export interface IAuth {
    username: string;
    password: string;
}

export interface IMe {
    id: number;
    username: string;
    isActive: boolean;
}

export interface IUpdateMe {
    password: string;
    isActive: boolean;
}

interface UpdateMeResponse {
    statusCode: number;
    message: string;
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

// 로그아웃 함수
export const useLogout = () => {
    const setAccessToken = useSetRecoilState(tokenState);
    const navigate = useNavigate();

    const logout = () => {
        setAccessToken(undefined);
        sessionStorage.removeItem('sessionStorage');
        navigate('/login');
    };

    return { logout };
}

// 내 정보 보기 API 호출 함수
const fetchMe = () => {
    return api.get('/users/me');
}
// 내 정보 보기 커스텀 훅
export const useMeQuery = () => {
    return useQuery({
        queryKey: ['me'],
        queryFn: fetchMe,
        select: (response) => {
            return response.data as IMe;
        }
    })
}

// 내 정보 수정 API 호출 함수
const fetchUpdateMe = (meData: IUpdateMe): Promise<UpdateMeResponse> => {
    return api.patch('/users/me', meData);
}
// 내 정보 수정 커스텀 훅
export const useUpdateMeMutation = () => {
    const { open, close } = useModal();
    const navigate = useNavigate();

    const goHome = () => {
        navigate('/');
        close();
    };

    return useMutation<UpdateMeResponse, Error, IUpdateMe>({
        mutationFn: fetchUpdateMe,
        onSuccess: (response) => {
            const modal: IModalOpen = {
                title: response.message,
                type: 'C',
                callBack: goHome,
            };
            open(modal);
        },
        onError: (error) => {
            // console.log(error);
        }
    })
}