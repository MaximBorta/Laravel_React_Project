import React, {useState} from 'react';
import {Alert} from "@mui/material";
import {Box, Collapse, IconButton} from "@material-ui/core";
import CloseIcon from '@mui/icons-material/Close';


const AlertComponent = ({authResponse}) => {
    const [open, setOpen] = useState(true)
        return (
            <>
                <Box>
                    <Collapse in={open}>
                        <Alert
                            variant="outlined"
                            severity="success"
                            color="info"
                            action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setOpen(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }>
                            {authResponse}
                        </Alert>
                    </Collapse>
                </Box>
            </>
        );
}

export default AlertComponent;