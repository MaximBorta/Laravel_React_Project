import React, {Component} from 'react';
import Friend from "./Friend";

class Conversations extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <div>
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
            </>
        );
    }
}

export default Conversations;