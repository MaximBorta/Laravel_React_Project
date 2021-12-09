import axios from 'axios'
import * as ActionTypes from '../../types/actionTypes'

const BASE_URL = 'http://localhost:8000/api/users'
const token = localStorage.getItem('user-token')
const options = {
    headers: {
        'Authorization': 'Bearer ' + token
    }
}

export const fetchFriends = () => (dispatch) =>

    new Promise((resolve, reject) => {
        dispatch({type: ActionTypes.IS_FETCHING_FRIENDS})
        axios.get(`${BASE_URL}/friends`, options).then(res => {
            dispatch({type: ActionTypes.FETCH_FRIENDS, payload: res.data})
        })
        return resolve()
    })