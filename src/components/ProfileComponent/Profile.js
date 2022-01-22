import React, {Component} from 'react';
import {CircularProgress, Container, Grid} from "@material-ui/core";
import ProfileCard from "./ProfileCard";
import EditProfile from "./EditProfile";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userAvatar: ''
        }

        this.onUploadChange = this.onUploadChange.bind(this)
        this.onUploadSubmit = this.onUploadSubmit.bind(this)
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.props !== nextProps) {
            return true
        } else {
            return false
        }
    }

    onUploadChange(e) {
        this.setState({
            userAvatar: e.target.files[0]
        })
    }

    onUploadSubmit(e) {
        e.preventDefault()
        let formData = new FormData()
        formData.append('user_avatar', this.state.userAvatar)
        this.props.UploadAvatarAction(formData)
    }

    componentDidMount() {
        let {ProfileAction} = this.props
        ProfileAction()
    }

    render() {
        return (
            <>
                {
                    this.props.isProfileLoading === true
                        ? <div style={{display: 'flex', justifyContent: 'center', marginTop: 100}}>
                            <CircularProgress/>
                        </div>
                        : <Container maxWidth={"md"}>
                            {
                                this.props.userProfile.success === true
                                && <div className="profile_title">
                                    <h1 className="greeting">{this.props.userProfile.message}</h1>
                                </div>
                            }
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <ProfileCard
                                        {...this.props}
                                        onUploadChange={this.onUploadChange}
                                        onUploadSubmit={this.onUploadSubmit}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <EditProfile {...this.props}/>
                                </Grid>
                            </Grid>
                        </Container>
                }
            </>
        );
    }
}

export default Profile