import React, {Component} from 'react';
import Friend from "./Friend";
import {Typography} from "@mui/material";

class Conversations extends Component {
    render() {
        return (
            <>
                <div>
                    {
                        this.props.friends.length === 0
                            ? <Typography color={'secondary'}>No Friends...</Typography>
                            : <div>
                                {
                                    this.props.friends.map(friend => (
                                        <Friend
                                            key={friend.id}
                                            friend={friend}
                                            active={this.props.activeUserId === friend.id}
                                            lastMessages={this.props.lastMessages[friend.id]}
                                            id={friend.id}
                                            setActiveUserId={this.props.setActiveUserId}
                                        />
                                    ))
                                }
                            </div>
                    }
                </div>
            </>
        );
    }
}

export default Conversations;