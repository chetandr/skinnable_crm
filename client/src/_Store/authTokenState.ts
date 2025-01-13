import { atom } from "recoil";

const authTokenState = atom<string | null>({
    key: 'authTokenState',
    default: localStorage.getItem('authToken'),
  });

export default authTokenState;