import React, {Component} from 'react';
import {Box, Container, TextField, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import UploadButtons from "../HelpersComponent/UploadField";
import {Button, CircularProgress} from "@mui/material";
import {connect} from "react-redux";
import {createPostAction} from "../../redux/action/postActionCreator";

class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
                title: '',
                description: '',
                post_img: '',
        }
        this.onPostChange = this.onPostChange.bind(this)
        this.onPostUpload = this.onPostUpload.bind(this)
        this.onPostSubmit = this.onPostSubmit.bind(this)
    }

    onPostChange(e) {
        this.setState({
            ...this.state,
                [e.target.id]: e.target.value
        })
    }
    onPostUpload(e) {
        this.setState({
            ...this.state,
            [e.target.id]: e.target.files[0]
        })
    }

    onPostSubmit(e) {
        let formData = new FormData()
        formData.append('title', this.state.title)
        formData.append('description', this.state.description)
        formData.append('post_img', this.state.post_img)
        e.preventDefault()
        this.props.createPostAction(formData)
        this.setState({
            title: '',
            description: '',
        })
    }

    render() {
        return (
            <>
                <Container maxWidth={"md"}>
                        <Box mt={6} textAlign={'center'}>
                            <Typography variant={'h4'} color={"primary"}>
                                Create post
                            </Typography>
                            <Link to={'/user/user-posts'}>
                                <div className={"back"}>
                                    <ArrowBackIcon />
                                    Go Back
                                </div>
                            </Link>
                        </Box>
                        <Box mt={4} boxShadow={8} padding={2}>
                            <form onSubmit={this.onPostSubmit} encType="multipart/form-data">
                                {
                                    this.props.createPostResponse.success === true
                                    ? <Typography variant={'h5'} style={{textAlign: 'center'}} color={"secondary"}>{this.props.createPostResponse.message}</Typography>
                                    : null
                                }
                                {
                                    this.props.responseError.status === 422
                                    ? <Typography style={{textAlign: 'center'}} variant={'h5'} color={"secondary"}>{this.props.responseError.data.message}</Typography>
                                    : null
                                }
                                <Box mb={2}>
                                    <TextField
                                        fullWidth={true}
                                        name={'title'}
                                        id={'title'}
                                        variant="filled"
                                        value={this.state.title}
                                        label={'create post title'}
                                        onChange={this.onPostChange}
                                    />
                                </Box>
                                <Box mb={2}>
                                    <TextField
                                        fullWidth={true}
                                        name={'description'}
                                        id={'description'}
                                        variant="filled"
                                        value={this.state.description}
                                        label={'create post description'}
                                        onChange={this.onPostChange}
                                    />
                                </Box>
                                <Box mb={2}>
                                    <UploadButtons
                                        onPostUpload={this.onPostUpload}
                                    />
                                </Box>
                                <Box>
                                    <Button variant={'contained'} color={'primary'} type={'submit'}>
                                        {
                                            this.props.isLoading === true
                                            ? <CircularProgress />
                                            : <Typography>Create</Typography>
                                        }
                                    </Button>
                                </Box>
                            </form>
                        </Box>
                </Container>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        createPostResponse: state.postData.createPostResponse,
        responseError: state.postData.responseError,
        isLoading: state.postData.isLoading,
    }
}

export default connect(mapStateToProps, {
    createPostAction
})(CreatePost);