import React, {Component} from 'react';
import * as ActionTypes from '../../redux/types/actionTypes'
import {SEND_MESSAGE_TO} from '../../redux/types/actionTypes'
import {CircularProgress, Container, Fade} from "@mui/material";
import '../../styles/Chat.css'
import Conversations from "./Conversations";
import ChatMessages from "./ChatMessages";
import eventBus from "../../EventBus";
import EventBus from "../../EventBus";
import echo from "../../echo";
import SendMessage from "./SendMessage";
import {scrollToBotton} from "../../helpers/scollToBottom";
import {SlideTransition} from "../HelpersComponent/SlideTransition";
import Snackbar from "@mui/material/Snackbar";
import OnlineUsers from "./OnlineUsers";

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications: new Audio('/public_sounds_notification.mp3'),
            userTyping: '',
            isVisible: true,
            typing: false,
            onlineUser: '',
            open: false,
            Transition: Fade
        }
        this.startConversation = this.startConversation.bind(this)
        this.sendMessageEchoListener = this.sendMessageEchoListener.bind(this)
        this.sendMessage = this.sendMessage.bind(this)
        this.updatedMessage = this.updatedMessage.bind(this)
        this.clickToBottom = this.clickToBottom.bind(this)
        this.toggleToScroll = this.toggleToScroll.bind(this)
        this.isTyping = this.isTyping.bind(this)
        this.handleOpen = this.handleOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.isOnlineUserEchoListener = this.isOnlineUserEchoListener.bind(this)
    }

    messageEndRef = React.createRef()
    messageWrapperRef = React.createRef()

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState !== this.state) {
            return true
        } else {
            return false
        }
    }

    componentDidMount() {
        this.messageWrapperRef.current.addEventListener('scroll', this.toggleToScroll)
        scrollToBotton(this.messageEndRef)
        eventBus.on(ActionTypes.SET_ACTIVE_USER_ID, this.startConversation)
        eventBus.emit(
            ActionTypes.SEND_MESSAGE_TO,
            () => {
                this.props.fetchConversationWith(this.props.activeUserId)
            }
        )
        this.props.fetchFriends()
        this.props.fetchLastMessages()
        if (this.messageWrapperRef.current)
            this.props.ProfileAction().then(() => {
                this.sendMessageEchoListener()
                this.isTypingEchoListers()
                this.isOnlineUserEchoListener()
            })
    }

    componentWillUnmount() {
        this.messageWrapperRef.current.removeEventListener('scroll', this.toggleToScroll)
    }
    handleOpen(Transition) {
        this.setState({
            ...this.state,
            open: true,
            Transition
        })
    }
    handleClose() {
        this.setState({
            ...this.state,
            open: false,
        })
    }

    startConversation() {
        this.props.fetchConversationWith(this.props.activeUserId)
    }

    sendMessage(e) {
        e.preventDefault()
        if (!this.props.message) return
        this.props.addLocalMsgToConversation(this.props.message).then(() => {
            this.props.sentMessageTo(this.props.activeUserId).then(() => {
                EventBus.emit(SEND_MESSAGE_TO)
            })
            this.props.sentMessage('')
        })
    }

    isOnlineUserEchoListener() {
        echo.join('chat')
            .joining((user) => {
                this.props.onlineUsersAction(user.id)
            })
            .leaving((user) => {
                this.props.offlineUsersAction(user.id)
            })
            .listen('UserOnline', (e) => {
                this.handleOpen(SlideTransition)
                this.setState({onlineUser: `${e.user.name} is online`})
            })
            .listen('UserOffline', (e) => {
                this.handleOpen(SlideTransition)
                this.setState({onlineUser: `${e.user.name} is offline`})
            })
    }

    sendMessageEchoListener() {
        echo.private(`user-channel.${this.props.userProfile.data.id}`)
            .listen('MessageSent', (e) => {
                let msg = e.message
                if (msg.sender_id === this.props.activeUserId) {
                    this.props.fetchConversationWith(msg.sender_id, true)
                } else {
                    this.props.fetchLastMessageWith(msg.sender_id)
                }
                if (!document.hasFocus()) this.state.notifications.play()
            })
    }

    updatedMessage(e) {
        this.props.sentMessage(e.target.value)
    }

    isTyping() {
        const {userProfile} = this.props
        let channel = echo.private('global-channel')
        setTimeout(() => {
            channel.whisper('typing', {
                user: `${userProfile.data.name} typing...`,
                typing: true
            })
        }, 300)
    }

    isTypingEchoListers() {
        echo.private('global-channel')
            .listen('UserRegistered', (e) => {
                this.props.fetchFriends();
            })
            .listenForWhisper('typing', (user) => {
                this.setState({
                    userTyping: user.user,
                    typing: user.typing
                })
                setTimeout(() => {
                    this.setState({
                        typing: false
                    })
                }, 1500)
            })
    }

    clickToBottom() {
        scrollToBotton(this.messageEndRef)
    }

    toggleToScroll() {
        let scrollTop = this.messageWrapperRef.current.scrollTop
        let offsetHeight = this.messageWrapperRef.current.offsetHeight / 2
        if (scrollTop < offsetHeight) {
            this.setState({
                isVisible: true
            })
        } else {
            this.setState({
                isVisible: false
            })
        }
    }

    render() {
        return (
            <div>
                <Container maxWidth={'lg'}>
                    <div>
                        <h1>Chat Page</h1>
                        <OnlineUsers />
                    </div>
                    <Snackbar
                        open={this.state.open}
                        onClose={this.handleClose}
                        TransitionComponent={this.state.Transition}
                        message={this.state.onlineUser}
                    />
                    <div className={"chat-wrapper"}>
                        <div className={"conversation-wrapper"}>
                            {
                                this.props.isFetching === true
                                    ? <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                        <CircularProgress color={"secondary"}/>
                                    </div>
                                    : <>
                                        {
                                            this.props.messageError.status === 422
                                            && <strong style={{color: 'red'}}>
                                                {this.props.messageError.data.errors.message}
                                            </strong>
                                        }
                                        <Conversations
                                            friends={this.props.friends}
                                            isFetching={this.props.isFetching}
                                            lastMessages={this.props.lastMessages}
                                            activeUserId={this.props.activeUserId}
                                            setActiveUserId={this.props.setActiveUserId}
                                            onlineUser={this.state.onlineUser}
                                        />
                                    </>
                            }
                        </div>
                        <div className={"message_wrapper"} ref={this.messageWrapperRef}>
                            <ChatMessages
                                typing={this.state.typing}
                                userTyping={this.state.userTyping}
                                isVisible={this.state.isVisible}
                                clickToBottom={this.clickToBottom}
                                userProfile={this.props.userProfile}
                                conversation={this.props.conversation}
                                message={this.props.message}
                                activeUserId={this.props.activeUserId}
                                sentMessage={this.props.sentMessage}
                                sentMessageTo={this.props.sentMessageTo}
                                addLocalMsgToConversation={this.props.addLocalMsgToConversation}
                            />
                            <div ref={this.messageEndRef}/>
                        </div>
                    </div>
                    <div className={"send_message_input"}>
                        <SendMessage
                            isTyping={this.isTyping}
                            sendMessage={this.sendMessage}
                            message={this.props.message}
                            updatedMessage={this.updatedMessage}
                        />
                    </div>
                </Container>
            </div>
        );
    }
}

export default Chat
