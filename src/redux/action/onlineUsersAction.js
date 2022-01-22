import * as ActionTypes from '../types/actionTypes'
import axios from 'axios'

const BASE_URL = 'http://localhost:8000/api/users'
let token = localStorage.getItem('user-token')

export const onlineUsersAction = (id) => async (dispatch) => {
    await axios.put(`${BASE_URL}/user/${id}/online?api_token=${token}`)
        .then(() => {
            dispatch({type: ActionTypes.ONLINE_USERS})
        })
}

export const offlineUsersAction = (id) => async (dispatch) => {
    await axios.put(`${BASE_URL}/user/${id}/offline?api_token=${token}`)
        .then(() => {
            dispatch({type: ActionTypes.OFFLINE_USERS})
        })
}