import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
import { IMe } from "../hooks/useAuth";

const { persistAtom } = recoilPersist({
    key: 'sessionStorage',
    storage: sessionStorage,
});

export const tokenState = atom<string | undefined>({
    key: 'token',
    default: undefined,
    effects_UNSTABLE: [persistAtom],
});

export const isLoginSelector = selector({
    key: 'isLogin',
    get: ({ get }) => !!get(tokenState),
});

export const meState = atom<IMe>({
    key: 'me',
    default: undefined,
});