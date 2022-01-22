import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import '../../styles/EditCard.css'
import {editCardAction, showHomeCardAction} from "../../redux/action/homeActionCreator";
import {Box, Button, CircularProgress, Container, TextField, Typography} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Link} from "react-router-dom";

class HomeCardUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardId: JSON.parse(localStorage.getItem('showCard')),
            title: this.props.showCard !== '' && this.props.showCard.title,
            description: this.props.showCard !== '' && this.props.showCard.description,
            editedResponse: this.props.editedResponse
        }
        this.onCardChange = this.onCardChange.bind(this)
        this.onCardUpdate = this.onCardUpdate.bind(this)
        this.destroy = this.destroy.bind(this)
    }


    onCardChange(e) {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    onCardUpdate(e) {
        e.preventDefault()
        const formData = {
            title: this.state.title,
            description: this.state.description,
        }
        this.props.editCardAction(this.state.cardId, formData)
        this.props.history.push(`/card/show/${this.state.cardId}`)
    }

    componentDidMount() {
        this.props.showHomeCardAction(this.state.cardId)
    }

    destroy() {
        setTimeout(() => {
            this.setState({editedResponse: ''})
        }, 4000)
    }

    render() {
        let {isLoading, isEditing} = this.props
        return (
            <div>
                <Container maxWidth={"md"}>
                    {
                        isLoading === true
                            ? <div
                                style={{marginTop: 200, display: 'flex', justifyContent: 'center', alignItem: 'center'}}>
                                <CircularProgress/>
                            </div>
                            : <Box mt={4}>
                                <Link to={`/card/show/${this.state.cardId}`} style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItem: 'center',
                                    marginBottom: 10
                                }}>
                                    <ArrowBackIcon/>
                                    Go Back
                                </Link>
                                <div className="edit-card-wrapper">
                                    <Typography variant={'h4'}>Edit card</Typography>
                                    <form className="edit-card-form" onSubmit={this.onCardUpdate}>
                                        {
                                            this.state.editedResponse.success === true
                                                ? <Typography color={'secondary'} style={{
                                                    textAlign: 'center',
                                                    marginBottom: 10,
                                                    display: this.destroy() ? 'none' : 'block'
                                                }}>
                                                    {this.state.editedResponse.message}
                                                </Typography>
                                                : ''
                                        }
                                        {
                                            this.state.editedResponse.status === 422
                                            && <Typography color={'secondary'} style={{
                                                textAlign: 'center',
                                                marginBottom: 10,
                                                display: this.destroy() ? 'none' : 'block'
                                            }}>
                                                {this.state.editedResponse.data.message}
                                            </Typography>
                                        }
                                        <Box mb={2}>
                                            <TextField
                                                label={"title"}
                                                fullWidth={true}
                                                name={"title"}
                                                value={this.state.title}
                                                onChange={this.onCardChange}
                                            />
                                        </Box>
                                        <Box mb={2}>
                                            <TextField
                                                label={"description"}
                                                fullWidth={true}
                                                name={"description"}
                                                value={this.state.description}
                                                onChange={this.onCardChange}
                                            />
                                        </Box>
                                        <div className="edit-card-action">
                                            <Button type={"submit"}
                                                    variant={"outlined"}
                                                    fullWidth={true}
                                            >
                                                {
                                                    isEditing === true
                                                        ? <CircularProgress/>
                                                        : <Typography>Update</Typography>
                                                }
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </Box>
                    }
                </Container>
            </div>
        );
    }
}
HomeCardUpdate.propTypes = {
    isLoading: PropTypes.bool,
    isEditing: PropTypes.bool,
    showCard: PropTypes.object,
    editedResponse: PropTypes.object,
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.homeData.isLoading,
        isEditing: state.homeData.isEditing,
        showCard: state.homeData.showCard,
        editedResponse: state.homeData.editedResponse,
    }
}

export default connect(mapStateToProps, {
    editCardAction,
    showHomeCardAction
})(HomeCardUpdate);