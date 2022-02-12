import React, {useState} from 'react';
import {Button, Typography} from "@material-ui/core";
import CommentIcon from '@mui/icons-material/Comment';
import '../../styles/Home.css'
import ModalComponent from "../HelpersComponent/ModalComponent";
import {useHistory} from "react-router-dom";
import usePagination from "../HelpersComponent/Paginator";
import {Box, Pagination} from "@mui/material";
import swal from "sweetalert";
import {SearchFilter} from "../HelpersComponent/SearchFilter";

const PostItem = (props) => {
    const history = useHistory()
    const [page, setPage] = useState(1)
    const perPage = 6
    const count = Math.ceil(props.postResponse.length / perPage)
    const data = usePagination(props.postResponse, perPage)

    const handleChange = (e, p) => {
        setPage(p)
        data.jump(p)
    }

    const showPost = (id) => {
        localStorage.setItem('showPost', id)
        history.push(`/user/post/card/show/${id}`)
    }

    const showComments = (id) => {
        localStorage.setItem('showComments', id)
        history.push(`/user/post/comments/show/${id}`)
    }

    const deletePost = (id) => {
        props.deletePostAction(id)
        swal({
            title: 'Post Deleted !',
            icon: 'success'
        })
    }

    return (
        <>
            <Box mt={4}>
                <SearchFilter
                    searchTerm={props.searchTerm}
                    onSearchChange={(e) => props.onSearchChange(e, props.postResponse)}
                />
            </Box>
            {
                props.postResponse.length > perPage
                    ? <Box mt={4}>
                    <div style={{display: 'flex', justifyContent: 'center', marginTop: 40}}>
                        <Pagination
                            count={count}
                            page={page}
                            shape={"rounded"}
                            variant={"outlined"}
                            color={"primary"}
                            onChange={handleChange}
                        />
                    </div>
                    </Box>
                    : null
            }

            <div className="post_card_wrapper">
                {
                    props.filteredResult && props.filteredResult.length > 0
                        ? (
                            props.filteredResult.map(el => (
                                <div className="post_card" key={el.id}>
                                    <div className="post_card_header">
                                        <Typography>{el.title}</Typography>
                                    </div>
                                    <div className="post_card_body">
                                        <ModalComponent src={`http://localhost:8000/post/${el.post_img}`} alt={el.title}/>
                                    </div>
                                    <div className="post_card_action">
                                        <Button
                                            size={"small"}
                                            variant={"outlined"}
                                            color={"primary"}
                                            onClick={() => showPost(el.id)}
                                        >
                                            more
                                        </Button>
                                        <Button
                                            size={"small"}
                                            variant={"outlined"}
                                            color={"secondary"}
                                            onClick={() => deletePost(el.id)}
                                        >
                                            {
                                                props.isLoading === true
                                                    ? <Typography>deleting...</Typography>
                                                    : <Typography>delete</Typography>
                                            }
                                        </Button>
                                        <Button onClick={() => showComments(el.id)}>
                                            <CommentIcon />
                                        </Button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            data.currentData().map(el => (
                                <div className="post_card" key={el.id}>
                                    <div className="post_card_header">
                                        <Typography>{el.title}</Typography>
                                    </div>
                                    <div className="post_card_body">
                                        <ModalComponent src={`http://localhost:8000/post/${el.post_img}`}
                                                        alt={el.title}/>
                                    </div>
                                    <div className="post_card_action">
                                        <Button
                                            size={"small"}
                                            variant={"outlined"}
                                            color={"primary"}
                                            onClick={() => showPost(el.id)}
                                        >
                                            more
                                        </Button>
                                        <Button
                                            size={"small"}
                                            variant={"outlined"}
                                            color={"secondary"}
                                            onClick={() => deletePost(el.id)}
                                        >
                                            {
                                                props.isLoading === true
                                                    ? <Typography>deleting...</Typography>
                                                    : <Typography>delete</Typography>
                                            }
                                        </Button>
                                        <Button onClick={() => showComments(el.id)}>
                                            <CommentIcon />
                                        </Button>
                                    </div>
                                </div>
                            ))
                        )
                }
            </div>
        </>
    );
}

export default PostItem;