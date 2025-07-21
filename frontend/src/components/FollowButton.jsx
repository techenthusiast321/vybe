import React from 'react'
import axios from 'axios';
import { serverUrl } from '../App.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFollow } from '../redux/userSlice.js';
import { useNavigate } from 'react-router-dom';

const FollowButton = ({targetUserId, tailwind, onFollowChange}) => {

    const dispatch = useDispatch();

    const following = useSelector((state) => state.user.following);
    const isFollowing = following.includes(targetUserId);

    const handleFollow = async () => {

        try{

            const result = await axios.get(`${serverUrl}/api/user/follow/${targetUserId}`, { withCredentials: true });
            dispatch(toggleFollow(targetUserId));
            if(onFollowChange) {
                onFollowChange();
            }
        }
        catch (error) {
            console.log("Error in handleFollow: ", error);
        }

    }

    return (
        <button className={tailwind} onClick={handleFollow}>
            {isFollowing ? "Following" : "Follow"}
        </button>
    )
}

export default FollowButton