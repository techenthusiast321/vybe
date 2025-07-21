import React, { useEffect } from 'react'
import axios from 'axios';
import { serverUrl } from '../App.jsx';
import { useDispatch } from 'react-redux';
import { setPostData } from '../redux/postSlice.js';
import { useSelector } from 'react-redux';
import { setLoopData } from '../redux/loopSlice.js';

const getAllLoops = () => {

    const dispatch = useDispatch();
    const { userData } = useSelector((state) => state.user);
 
    useEffect(() => {

        const fetchloops = async () => {
            try{
                const result = await axios.get(`${serverUrl}/api/loop/getAll`, { withCredentials: true });
                dispatch(setLoopData(result.data));
                console.log("All loops fetched successfully:", result.data);
            }
            catch (error) {
                console.log(error);
            }
            
        }
        fetchloops();
    }, [userData, dispatch]);

}

export default getAllLoops;