import {configureStore} from '@reduxjs/toolkit'
import {postsReducer} from "./slices/posts";
import {authReducer} from "./slices/auth";

const store = configureStore({
    reducer: {
        posts: postsReducer,
        auth: authReducer
    }
},  window["__REDUX_DEVTOOLS_EXTENSION__"] && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store