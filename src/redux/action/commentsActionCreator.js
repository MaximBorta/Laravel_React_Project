import * as ActionTypes from '../types/actionTypes'
import HttpService from "../../services/HttpService";


const token = localStorage.getItem('user-token')
const http = new HttpService()

export const getCommentsAction = (id) => async (dispatch) => {
    const BASE_URL = `users/get-post-comment/${id}`
    dispatch({type: ActionTypes.IS_FETCHING_COMMENT})
    await http.getData(BASE_URL, token)
        .then(res => {
            dispatch({
                type: ActionTypes.FETCH_COMMENT_SUCCESS,
                payload: res
            })
        })
}

export const setCommentsAction = (id, formData) => async(dispatch) => {
    const BASE_URL = `users/send-comment/${id}`
    dispatch({type: ActionTypes.IS_CREATING_COMMENT})
    await http.postData(formData, BASE_URL, token)
        .then(res => {
            dispatch({
                type: ActionTypes.COMMENT_CREATED,
                payload: res
            })
        })
}