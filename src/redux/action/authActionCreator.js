import * as ActionTypes from '../types/actionTypes'
import {loginUser, logoutUser, registerUser} from '../../services/AuthServices'


export const RegisterAction = (credentials, history) => (dispatch) => {
    dispatch({type: ActionTypes.RESTART_AUTH_RESPONSE})
    dispatch({type: ActionTypes.LOADING})

    registerUser(credentials).then(res => {
        if (res.hasOwnProperty('success') && res.success === true) {
            dispatch({type: ActionTypes.REGISTER_SUCCESS, payload: res})
            history.push('user/login')
        } else if (res.hasOwnProperty('success') && res.success === false) {
            dispatch({type: ActionTypes.REGISTER_ERROR, payload: res})
        }
    }).catch(error => {
        dispatch({type: ActionTypes.CODE_ERROR, error})
    })
}

export const LoginAction = (credentials, history) => {
    return (dispatch) => {
        dispatch({type: ActionTypes.RESTART_AUTH_RESPONSE});
        dispatch({type: ActionTypes.LOADING});

        loginUser(credentials).then(res => {
            if (res.hasOwnProperty('success') && res.success === true) {
                localStorage.setItem('user-token', res.token.accessToken)
                dispatch({type: ActionTypes.LOGIN_SUCCESS, payload: res})
                history.push('/user')
            } else if (res.hasOwnProperty('success') && res.success === false) {
                dispatch({type: ActionTypes.LOGIN_ERROR, payload: res})
            }
        }).catch(error => {
            dispatch({type: ActionTypes.CODE_ERROR, error})
        })
    }
}


export const LogoutAction = () => (dispatch) => {
    dispatch({type: ActionTypes.RESTART_AUTH_RESPONSE})

    logoutUser().then(res => {
        if (res.hasOwnProperty('success') && res.success === true) {
            dispatch({type: ActionTypes.LOGOUT_SUCCESS, payload: res})
        }else if(res.hasOwnProperty('success') && res.success === false) {
            dispatch({type: ActionTypes.LOGOUT_ERROR, payload: res})
        }
    }).catch(error => {
        dispatch({type: ActionTypes.CODE_ERROR, error})
    })
}