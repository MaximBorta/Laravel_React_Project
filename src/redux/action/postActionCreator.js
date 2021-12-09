import * as ActionTypes from '../types/actionTypes'
import axios from 'axios'

const BASE_URL = 'http://localhost:8000/api/users'
let token = localStorage.getItem('user-token')
const options = {
    headers: {
        'Authorization': 'Bearer ' +token
    }
}


export const getPostsAction = () => async (dispatch) => {
    dispatch({type: ActionTypes.IS_LOADING_POSTS})
    await axios.get(`${BASE_URL}/user-posts`, options).then(res => {
        dispatch({type: ActionTypes.LOADING_POSTS_SUCCESS, payload: res.data.data})
    }).catch(error => {
        dispatch({type: ActionTypes.LOADING_POSTS_ERROR, error})
    })
}

export const getPostActionId = (id) => async (dispatch) => {
        dispatch({type: ActionTypes.IS_LOADING_POSTS})
    await axios.get(`${BASE_URL}/user-posts/${id}/show`, options).then(res => {
        dispatch({type: ActionTypes.SHOW_POSTS_SUCCESS, payload: res.data.data})
    }).catch(error => {
        dispatch({type: ActionTypes.SHOW_POSTS_ERROR, error})
    })
}

export const createPostAction = (formData) => async (dispatch) => {
        dispatch({type: ActionTypes.IS_CREATING_POST})
    await axios.post(`${BASE_URL}/create-post`, formData, options).then( res => {
        dispatch({type: ActionTypes.CREATE_POST_SUCCESS, payload: res.data})
    }).catch(error => {
        dispatch({type: ActionTypes.CREATE_POST_ERROR, error})
    })
}

export const updatePostAction = (id, formData) => async (dispatch) => {
        dispatch({type: ActionTypes.IS_UPDATING_POST})
    await axios.post(`${BASE_URL}/user-posts/${id}/update`, formData, options).then(res => {
        dispatch({type: ActionTypes.UPDATE_POST_SUCCESS, payload: res.data})
    }).catch(error => {
        dispatch({type: ActionTypes.UPDATE_POST_ERROR, error})
    })
}

export const deletePostAction = (id) => async (dispatch) => {
        dispatch({type: ActionTypes.IS_DELETING_POST})
    await axios.delete(`${BASE_URL}/user-posts/${id}/delete`, options).then(res => {
        dispatch({type: ActionTypes.DELETING_POST_SUCCESS, payload: res.data})
    })
}