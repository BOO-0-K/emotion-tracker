import { atom } from 'recoil';

export interface IModal {
    isOpen: boolean;
    title: string;
    type: 'C' | 'A';
    callBack? : () => void;
}

export const modalState = atom<IModal>({
    key: 'modal',
    default: {
        isOpen: false,
        title: '',
        type: 'C',
    },
});