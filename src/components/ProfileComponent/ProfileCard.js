import React, {Component} from 'react';
import '../../styles/Profile.css'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import {CircularProgress} from "@material-ui/core";
import AlertComponent from "../../helpers/AlertComponent";

class ProfileCard extends Component {

    render() {
        return (
            <div className="profile_card">
                {
                    this.props.responseToUpload.isAxiosError === true
                    && <AlertComponent authResponse={this.props.responseToUpload.response.data.error}/>
                }
                {
                    this.props.responseToUpload.status === 200
                    && <AlertComponent authResponse={this.props.responseToUpload.data.message}/>
                }
                {
                    this.props.userProfile.success === true
                    && <>
                        <div className="profile_header">
                            <h1 className="profile_name">{this.props.userProfile.data.name}</h1>
                            <span className="profile_email">{this.props.userProfile.data.email}</span>
                        </div>
                        <label htmlFor="user_avatar">
                            <div className="profile_media">
                                <img className="profile_img"
                                     src={`http://localhost:8000/avatars/${this.props.userProfile.data.user_avatar}`}
                                     alt={this.props.userProfile.data.name}
                                />
                            </div>
                        </label>
                        <div className="profile_action">
                            <form onSubmit={this.props.onUploadSubmit}>
                                <input
                                    type="file"
                                    hidden={true}
                                    id="user_avatar"
                                    name="user_avatar"
                                    onChange={this.props.onUploadChange}
                                />
                                <button className="upload_button" type={"submit"}>
                                    {
                                        this.props.isUploading === true
                                            ? <CircularProgress color={"secondary"}/>
                                            : <>
                                                Upload avatar
                                                <DriveFolderUploadIcon/>
                                            </>
                                    }
                                </button>
                            </form>
                        </div>
                    </>
                }
            </div>
        );
    }
}

export default ProfileCard;