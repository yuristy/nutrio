import { IAuthInfo } from '../../../interfaces';

export const doRegistration = (formValue: IAuthInfo) => {
    return {
        type: 'DO_REGISTRATION',
        payload: formValue,
    };
};
