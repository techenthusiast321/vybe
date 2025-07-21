import React, { useEffect } from 'react'
import axios from 'axios';
import { serverUrl } from '../App.jsx';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice.js';
import { setFollowing } from '../redux/userSlice.js';
import { useSelector } from 'react-redux';
import { setCurrentUserStory } from '../redux/storySlice.js';

const getFollowingList = () => {

    const dispatch = useDispatch();
    const { storyData } = useSelector((state) => state.story);
 
    useEffect(() => {

        const fetchUser = async () => {
            try{
                const result = await axios.get(`${serverUrl}/api/user/followingList`, { withCredentials: true });
                dispatch(setFollowing(result.data));
            }
            catch (error) {
                console.log(error);
            }
            
        }
        fetchUser();
    }, [storyData]);

}

export default getFollowingList;