import { IAuthInfo } from '../../../interfaces';

export const doRegistration = (formValue: IAuthInfo) => {
    return {
        type: 'DO_REGISTRATION',
        payload: formValue,
    };
};
export const doLogin = (formValue: IAuthInfo) => {
    return {
        type: 'DO_LOGIN',
        payload: formValue,
    };
};
