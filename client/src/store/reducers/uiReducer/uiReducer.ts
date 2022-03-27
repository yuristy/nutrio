import { IAction } from '../../../interfaces';

const initState = {
  isLoginLoading: false,
  isRegLoading: false,
};

const uiReducer = (
  state = initState,
  action: IAction<boolean>
) => {
  switch (action.type) {
    case 'SET_LOGIN_LOADING':
      return { ...state, isLoginLoading: action.payload }
    case 'SET_REG_LOADING':
      return { ...state, isRegLoading: action.payload }
    default:
      return state;
  }
};
export default uiReducer;
