import React, { use } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { serverUrl } from '../App.jsx';
import { setStoryData } from '../redux/storySlice.js';
import StoryCard from '../components/StoryCard.jsx';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Story = () => {

    const { userName } = useParams();
    const dispatch = useDispatch();
    const { storyData } = useSelector((state) => state.story);

    const handleStory = async () => {

        try{
            const result = await axios.get(`${serverUrl}/api/story/getByUserName/${userName}`, {withCredentials: true});
            console.log("story data frontend ", result.data);
            dispatch(setStoryData(result.data));
        }
        catch(error){
            console.error("Error fetching story:", error);
        }

    }
    useEffect(() => {
        if(userName){
            handleStory();
        }
    }, [userName]);

    return (
        <div className='w-full h-[100vh] bg-black flex justify-center items-center'>
            <StoryCard storyData={storyData} />
        </div>
    )
}

export default Story