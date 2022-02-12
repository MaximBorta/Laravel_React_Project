import React, {Component} from 'react';
import '../../styles/Post.css'
import {Box, Container} from "@mui/material";
import {Button, CircularProgress, Typography} from "@material-ui/core";
import PostItem from "./PostItem";
import withSearchFilter from "../../HOC/withSearchFilter";


class Post extends Component {
    constructor(props) {
        super(props);
        this.createPost = this.createPost.bind(this)
    }
    componentDidMount() {
        this.props.getPostsAction()
    }
     createPost() {
        this.props.history.push('/user/user-posts/create')
    }

    render() {
        return (
            <>
                {
                    this.props.isLoading === true
                        ? <div style={{display: 'flex', justifyContent: 'center', marginTop: 100}}>
                            <CircularProgress/>
                        </div>
                        : <Container maxWidth={"lg"}>
                            <Typography variant="h3" color={"primary"} style={{textAlign: 'center'}}>
                                Posts
                            </Typography>
                            <Button
                                variant={"contained"}
                                color={"primary"}
                                onClick={this.createPost}
                            >
                                Create post
                            </Button>
                            {
                                this.props.postResponse.length !== 0
                                    ? <div>
                                        <PostItem {...this.props} />
                                    </div>
                                    : <Box mt={4}>
                                        <Typography variant={'h4'} color={"secondary"}>No posts...</Typography>
                                    </Box>
                            }
                        </Container>
                }
            </>
        );
    }
}

export default withSearchFilter(Post)