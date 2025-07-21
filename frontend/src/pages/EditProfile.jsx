import React from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dp from "../assets/dp.webp";
import { useRef } from "react";
import {useState} from 'react';
import axios from "axios";
import { serverUrl } from "../App.jsx";
import { useDispatch } from "react-redux";
import { setProfileData, setUserData } from "../redux/userSlice";
import { ClipLoader } from "react-spinners";

const EditProfile = () => {

    const {userData} = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const imageInput = useRef();
    const [frontendImage, setFrontendImage] = useState(userData.profileImage || dp);
    const [backendImage, setBackendImage] = useState(null);
    const [name, setName] = useState(userData.name || "");
    const [userName, setUserName] = useState(userData.userName || "");
    const [bio, setBio] = useState(userData.bio || "");
    const [profession, setProfession] = useState(userData.profession || "");
    const [gender, setGender] = useState(userData.gender || "");

    const [loading, setLoading] = useState(false);

    const handleImage = (e) => {
        const file = e.target.files[0];
        setBackendImage(file);
        setFrontendImage(URL.createObjectURL(file));
    }

    const handleEditProfile = async () => {

        setLoading(true);
        try{
         
            const formdata = new FormData();
            formdata.append("name", name);
            formdata.append("userName", userName);
            formdata.append("bio", bio);
            formdata.append("profession", profession);
            formdata.append("gender", gender);
            if(backendImage) {
                formdata.append("profileImage", backendImage);
            }

            const result = await axios.post(`${serverUrl}/api/user/editProfile`, formdata, {withCredentials: true});
            dispatch(setProfileData(result.data.user));
            dispatch(setUserData(result.data.user));
            setLoading(false);
            navigate(`/profile/${userData.userName}`);

        }
        catch(err) {
            console.error("Error updating profile:", err);
            setLoading(false);
        }

    }

    return (
        <div className="w-full min-h-[100vh] bg-black flex items-center flex-col gap-[20px] p-[20px]">

            <div className="w-full h-[80px] flex items-center gap-[20px] px-[20px]">
                <IoArrowBackOutline className="text-white w-[25px] h-[25px] cursor-pointer" onClick={() => navigate(`/profile/${userData.userName}`)} />
                <h1 className="text-white text-[20px] font-semibold">Edit Profile</h1>
            </div>

            <div className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] border-2 border-black rounded-full cursor-pointer overflow-hidden" onClick={() => imageInput.current.click()}>
                <input type="file" accept="image/*" ref={imageInput} hidden onChange={handleImage} />
                <img
                src={frontendImage}
                alt=""
                className="w-full object-cover"
                />
            </div>

            <div className="text-blue-500 text-center text-[18px] font-semibold cursor-pointer" onClick={() => imageInput.current.click()} >Change Your Profile Picture</div>

            <input type="text" className='w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 border-gray-700 rounded-2xl text-white font-semibold px-[20px] outline-none ' placeholder='Enter Your Name' onChange={(e) => setName(e.target.value)} value={name}/>

            <input type="text" className='w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 border-gray-700 rounded-2xl text-white font-semibold px-[20px] outline-none ' placeholder='Enter Your Username' onChange={(e) => setUserName(e.target.value)} value={userName} />

            <input type="text" className='w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 border-gray-700 rounded-2xl text-white font-semibold px-[20px] outline-none ' placeholder='Enter Your bio' onChange={(e) => setBio(e.target.value)} value={bio} />

            <input type="text" className='w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 border-gray-700 rounded-2xl text-white font-semibold px-[20px] outline-none ' placeholder='Enter Your profession' onChange={(e) => setProfession(e.target.value)} value={profession} />

            <input type="text" className='w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 border-gray-700 rounded-2xl text-white font-semibold px-[20px] outline-none ' placeholder='Enter Your gender' onChange={(e) => setGender(e.target.value)} value={gender} />

            <button className='px-[10px] w-[60%] max-w-[400px]   py-[5px] h-[50px] bg-[white] cursor-pointer rounded-2xl' onClick={handleEditProfile} >{loading ? <ClipLoader size={30} color='black' /> : "Save Profile"}</button>

        </div>
    );
};

export default EditProfile;
