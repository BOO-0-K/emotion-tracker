import { useRecoilState } from 'recoil';
import { modalState } from '../recoil/modalAtom';
import { useCallback } from 'react';

export interface IModalOpen {
    title: string;
    type: 'C' | 'A';
    callBack? : () => void;
}

export const useModal = () => {
    const [modal, setModal] = useRecoilState(modalState);

    const open = useCallback(
        ({ title, type, callBack }: IModalOpen) => {
        setModal({
            isOpen: true,
            title,
            type,
            callBack,
        })
    }, [setModal]);

    const close = useCallback(() => {
        setModal((prev) => {
            return { ...prev, isOpen: false };
        })
    }, [setModal]);

    return { modal, open, close };
}