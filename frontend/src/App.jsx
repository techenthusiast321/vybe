import React from 'react'
import { Route } from 'react-router-dom'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import { Routes } from 'react-router-dom'
import ForgotPassword from './pages/ForgotPassword.jsx'
import getCurrentUser from './hooks/getCurrentUser.jsx'
import { useSelector } from 'react-redux'
import Home from './pages/Home.jsx'
import { Navigate } from 'react-router-dom'
import getSuggestedUsers from './hooks/getSuggestedUsers.jsx'
import Profile from './pages/Profile.jsx'
import EditProfile from './pages/EditProfile.jsx'
import Upload from './pages/Upload.jsx'
import getAllPost from './hooks/getAllPost.jsx'
import Loops from './pages/Loops.jsx'
import getAllLoops from './hooks/getAllLoops.jsx'
import Story from './pages/Story.jsx'
import getAllStories from './hooks/getAllStories.jsx'
import Messages from './pages/Messages.jsx'
import MessagesArea from './pages/MessageArea.jsx'
import { io } from 'socket.io-client'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setSocket } from './redux/socketSlice.js'
import getFollowingList from './hooks/getFollowingList.jsx'
import { setOnlineUsers } from './redux/socketSlice.js'
import getPrevChatUsers from './hooks/getPrevChatUsers.jsx'
import Search from './pages/Search.jsx'
import getAllNotifications from './hooks/getAllNotifications.jsx'
import Notifications from './pages/Notifications.jsx'
import { setSelectedUser } from './redux/messageSlice.js'
import { setNotificationData } from './redux/userSlice.js'

export const serverUrl = "https://social-media-vybe-backend.onrender.com";

const App = () => {

  getCurrentUser();
  getSuggestedUsers();
  getAllPost();
  getAllLoops();
  getAllStories();
  getFollowingList();
  getPrevChatUsers();
  getAllNotifications();

  const { userData} = useSelector((state) => state.user);
  const { socket } = useSelector((state) => state.socket);
  const { notificationData } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userData) {
      const socketIo = io(serverUrl, {
        query:{
          userId: userData._id,
        }
      });
      dispatch(setSocket(socketIo));

      socketIo.on('getOnlineUsers', (users) => {
        dispatch(setOnlineUsers(users));
        // console.log("Online Users: ", users);
      });

      return () => socketIo.close();
    }
    else{
      if(socket){
        socket.close();
        dispatch(setSocket(null));
      }
    }
  }, [userData]);

  socket?.on('newNotification', (noti) => {
    dispatch(setNotificationData([...notificationData, noti]));
  })

  return (

    <Routes>
      <Route path="/signup" element={ !userData ? <SignUp /> : <Navigate to={"/"} />} />
      <Route path="/signin" element={ !userData ? <SignIn /> : <Navigate to={"/"} />} />
      <Route path="/" element={ userData ? <Home /> : <Navigate to={"/signin"} />} />
      <Route path="/forgot-password" element={ !userData ? <ForgotPassword /> : <Navigate to={"/"} />} />
      <Route path="/profile/:userName" element={ userData ? <Profile /> : <Navigate to={"/signin"} />} />
      <Route path="/editprofile" element={ userData ? <EditProfile /> : <Navigate to={"/signin"} />} /> 
      <Route path="/upload" element={ userData ? <Upload /> : <Navigate to={"/signin"} />} /> 
      <Route path='/loops' element={ userData ? <Loops /> : <Navigate to={"/signin"} />} />
      <Route path='/story/:userName' element={ userData ? <Story /> : <Navigate to={"/signin"} />} />
      <Route path='/messages' element={ userData ? <Messages /> : <Navigate to={"/signin"} />} />
      <Route path='/messageArea' element={ userData ? <MessagesArea /> : <Navigate to={"/signin"} />} />
      <Route path='/search' element={ userData ? <Search /> : <Navigate to={"/signin"} />} />
      <Route path='/notifications' element={ userData ? <Notifications /> : <Navigate to={"/signin"} />} />
    </Routes>

  )
}

export default App;