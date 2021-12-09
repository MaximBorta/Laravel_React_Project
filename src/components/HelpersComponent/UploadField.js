import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
    button: {
        margin: theme.spacing(1),
    },
}));

export default function UploadButtons(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <input
                className={classes.input}
                id="post_img"
                type="file"
                onChange={props.onPostUpload}
            />
            <label htmlFor="post_img">
                <Button
                    variant="contained"
                    component="span"
                    color="primary"
                    className={classes.button}
                    startIcon={<CloudUploadIcon />}
                >
                    Upload
                </Button>
            </label>
        </div>
    );
}