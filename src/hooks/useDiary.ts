import {
  QueryFunctionContext,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import api from "../utils/api";
import { IPost } from "../components/Editor";
import { IModalOpen, useModal } from "./useModal";
import { useNavigate } from "react-router-dom";

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

export interface IComment {
  id: number;
  userId: number;
  postId: number;
  content: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export interface IComments {
  comments: IComment[];
}

interface ICreateResponse {
  statusCode: number;
  message: string;
  data: ICreateResponseData;
}

interface ICreateResponseData {
  id: number;
}

interface IUpdateResponse {
  statusCode: number;
  message: string;
}

export interface ICreateComment {
  postId: number;
  content: string;
}

interface QueryData extends QueryFunctionContext<[string, number]> {}

// 모든 일기 리스트 API 함수
const fetchDiaries = ({ startDate, endDate }: ISearch) => {
  return api.get(`/posts?startDate=${startDate}&endDate=${endDate}`);
};
// 모든 일기 리스트 커스텀 훅
export const useDiariesQuery = ({ startDate, endDate }: ISearch) => {
  return useQuery({
    queryKey: ["diaries", startDate, endDate],
    queryFn: () => fetchDiaries({ startDate, endDate }),
    select: (response) => {
      return response.data as IDiaries;
    },
  });
};

// 일기 상세 API 함수
const fetchDiary = (queryData: QueryData) => {
  const id = queryData.queryKey[1];
  return api.get(`/posts/${id}`);
};
// 일기 상세 커스텀 훅
export const useDiaryQuery = (id: number) => {
  return useQuery({
    queryKey: ["diary", id],
    queryFn: fetchDiary,
    select: (response) => {
      return response.data.post as IDiary;
    },
  });
};

// 일기 추가 API 함수
const fetchCreateDiary = (postData: IPost): Promise<ICreateResponse> => {
  return api.post("/posts", postData);
};
// 일기 추가 커스텀 훅
export const useCreateDiaryMutation = () => {
  const { open, close } = useModal();

  const navigate = useNavigate();

  const goDetail = (id: number) => {
    if (id) {
      navigate(`/diary/${id}`);
    } else {
      navigate("/");
    }
    close();
  };

  return useMutation<ICreateResponse, Error, IPost>({
    mutationFn: fetchCreateDiary,
    onSuccess: (response) => {
      const modal: IModalOpen = {
        title: "작성되었습니다.",
        type: "C",
        callBack: () => goDetail(response.data.id),
      };
      open(modal);
    },
    onError: (error) => {
      const modal: IModalOpen = {
        title: "모든 내용을 작성해주세요.",
        type: "C",
        callBack: close,
      };
      open(modal);
    },
  });
};

// 일기 수정 API 함수
const fetchUpdateDiary = (
  id: number,
  postData: IPost
): Promise<IUpdateResponse> => {
  return api.patch(`/posts/${id}`, postData);
};
// 일기 추가 커스텀 훅
export const useUpdateDiaryMutation = (id: number) => {
  const { open, close } = useModal();

  const navigate = useNavigate();

  const goDetail = (id: number) => {
    if (id) {
      navigate(`/diary/${id}`);
    } else {
      navigate("/");
    }
    close();
  };

  return useMutation<IUpdateResponse, Error, IPost>({
    mutationFn: (postData) => fetchUpdateDiary(id, postData),
    onSuccess: (response) => {
      const modal: IModalOpen = {
        title: "수정되었습니다.",
        type: "C",
        callBack: () => goDetail(id),
      };
      open(modal);
    },
    onError: (error) => {
      const modal: IModalOpen = {
        title: "모든 내용을 작성해주세요.",
        type: "C",
        callBack: close,
      };
      open(modal);
    },
  });
};

// 일기 삭제 API 함수
const fetchDeleteDiary = (id: number) => {
  return api.delete(`/posts/${id}`);
};
// 일기 삭제 커스텀 훅
export const useDeleteDiaryMutation = () => {
  const { open, close } = useModal();

  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
    close();
  };

  return useMutation({
    mutationFn: fetchDeleteDiary,
    onSuccess: (response) => {
      console.log(response);
      const modal: IModalOpen = {
        title: "삭제되었습니다.",
        type: "C",
        callBack: goHome,
      };
      open(modal);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

// 모든 댓글 리스트 API 함수
const fetchComments = (postId: number) => {
  return api.get(`/comments?postId=${postId}`);
};
// 모든 댓글 리스트 커스텀 훅
export const useCommentsQuery = (postId: number) => {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId),
    select: (response) => {
      return response.data as IComments;
    },
  });
};

// 댓글 추가 API 함수
const fetchCreateComment = (
  commentData: ICreateComment
): Promise<ICreateResponse> => {
  return api.post("/comments", commentData);
};
// 댓글 추가 커스텀 훅
export const useCreateCommentMutation = () => {
  return useMutation<ICreateResponse, Error, ICreateComment>({
    mutationFn: fetchCreateComment,
    onSuccess: (response) => {},
    onError: (error) => {},
  });
};

// 댓글 삭제 API 함수
const fetchDeleteComment = (id: number) => {
  return api.delete(`/comments/${id}`);
};
// 댓글 삭제 커스텀 훅
export const useDeleteCommentMutation = () => {
  return useMutation({
    mutationFn: fetchDeleteComment,
    onSuccess: (response) => {},
    onError: (error) => {},
  });
};
