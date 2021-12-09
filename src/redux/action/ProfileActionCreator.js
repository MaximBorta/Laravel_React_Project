import * as ActionTypes from '../types/actionTypes'
import axios from 'axios'
import ProfileServices from '../../services/ProfileServices'

let baseUrl = 'http://localhost:8000/api/users/'
let token = localStorage.getItem('user-token')

export const ProfileAction = () => (dispatch) =>
    new Promise((resolve, reject) => {
        dispatch({type: ActionTypes.LOADING})

        const profile = new ProfileServices()
        profile.loadProfile().then(res => {
            if (res.hasOwnProperty('success') && res.success === true) {
                dispatch({type: ActionTypes.LOAD_PROFILE_SUCCESS, payload: res})
            }else if (res.hasOwnProperty('success') && res.success === false) {
                dispatch({type: ActionTypes.LOAD_PROFILE_ERROR, payload: res})
            }
            resolve()
        }).catch(error => {
            dispatch({type: ActionTypes.CODE_ERROR, error})
        })
    })


export const UploadAvatarAction = (formData) => (dispatch) => {
    dispatch({type: ActionTypes.UPLOAD_LOADING})
    axios.post(`${baseUrl}upload-avatar`, formData, {
        headers: {
            'Content-type': 'multipart/form-data',
            'Authorization': 'Bearer ' +token
        }
    }).then( res => {
        dispatch({type: ActionTypes.UPLOAD_PROFILE_SUCCESS, payload: res})
    }).catch(error => {
        dispatch({type: ActionTypes.UPLOAD_PROFILE_ERROR, error})
    })
}

export const EditProfileAction = (name, email) => (dispatch) => {
        dispatch({type: ActionTypes.EDIT_LOADING})
    axios.put(`${baseUrl}edit-profile`, {name, email}, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' +token
        }
    }).then( res => {
        dispatch({type: ActionTypes.EDIT_PROFILE_SUCCESS, payload: res.data})
    }).catch(error => {
        dispatch({type: ActionTypes.EDIT_PROFILE_ERROR, error})
    })
}