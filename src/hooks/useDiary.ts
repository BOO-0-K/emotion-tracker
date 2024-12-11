import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

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

const fetchDiaries = ({ startDate, endDate }: ISearch) => {
    return api.get(`/posts?startDate=${startDate}&endDate=${endDate}`);
};

export const useDiariesQuery = ({ startDate, endDate }: ISearch) => {
    return useQuery({
        queryKey: ['diaries', startDate, endDate],
        queryFn: () => fetchDiaries({ startDate, endDate }),
        select: (response) => {
            return response.data as IDiaries;
        },
    });
}