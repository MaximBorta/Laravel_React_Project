import React from 'react'
import {connect} from "react-redux";
import {EditProfileAction, ProfileAction, UploadAvatarAction} from "../../redux/action/ProfileActionCreator";
import {onlineUsersAction} from "../../redux/action/onlineUsersAction";
import Profile from "./Profile";

const ProfileContainer = (props) => {
    return (
        <>
            <Profile {...props}/>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        userProfile: state.profileData.userProfile,
        isProfileLoading: state.profileData.isProfileLoading,
        responseToUpload: state.uploadAvatar.responseToUpload,
        isUploading: state.uploadAvatar.isUploading,
        isEditing: state.editProfile.isEditing,
        editedResponse: state.editProfile.editedResponse,

        isOnline: state.online.isOnline
    }
}

export default connect(mapStateToProps, {
    ProfileAction,
    UploadAvatarAction,
    EditProfileAction,
    onlineUsersAction
})(ProfileContainer);