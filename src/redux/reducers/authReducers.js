import * as ActionTypes from '../types/actionTypes'

let initialState = {
    authResponse: {},
    authError: {},
    isAuthLoading: false
}

export const authReducers = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.RESTART_AUTH_RESPONSE:
            return {
                ...state,
                authResponse: {}
            }
        case ActionTypes.LOADING:
            return {
                ...state,
                isAuthLoading: true
            }
        case ActionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                isAuthLoading: false,
                authResponse: action.payload
            }
        case ActionTypes.REGISTER_ERROR:
            return {
                ...state,
                isAuthLoading: false,
                authResponse: action.payload
            }
        case ActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isAuthLoading: false,
                authResponse: action.payload
            }
        case ActionTypes.LOGIN_ERROR:
            return {
                ...state,
                isAuthLoading: false,
                authError: action.payload
            }
        case ActionTypes.LOGOUT_SUCCESS:
            return {
                ...state,
                authResponse: action.payload,
                isAuthLoading: false,
            }
        case ActionTypes.LOGOUT_ERROR:
            return {
                ...state,
                authResponse: action.payload,
                isAuthLoading: false,
            }
        case ActionTypes.CODE_ERROR:
            return {
                ...state,
                authResponse: action.payload
            }
        default:
            return state
    }
}