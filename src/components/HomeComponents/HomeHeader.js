import React, {Component} from 'react';
import PropTypes from 'prop-types'
import CarouselHoc from "../../HOC/carouselHoc";
import {Carousel} from "../HelpersComponent/Carousel";
import {Button} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

class HomeHeader extends Component {
    render() {
        let {response, index, previous, next} = this.props
        return (
            <div>
                {
                    response.length !== 0
                    && <div style={{position: 'relative'}}>
                        {
                            <Carousel index={index}>
                                {
                                    response.map((el) => (
                                        <div key={el.id} style={{position: "relative"}}>
                                            <img src={el.img} alt={el.title}/>
                                            <div style={{
                                                position: "absolute",
                                                left: '35%',
                                                top: '20%',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                flexDirection: 'column',
                                                flexWrap: 'wrap',
                                                alignItems: 'center',
                                                color: '#3cc5b5',
                                                fontSize: 30,
                                            }}>
                                                <h2>{el.title}</h2>
                                                <p>{el.description}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </Carousel>
                        }
                        <div style={{
                            position: 'absolute',
                            width: '100%',
                            left: '0',
                            top: '45%',
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                            <Button onClick={previous} style={{float: 'left'}}>
                                <ArrowBackIosIcon/>
                            </Button>
                            <Button onClick={next}>
                                <ArrowForwardIosIcon/>
                            </Button>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

HomeHeader.propTypes = {
    response: PropTypes.array,
    index: PropTypes.number,
    previous: PropTypes.func,
    next: PropTypes.func,
}

export default CarouselHoc((HomeHeader));