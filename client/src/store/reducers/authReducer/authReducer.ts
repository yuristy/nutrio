import { IUserInfo, IAction } from '../../../interfaces';

const initState = {
    isAuthenticated: false,
    user: {
        email: '',
        id: '',
        roles: [],
        isActivated: false,
    },
};

const authReducer = (
    state: IUserInfo = initState,
    action: IAction<IUserInfo>
) => {
    switch (action.type) {
        case 'SET_USER_INFO':
            return action.payload;
        default:
            return state;
    }
};
export default authReducer;
