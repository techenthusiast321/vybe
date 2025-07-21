import React, { useEffect } from 'react'
import axios from 'axios';
import { serverUrl } from '../App.jsx';
import { useDispatch } from 'react-redux';
import { setSuggestedUsers } from '../redux/userSlice.js';
import { useSelector } from 'react-redux';

const getSuggestedUsers = () => {

    const dispatch = useDispatch();
    const { userData } = useSelector((state) => state.user);
    console.log("calling suggested user hook to backend")
 
    useEffect(() => {

        const fetchUser = async () => {
            try{
                const result = await axios.get(`${serverUrl}/api/user/suggested`, { withCredentials: true });
                dispatch(setSuggestedUsers(result.data));
                console.log("Suggested Users: ", result.data);
            }
            catch (error) {
                console.log(error);
            }
            
        }
        fetchUser();
    }, [userData]);

}

export default getSuggestedUsers;