import React, {Component} from 'react';
import '../../styles/Profile.css'
import EditForm from "./EditForm";
import swal from "sweetalert";



class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.userProfile.success === true && this.props.userProfile.data.name,
            email: this.props.userProfile.success === true && this.props.userProfile.data.email,
        }
        this.onEditProfileChange = this.onEditProfileChange.bind(this)
        this.onEditProfileSubmit = this.onEditProfileSubmit.bind(this)
    }

    onEditProfileChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onEditProfileSubmit(e) {
        e.preventDefault()
        this.props.EditProfileAction(this.state.name, this.state.email)
        swal({
            title: 'Success !',
            icon: 'success'
        })
    }

    render() {
        return (
            <div className="profile_card">
                <h1>Edit Profile</h1>
                <EditForm
                    {...this.props}
                    onEditProfileChange={this.onEditProfileChange}
                    onEditProfileSubmit={this.onEditProfileSubmit}
                    fields={this.state}
                />
            </div>
        );
    }
}

export default EditProfile;