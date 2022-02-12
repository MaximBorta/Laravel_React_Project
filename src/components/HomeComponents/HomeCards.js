import React, {useState} from 'react';
import '../../styles/Home.css'
import {Box, Button, Container, Pagination} from "@mui/material";
import {useHistory} from "react-router-dom";
import usePagination from "../HelpersComponent/Paginator";
import ModalComponent from "../HelpersComponent/ModalComponent";
import {SearchFilter} from "../HelpersComponent/SearchFilter";

const HomeCards = (props) => {
    const history = useHistory()
    const [page, setPage] = useState(1)
    const perPage = 6
    const count = Math.ceil(props.getCards.length / perPage)
    const data = usePagination(props.getCards, perPage)

    const handleChange = (e, p) => {
        setPage(p)
        data.jump(p)
    }


    const onShowCard = (id) => {
        localStorage.setItem('showCard', id)
        history.push(`/card/show/${id}`)
    }

    return (
        <div>
            <Box mt={6}>
                <Container maxWidth={"lg"}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column'
                    }}>
                        <h1 style={{textAlign: 'center'}}>Cards</h1>
                        <SearchFilter
                            searchTerm={props.searchTerm}
                            onSearchChange={(e) => props.onSearchChange(e, props.getCards)}
                        />
                        <div style={{margin: 20}}>
                            <Pagination
                                count={count}
                                page={page}
                                shape={"rounded"}
                                variant={"outlined"}
                                color={"primary"}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="home-card-wrapper">
                        {
                            props.filteredResult && props.filteredResult.length > 0
                                ?
                                (
                                    props.filteredResult.map(data => (
                                        <div className="home-card" key={data.id}>
                                            <span className="home-card-id">{data.id}</span>
                                            <ModalComponent src={data.card_img} alt={data.title}/>
                                            <div className="home-card-body">
                                                <h2>{data.title}</h2>
                                            </div>
                                            <div className="home-card-action">
                                                <Button
                                                    fullWidth={true}
                                                    variant={"contained"}
                                                    color={"primary"}
                                                    onClick={() => onShowCard(data.id)}
                                                >
                                                    More
                                                </Button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    data.currentData().map(data => (
                                        <div className="home-card" key={data.id}>
                                            <span className="home-card-id">{data.id}</span>
                                            <ModalComponent src={data.card_img} alt={data.title}/>
                                            <div className="home-card-body">
                                                <h2>{data.title}</h2>
                                            </div>
                                            <div className="home-card-action">
                                                <Button
                                                    fullWidth={true}
                                                    variant={"contained"}
                                                    color={"primary"}
                                                    onClick={() => onShowCard(data.id)}
                                                >
                                                    More
                                                </Button>
                                            </div>
                                        </div>
                                    ))
                                )
                        }
                    </div>
                </Container>
            </Box>
        </div>
    );
}

export default HomeCards