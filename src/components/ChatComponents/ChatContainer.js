import React, {Component} from 'react'
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {fetchFriends} from "../../redux/action/chatAction/friendsAction";
import {
    addLocalMsgToConversation,
    fetchConversationWith,
    fetchLastMessages,
    fetchLastMessageWith, setActiveUserId
} from "../../redux/action/chatAction/conversationAction";
import {sentMessage, sentMessageTo} from "../../redux/action/chatAction/messageAction";
import {ProfileAction} from "../../redux/action/ProfileActionCreator";
import {offlineUsersAction, onlineUsersAction} from "../../redux/action/onlineUsersAction";
import PropTypes from "prop-types";
import Chat from "./Chat";

class ChatContainer extends Component {
    render() {
        return (
            <>
                <Chat {...this.props}/>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        friends: state.friends.friends,
        isFetching: state.friends.isFetching,
        activeUserId: state.activeUserId.activeUserId,
        conversation: state.conversation,
        message: state.message,
        messageError: state.messageError,
        lastMessages: state.lastMessages,
        conversationCache: state.conversationCache,

        userProfile: state.profileData.userProfile,
        isOnline: state.online.isOnline
    }
}
ChatContainer.propTypes = {
    ProfileAction: PropTypes.func.isRequired,
    activeUserId: PropTypes.number,
    addLocalMsgToConversation: PropTypes.func.isRequired,
    conversation: PropTypes.array,
    conversationCache: PropTypes.object,
    fetchConversationWith: PropTypes.func.isRequired,
    fetchFriends: PropTypes.func.isRequired,
    fetchLastMessageWith: PropTypes.func.isRequired,
    fetchLastMessages: PropTypes.func.isRequired,
    friends: PropTypes.array,
    isFetching: PropTypes.bool,
    message: PropTypes.string,
    sentMessage: PropTypes.func.isRequired,
    sentMessageTo: PropTypes.func.isRequired,
    setActiveUserId: PropTypes.func.isRequired,
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
        offlineUsersAction,
        ProfileAction,
        onlineUsersAction,
    })(ChatContainer)
);

