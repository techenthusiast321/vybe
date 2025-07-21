import React, { use } from 'react'
import { GoHomeFill } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { RxVideo } from "react-icons/rx";
import { FiPlusSquare } from "react-icons/fi";
import dp from '../assets/dp.webp';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { setProfileData } from '../redux/userSlice.js';

const Nav = () => {

    const navigate = useNavigate();
    const { userData } = useSelector((state) => state.user);

    return (
        <div className='w-[90%] lg:w-[40%] h-[80px] bg-black flex justify-around items-center fixed bottom-[20px] rounded-full shadow-[#000000] z-[100]'>

            <div className='text-white w-[25px] h-[25px] cursor-pointer' onClick={() => navigate('/')}><GoHomeFill /></div>
            <div className='text-white w-[25px] h-[25px] cursor-pointer' onClick={() => navigate('/search')}><FaSearch /></div>
            <div onClick={() => navigate("/upload")} ><FiPlusSquare className='text-white w-[25px] h-[25px] cursor-pointer' /></div>
            <div className='text-white w-[25px] h-[25px] cursor-pointer' onClick={() => navigate('/loops')}><RxVideo /></div>
            <div className='w-[40px] h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden' onClick={() => navigate(`/profile/${userData.userName}`)}>
                <img src={ userData.profileImage || dp} alt='' className='w-full object-cover' />
            </div>

        </div>
    )
}

export default Nav