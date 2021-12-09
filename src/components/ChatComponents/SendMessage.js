import React, {Component} from 'react';
import {TextField} from "@mui/material";

class SendMessage extends Component {
    render() {
        return (
            <div className={"send_message_input"}>
                <TextField
                    fullWidth={true}
                    placeholder={"write message..."}
                />
            </div>
        );
    }
}

export default SendMessage;