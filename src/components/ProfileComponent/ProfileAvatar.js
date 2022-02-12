import React, {Component} from 'react';
import {Avatar} from "@mui/material";

class ProfileAvatar extends Component {
    componentDidMount() {
        this.props.ProfileAction()
    }

    render() {
        const {setModalState} = this.props
        return (
            <>
                {
                    this.props.data.success === true
                    && <div style={{width: 50, height: 50, borderRadius: 100, overflow: 'hidden', cursor: 'pointer'}}>
                    <Avatar
                        onClick={() => setModalState(true)}
                        src={`http://localhost:8000/avatars/${this.props.data.data.user_avatar}`}
                        alt={this.props.data.data.name}
                    />
                    </div>
                }
            </>
        );
    }
}

export default ProfileAvatar;