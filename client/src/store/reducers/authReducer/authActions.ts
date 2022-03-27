import { IUserInfo } from '../../../interfaces';

export const setUserInfo = (payload: IUserInfo) => {
    return { type: 'SET_USER_INFO', payload };
};