import React, { useEffect } from 'react'
import axios from 'axios';
import { serverUrl } from '../App.jsx';
import { useDispatch } from 'react-redux';
import { setPostData } from '../redux/postSlice.js';
import { useSelector } from 'react-redux';

const getAllPost = () => {

    const dispatch = useDispatch();
    const { userData } = useSelector((state) => state.user);
 
    useEffect(() => {

        const fetchPost = async () => {
            try{
                const result = await axios.get(`${serverUrl}/api/post/getAll`, { withCredentials: true });
                dispatch(setPostData(result.data));
                console.log("All posts fetched successfully:", result.data);
            }
            catch (error) {
                console.log(error);
            }
            
        }
        fetchPost();
    }, [userData, dispatch]);

}

export default getAllPost;