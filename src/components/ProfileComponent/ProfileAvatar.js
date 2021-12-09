import React, {Component} from 'react';
import {Avatar} from "@material-ui/core";

class ProfileAvatar extends Component {
    componentDidMount() {
        this.props.ProfileAction()
    }

    render() {
        return (
            <>
                {
                    this.props.userProfile.success === true
                    && <>
                        <Avatar alt={this.props.userProfile.data.name} src={`http://localhost:8000/avatars/${this.props.userProfile.data.user_avatar}`} />
                    </>
                }
            </>
        );
    }
}

export default ProfileAvatar;