import { useMutation, useQuery } from '@tanstack/react-query';
import api from '../utils/api';
import { IPost } from '../components/Editor';
import { IModalOpen, useModal } from './useModal';
import { useNavigate } from 'react-router-dom';

interface ISearch {
    startDate: string;
    endDate: string;
}

export interface IDiary {
    id: number;
    userId: number;
    title: string;
    today: string;
    status: number;
    content: string;
    username: string;
    createdAt: string;
    updatedAt: string;
}

export interface IDiaries {
    posts: IDiary[];
}

interface ICreateResponse {
    statusCode: number;
    message: string;
    data: ICreateResponseData;
}

interface ICreateResponseData {
    id: number;
}

// 모든 일기 리스트 API 함수
const fetchDiaries = ({ startDate, endDate }: ISearch) => {
    return api.get(`/posts?startDate=${startDate}&endDate=${endDate}`);
};
// 모든 일기 리스트 커스텀 훅
export const useDiariesQuery = ({ startDate, endDate }: ISearch) => {
    return useQuery({
        queryKey: ['diaries', startDate, endDate],
        queryFn: () => fetchDiaries({ startDate, endDate }),
        select: (response) => {
            return response.data as IDiaries;
        },
    });
}

// 일기 추가 API 함수
const fetchCreateDiary = (postData: IPost): Promise<ICreateResponse> => {
    return api.post('/posts', postData);
};
// 일기 추가 커스텀 훅
export const useCreateDiaryMutation = () => {
    const { open, close } = useModal();

    const navigate = useNavigate();

    const goDetail = (id: number) => {
        if (id) {
            navigate(`/diary/${id}`);
        } else {
            navigate('/');
        }
        close();
    };

    return useMutation<ICreateResponse, Error, IPost>({
        mutationFn: fetchCreateDiary,
        onSuccess: (response) => {
            const modal: IModalOpen = {
                title: '작성되었습니다.',
                type: 'C',
                callBack: () => goDetail(response.data.id),
            };
            open(modal);
        },
        onError: (error) => {
            const modal: IModalOpen = {
                title: '모든 내용을 작성해주세요.',
                type: 'C',
                callBack: close,
            };
            open(modal);
        },
    })
}