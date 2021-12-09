import HttpService from "./HttpService";

export default class ProfileServices {
    loadProfile = () => {
        const http = new HttpService()
        let profileUrl = 'users/view-profile'
        const tokenId = 'user-token'

        return http.getData(profileUrl, tokenId).then( (data) => {
            return data
        }).catch(error => {
            return error
        })
    }
}