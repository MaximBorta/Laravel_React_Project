import React, {Component} from 'react'
import {connect} from "react-redux";
import '../../styles/ShowPostCard.css'
import {getPostActionId} from "../../redux/action/postActionCreator";
import {Box, Button, CircularProgress, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {Container} from "@material-ui/core";
import {withRouter} from "react-router-dom";

class PostCardInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cardId: JSON.parse(localStorage.getItem('showPost'))
        }

        this.onEditHandler = this.onEditHandler.bind(this)
    }

    componentDidMount() {
        this.props.getPostActionId(this.state.cardId)
    }

    onEditHandler(id) {
        this.props.history.push(`/user/post/card/update/${id}`)
    }

    render() {
        return (
            <Container maxWidth={"md"}>
                {
                    this.props.isLoading === true
                        ? <div style={{marginTop: 200, display: 'flex', justifyContent: 'center', alignItem: 'center'}}>
                            <CircularProgress/>
                        </div>
                        : <Box mt={6}>
                            <Box mb={4}>
                                <Link to={'/user/user-posts'}>
                                    <div className={"back"}>
                                        <ArrowBackIcon />
                                        Go Back
                                    </div>
                                </Link>
                            </Box>
                            <div>
                                {
                                    <div className="show-card-wrapper">
                                        <div className="show-card-media">
                                            <img className="show-card-img" src={`http://localhost:8000/post/${this.props.showPost.post_img}`} alt={this.props.showPost.title}/>
                                        </div>
                                        <div className="show-card-footer">
                                            <div className="show-card-body">
                                                <Typography variant={'h4'} color="primary">{this.props.showPost.title}</Typography>
                                                <p>{this.props.showPost.description}</p>
                                            </div>
                                            <div className="show-card-action">
                                                <Button
                                                    fullWidth={true}
                                                    variant={"contained"}
                                                    color={'primary'}
                                                    onClick={() => this.onEditHandler(this.props.showPost.id)}
                                                >
                                                    Edit
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </Box>
                }
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.postData.isLoading,
        showPost: state.postData.showPost,
    }
}

const PostCardInfoWithRouter = withRouter(PostCardInfo)

export default connect(mapStateToProps, {
    getPostActionId
})(PostCardInfoWithRouter);