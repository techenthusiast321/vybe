import React, { use } from 'react'
import { useState } from 'react'
import { ClipLoader } from 'react-spinners';
import axios from 'axios';
import { serverUrl } from '../App.jsx';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {

    const [step, setStep] = useState(1);
    const [inputClicked, setInputClicked] = useState({
        email: false,
        otp: false,
        newPassword: false,
        confirmNewPassword: false,
    });

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");

    const sendOtp = async () => {
        setLoading(true);
    }

    const handleStep1 = async () => {
        setLoading(true);
        setErr("");
        try{

            const result = await axios.post(`${serverUrl}/api/auth/sendOtp`, { email }, {withCredentials: true});
            console.log(result.data);
            setLoading(false);
            setStep(2); // Move to the next step after sending OTP

        }
        catch(err){
            console.error("Error during step 1:", err);
            setLoading(false);
            setErr(err.response.data.message);
        }

    }

    const handleStep2 = async () => {
        setLoading(true);
        setErr("");
        try{

            const result = await axios.post(`${serverUrl}/api/auth/verifyOtp`, { email, otp }, {withCredentials: true});
            console.log(result.data);
            setLoading(false);
            setStep(3); // Move to the next step after verifying OTP

        }
        catch(err){
            console.error("Error during step 2:", err);
            setLoading(false);
            setErr(err.response.data.message);
        }

    }

    const handleStep3 = async () => {
        setLoading(true);
        setErr("");
        try{

            if(newPassword !== confirmNewPassword){
                setLoading(false);
                return setErr("Passwords do not match");
            }

            const result = await axios.post(`${serverUrl}/api/auth/resetPassword`, { email, password: newPassword }, {withCredentials: true});
            console.log(result.data);
            setLoading(false);

        }
        catch(err){
            console.error("Error during step 3:", err);
            setLoading(false);
            setErr(err.response.data.message);
        }

    }

    return (
        <div className='w-full h-screen bg-gradient-to-b from-black to gray-900 flex flex-col justify-center items-center'>
            
            {step ==1 && <div className='w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex justify-center items-center flex-col border-[#1a1f23]'>

                <h2 className='text-[30px] font-semibold'>Forgot Password</h2>
                <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black mt-[30px]' onClick={() => setInputClicked({...inputClicked, email:true})}>

                    <label htmlFor='email' className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.email ? " top-[-15px]" : ""}`}>Enter Your email</label>
                    <input type='text' id='email' className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0' required  onChange={(e) => setEmail(e.target.value)} value={email}/>
                    
                </div>

                {err && <p className='text-red-500 text-[14px]'>{err}</p>}

                <button className='w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl mt-[30px]' disabled={loading} onClick={handleStep1}>{loading ? <ClipLoader size={30} color='white' /> : "Send OTP"}</button>

            </div>}


            {step == 2 && <div className='w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex justify-center items-center flex-col border-[#1a1f23]'>

                <h2 className='text-[30px] font-semibold'>Forgot Password</h2>
                <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black mt-[30px]' onClick={() => setInputClicked({...inputClicked, otp:true})}>

                    <label htmlFor='otp' className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.otp ? " top-[-15px]" : ""}`}>Enter Otp here</label>
                    <input type='text' id='otp' className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0' required  onChange={(e) => setOtp(e.target.value)} value={otp}/>
                    
                </div>

                {err && <p className='text-red-500 text-[14px]'>{err}</p>}

                <button className='w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl mt-[30px]' onClick={handleStep2} disabled={loading}>{loading ? <ClipLoader size={30} color='white' /> : "Submit"}</button>

            </div>}

            {step == 3 && <div className='w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex justify-center items-center flex-col border-[#1a1f23]'>

                <h2 className='text-[30px] font-semibold'>Reset Password</h2>
                <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black mt-[30px]' onClick={() => setInputClicked({...inputClicked, newPassword:true})}>

                    <label htmlFor='newPassword' className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.newPassword ? " top-[-15px]" : ""}`}>Enter new Password</label>
                    <input type='text' id='newPassword' className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0' required  onChange={(e) => setNewPassword(e.target.value)} value={newPassword}/>
                    
                </div>

                <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black mt-[30px]' onClick={() => setInputClicked({...inputClicked, confirmNewPassword:true})}>

                    <label htmlFor='confirmNewPassword' className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.confirmNewPassword ? " top-[-15px]" : ""}`}>Confirm New Password</label>
                    <input type='text' id='confirmNewPassword' className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0' required  onChange={(e) => setConfirmNewPassword(e.target.value)} value={confirmNewPassword}/>
                    
                </div>

                {err && <p className='text-red-500 text-[14px]'>{err}</p>}

                <button className='w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl mt-[30px]' onClick={handleStep3} disabled={loading}>{loading ? <ClipLoader size={30} color='white' /> : "Reset Password"}</button>

            </div>
            
            
            
            }
            

        </div>
    )
}

export default ForgotPassword