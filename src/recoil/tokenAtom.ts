import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
import { IMe } from "../hooks/useAuth";

const { persistAtom: persistTokenAtom } = recoilPersist({
    key: 'sessionStorage',
    storage: sessionStorage,
});

const { persistAtom: persistMeAtom } = recoilPersist({
    key: 'storage',
    storage: sessionStorage,
});

export const tokenState = atom<string | undefined>({
    key: 'token',
    default: undefined,
    effects_UNSTABLE: [persistTokenAtom],
});

export const isLoginSelector = selector({
    key: 'isLogin',
    get: ({ get }) => !!get(tokenState),
});

export const meState = atom<IMe>({
    key: 'me',
    default: undefined,
    effects_UNSTABLE: [persistMeAtom],
});

export const myIdSelector = selector({
    key: 'id',
    get: ({ get} ) => get(meState).id,
});