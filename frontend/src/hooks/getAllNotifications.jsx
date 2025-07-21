import React, { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App.jsx";
import { useDispatch } from "react-redux";
import { setPostData } from "../redux/postSlice.js";
import { useSelector } from "react-redux";
import { setNotificationData } from "../redux/userSlice.js";

function getAllNotifications() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/user/getAllNotifications`,
          { withCredentials: true }
        );
        dispatch(setNotificationData(result.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchNotifications();
  }, [dispatch, userData]);
}

export default getAllNotifications;
