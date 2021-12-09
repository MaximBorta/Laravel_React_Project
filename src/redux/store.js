import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk'
import {authReducers} from "./reducers/authReducers";
import {profileReducer} from "./reducers/profileReducer";
import { reducer as formReducer } from 'redux-form'
import {uploadAvatarReducer} from "./reducers/uploadAvatarReduces";
import {editProfileReducer} from './reducers/editProfileReducer'
import {homeReducer} from "./reducers/homeReducer";
import {postReducer} from "./reducers/postReducer";
import {activeUserIdReducer} from "./reducers/chat/activeUserIdReducer";
import {conversationReducer} from "./reducers/chat/conversationReducer";
import {messageReducer} from "./reducers/chat/messageReducer";
import {friendsReducer} from "./reducers/chat/friendsReducer";
import {lastMessagesReducer} from "./reducers/chat/lastMessagesReducer";
import {conversationCacheReducer} from "./reducers/chat/conversationCacheReducer";


let rootReducer = combineReducers({
    authData: authReducers,
    profileData: profileReducer,
    uploadAvatar: uploadAvatarReducer,
    editProfile: editProfileReducer,
    homeData: homeReducer,
    postData: postReducer,

    activeUserId: activeUserIdReducer,
    conversation: conversationReducer,
    message: messageReducer,
    friends: friendsReducer,
    lastMessages: lastMessagesReducer,
    conversationCache: conversationCacheReducer,

    form: formReducer
})


const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
    ),
)

export default store