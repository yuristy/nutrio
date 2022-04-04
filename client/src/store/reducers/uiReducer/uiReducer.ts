import { IAction } from '../../../interfaces';

const initState = {
  isUILoading: false,
  isLoginLoading: false,
  isRegLoading: false,
  isLogoutLoading: false,
};

const uiReducer = (
  state = initState,
  action: IAction<boolean>
) => {
  switch (action.type) {
    case 'SET_UI_LOADING':
      return { ...state, isUILoading: action.payload }
    case 'SET_LOGIN_LOADING':
      return { ...state, isLoginLoading: action.payload }
    case 'SET_REG_LOADING':
      return { ...state, isRegLoading: action.payload }
    case 'SET_LOGOUT_LOADING':
      return { ...state, isLogoutLoading: action.payload }
    default:
      return state;
  }
};
export default uiReducer;
