import React, {useState} from 'react';
import {Button, Typography} from "@material-ui/core";
import '../../styles/Home.css'
import ModalComponent from "../HelpersComponent/ModalComponent";
import {useHistory} from "react-router-dom";
import usePagination from "../HelpersComponent/Paginator";
import {Box, Pagination} from "@mui/material";
import swal from "sweetalert";

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

    const deletePost = (id) => {
        props.deletePostAction(id)
        swal({
            title: 'Post Deleted !',
            icon: 'success'
        })
    }

        return (
            <>
                <Box display={"flex"} justifyContent={"center"} alignItems={"center"} mt={4}>
                    <Pagination
                        count={count}
                        page={page}
                        shape={"rounded"}
                        variant={"outlined"}
                        color={"primary"}
                        onChange={handleChange}
                    />
                </Box>
                <div className="post_card_wrapper">
                    {data.currentData().map(el => (
                        <div className="post_card" key={el.id}>
                            <div className="post_card_header">
                                <Typography>{el.title}</Typography>
                            </div>
                            <div className="post_card_body">
                                <ModalComponent src={`http://localhost:8000/post/${el.post_img}`} alt={el.title} />
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
                            </div>
                        </div>
                    ))}
                </div>
            </>
        );
}

export default PostItem;