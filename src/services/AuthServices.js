import HttpService from './HttpService'

export const registerUser = (credentials) => {
    const http = new HttpService()
    let registerUrl = 'users/register'

    return http.postData(credentials, registerUrl).then(data => {
        return data
    }).catch(error => {
        return error
    })
}

export const loginUser = (credentials) => {
    const http = new HttpService()
    let loginUrl = 'users/login'

    return http.postData(credentials, loginUrl).then((data) => {
        return data
    }).catch(error => {
        return error
    })
}

export const logoutUser = () => {
    const http = new HttpService()
    let logoutUrl = 'users/logout'
    const tokenId = 'user-token'

    return http.getData(logoutUrl, tokenId).then((data) => {
        return data
    }).catch(error => {
        return error
    })
}
