import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice.js';
import postSlice from './postSlice.js';
import loopSlice from './loopSlice.js';
import storySlice from './storySlice.js';
import messageSlice from './messageSlice.js';
import socketSlice from './socketSlice.js';

const store = configureStore({

    reducer: {
        user: userSlice,
        post: postSlice,
        loop: loopSlice,
        story: storySlice,
        message: messageSlice, 
        socket: socketSlice, 
    }

});


export default store;