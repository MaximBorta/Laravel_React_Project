import axios from 'axios'
import * as ActionTypes from '../../types/actionTypes'

const token = localStorage.getItem('user-token')
const options = {
    headers: {
        'Authorization': 'Bearer '+token,
        'Content-type': 'application/json'
    }
}
const BASE_URL = 'http://localhost:8000/api/users'


export const sentMessage = (message) => {
    return {
        type: ActionTypes.SET_MESSAGE,
        payload: message
    }
}

export const sentMessageTo = (id) => (dispatch, getState) =>
    new Promise((resolve, reject) => {
    axios.post(`${BASE_URL}/conversation/${id}`, {
        message: getState().message
    },
        options
    ).then(res => {
        resolve()
    }).catch(error => {
        dispatch({type: ActionTypes.SEND_MESSAGE_TO_ERROR, error})
    })
})