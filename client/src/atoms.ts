import { atom } from 'recoil';
import { recoilPersist } from "recoil-persist";

const sessionStorage = 
      typeof window !== 'undefined' ? window.sessionStorage : undefined

const { persistAtom } = recoilPersist({
    key: 'atoms',
    storage: sessionStorage,
});

export const isLoggedIn = atom<boolean>({
    key: 'isLoggedIn',
    default: false,
    effects_UNSTABLE: [persistAtom],
});

export const isManager = atom<boolean>({
    key: 'isManager',
    default: false,
    effects_UNSTABLE: [persistAtom],
});