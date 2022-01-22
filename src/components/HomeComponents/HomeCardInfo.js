import React, {Component} from 'react';
import {Box, Button, CircularProgress, Container, Typography} from "@mui/material";
import {connect} from "react-redux";
import '../../styles/ShowCard.css'
import {showHomeCardAction} from "../../redux/action/homeActionCreator";
import {Link} from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

class HomeCardInfo extends Component {
    constructor(props) {
        super(props);
            this.state = {
                cardId: JSON.parse(localStorage.getItem('showCard'))
            }
    }

    onEditHandler(id) {
        this.props.history.push(`/card/update/${id}`)
    }

    componentDidMount() {
        this.props.showHomeCardAction(this.state.cardId)
    }

    render() {
        let {showCard} = this.props
        return (
            <div>
                <Container maxWidth={'md'}>
                    {
                        showCard === ''
                        ? <div style={{marginTop: 200, display: 'flex', justifyContent: 'center', alignItem: 'center'}}>
                            <CircularProgress />
                            </div>
                        : <Box mt={6}>
                            <Box mb={4}>
                                <Link to={'/home'}>
                                    <div className={"back"}>
                                        <ArrowBackIcon />
                                        Go Back
                                    </div>
                                </Link>
                            </Box>
                            <div className="show-card-wrapper">
                                <div className="show-card-media">
                                    <img className="show-card-img" src={showCard.card_img} alt={showCard.title}/>
                                </div>
                                <div className="show-card-footer">
                                    <div className="show-card-body">
                                        <Typography variant={'h4'} color="primary">{showCard.title}</Typography>
                                        <p>{showCard.description}</p>
                                    </div>
                                    <div className="show-card-action">
                                        <Button
                                            fullWidth={true}
                                            variant={"contained"}
                                            color={'primary'}
                                            onClick={() => this.onEditHandler(showCard.id)}
                                        >
                                            Edit
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            </Box>
                    }
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.homeData.isLoading,
        showCard: state.homeData.showCard,
    }
}

export default connect(mapStateToProps, {
    showHomeCardAction
})(HomeCardInfo);