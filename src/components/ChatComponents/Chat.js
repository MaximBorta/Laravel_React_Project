import React, {Component} from 'react';
import * as ActionTypes from '../../redux/types/actionTypes'
import {CircularProgress, Container} from "@mui/material";
import '../../styles/Chat.css'
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {fetchFriends} from "../../redux/action/chatAction/friendsAction";
import {
    addLocalMsgToConversation,
    fetchConversationWith,
    fetchLastMessages,
    fetchLastMessageWith, setActiveUserId
} from "../../redux/action/chatAction/conversationAction";
import Conversations from "./Conversations";
import {sentMessage, sentMessageTo} from "../../redux/action/chatAction/messageAction";
import ChatMessages from "./ChatMessages";
import eventBus from "../../EventBus";
import {ProfileAction} from "../../redux/action/ProfileActionCreator";
import echo from "../../echo";
import SendMessage from "./SendMessage";

class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            notifications: new Audio('/public_sounds_notification.mp3')
        }
        this.startConversation = this.startConversation.bind(this)
    }

    componentDidMount() {
        eventBus.on(ActionTypes.SET_ACTIVE_USER_ID, this.startConversation)
        eventBus.emit(
            ActionTypes.SEND_MESSAGE_TO,
            () => {
                this.props.fetchConversationWith(this.props.activeUserId)
            }
        )


        this.props.fetchFriends()
        this.props.fetchLastMessages()
        this.props.ProfileAction().then(() => {
            echo.private(`user-channel.${this.props.userProfile.data.id}`)
                .listen('MessageSent', (e) => {
                    debugger
                    let msg = e.message

                    if (msg.sender_id === this.props.activeUserId) {
                        this.props.fetchConversationWith(msg.sender_id)
                    } else {
                        this.props.fetchLastMessageWith(msg.sender_id)
                    }
                    if (!document.hasFocus()) this.state.notifications.play()
                })
            echo.private('global-channel')
                .listen('UserRegistered', (e) => {
                    debugger
                    this.props.fetchFriends()
                })
        })
    }

    startConversation() {
        this.props.fetchConversationWith(this.props.activeUserId)
    }

    render() {
        return (
            <div>
                <Container maxWidth={'lg'}>
                    <h1>Chat Page</h1>
                    <div className={"chat-wrapper"}>
                        <div className={"conversation-wrapper"}>
                            {
                                this.props.isFetching === true
                                    ? <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                        <CircularProgress color={"secondary"}/>
                                    </div>
                                    : <>
                                        <Conversations
                                            friends={this.props.friends}
                                            isFetching={this.props.isFetching}
                                            lastMessages={this.props.lastMessages}
                                            activeUserId={this.props.activeUserId}
                                            setActiveUserId={this.props.setActiveUserId}
                                        />
                                    </>
                            }
                        </div>
                        <div className={"message_wrapper"}>
                            <ChatMessages
                                userProfile={this.props.userProfile}
                                conversation={this.props.conversation}
                                message={this.props.message}
                                activeUserId={this.props.activeUserId}
                                sentMessage={this.props.sentMessage}
                                sentMessageTo={this.props.sentMessageTo}
                                addLocalMsgToConversation={this.props.addLocalMsgToConversation}
                            />
                        </div>
                        <SendMessage />
                    </div>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        friends: state.friends.friends,
        isFetching: state.friends.isFetching,
        activeUserId: state.activeUserId,
        conversation: state.conversation,
        message: state.message,
        lastMessages: state.lastMessages,
        conversationCache: state.conversationCache,

        userProfile: state.profileData.userProfile
    }
}

export default withRouter(
    connect(mapStateToProps, {
        fetchFriends,
        fetchConversationWith,
        fetchLastMessageWith,
        fetchLastMessages,
        sentMessage,
        sentMessageTo,
        setActiveUserId,
        addLocalMsgToConversation,

        ProfileAction
    })(Chat)
);