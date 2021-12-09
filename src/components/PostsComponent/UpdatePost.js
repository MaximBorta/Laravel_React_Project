import React, {Component} from 'react';
import {connect} from "react-redux";
import {getPostActionId, updatePostAction} from "../../redux/action/postActionCreator";
import {Box, Button, Container, TextField, Typography} from "@mui/material";
import UploadButtons from "../HelpersComponent/UploadField";
import {Link} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

class UpdatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.showPost.title !== '' && this.props.showPost.title,
            description: this.props.showPost.description !== '' && this.props.showPost.description,
            post_img: '',
        }

        this.postId = JSON.parse(localStorage.getItem('showPost'))

        this.onUpdatePostChange = this.onUpdatePostChange.bind(this)
        this.onUploadPostChange = this.onUploadPostChange.bind(this)
        this.onUpdatePost = this.onUpdatePost.bind(this)
    }

    onUpdatePostChange(e) {
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value
        })
    }

    onUploadPostChange(e) {
        this.setState({
            ...this.state,
            [e.target.id]: e.target.files[0]
        })
    }

    onUpdatePost(e) {
        e.preventDefault()

        let formData = new FormData()
        formData.append('title', this.state.title)
        formData.append('description', this.state.description)
        formData.append('post_img', this.state.post_img)

        this.props.updatePostAction(this.postId, formData)
    }

    componentDidMount() {
        this.props.getPostActionId(this.postId)
    }

    render() {
        return (
            <div>
                <Container maxWidth={"sm"}>
                    <Box mt={4} textAlign={"center"}>
                        <Box mb={4}>
                            <Link to={`/user/post/card/show/${this.postId}`}>
                                <div className={"back"}>
                                    <ArrowBackIcon/>
                                    Go Back
                                </div>
                            </Link>
                        </Box>
                        <Typography variant={'h4'} color={'primary'}>Edit Post</Typography>
                    </Box>
                    <form onSubmit={this.onUpdatePost}>
                        {
                            this.props.updatePostResponse.success === true
                            && <Box mt={2} textAlign={"center"}>
                                    <h4 style={{color: '#3ba41a'}}>{this.props.updatePostResponse.message}</h4>
                                </Box>
                        }
                        {
                            this.props.responseError.status === 422
                                && <Box mt={2} textAlign={"center"}>
                                    <h4 style={{color: '#b91e10'}}>{this.props.responseError.data.message}</h4>
                                </Box>
                        }
                        <Box mt={4}>
                            <TextField
                                fullWidth={true}
                                id={'title'}
                                name={'title'}
                                value={this.state.title || ''}
                                variant={"filled"}
                                onChange={this.onUpdatePostChange}
                            />
                        </Box>
                        <Box mt={2}>
                            <TextField
                                fullWidth={true}
                                id={'description'}
                                name={'description'}
                                value={this.state.description || ''}
                                variant={"filled"}
                                onChange={this.onUpdatePostChange}
                                />
                        </Box>
                        <Box>
                            <UploadButtons onPostUpload={this.onUploadPostChange}/>
                        </Box>
                        <Box mt={2}>
                            <Button fullWidth={true} type={"submit"} variant={'contained'} color={'primary'}>
                                {
                                    this.props.isLoading === true
                                    ? <Typography>Updating...</Typography>
                                    : <Typography>Update</Typography>
                                }
                            </Button>
                        </Box>
                    </form>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.postData.isLoading,
        showPost: state.postData.showPost,
        updatePostResponse: state.postData.updatePostResponse,
        responseError: state.postData.responseError,
    }
}

export default connect(mapStateToProps, {
    updatePostAction,
    getPostActionId
})(UpdatePost);