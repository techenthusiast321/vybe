import React, { useEffect } from 'react'
import axios from 'axios';
import { serverUrl } from '../App.jsx';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice.js';
import { setFollowing } from '../redux/userSlice.js';
import { useSelector } from 'react-redux';
import { setCurrentUserStory } from '../redux/storySlice.js';
import { setPrevChatUsers } from '../redux/messageSlice.js';

const getPrevChatUsers = () => {

    const dispatch = useDispatch();
    const { storyData } = useSelector((state) => state.story);
    const { message } = useSelector((state) => state.message);
 
    useEffect(() => {

        const fetchUser = async () => {
            try{
                const result = await axios.get(`${serverUrl}/api/message/prevChats`, { withCredentials: true });
                dispatch(setPrevChatUsers(result.data));
            }
            catch (error) {
                console.log(error);
            }
            
        }
        fetchUser();
    }, [message]);

}

export default getPrevChatUsers