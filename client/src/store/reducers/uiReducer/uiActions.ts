export const setUILoading = (payload: boolean) => {
    return { type: 'SET_UI_LOADING', payload }
}

export const setLoginLoading = (payload: boolean) => {
    return { type: 'SET_LOGIN_LOADING', payload }
}

export const setRegLoading = (payload: boolean) => {
    return { type: 'SET_REG_LOADING', payload }
}

export const setLogoutLoading = (payload: boolean) => {
    return { type: 'SET_LOGOUT_LOADING', payload }
}