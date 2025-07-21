import React, { useEffect } from 'react'
import axios from 'axios';
import { serverUrl } from '../App.jsx';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice.js';
import { setFollowing } from '../redux/userSlice.js';
import { useSelector } from 'react-redux';
import { setStoryList } from '../redux/storySlice.js';

const getAllStories = () => {

    const dispatch = useDispatch();
    const { userData } = useSelector((state) => state.user);
    const { storyData } = useSelector((state) => state.story);
 
    useEffect(() => {

        const fetchStories = async () => {
            try{
                const result = await axios.get(`${serverUrl}/api/story/getAll`, { withCredentials: true });
                dispatch(setStoryList(result.data)); 
            }
            catch (error) {
                console.log(error);
            }
            
        }
        fetchStories();
    }, [userData, storyData]);

}

export default getAllStories;