import React from "react";
import { FaRegHeart } from "react-icons/fa";
import logo from "../assets/logo.png";
import StoryDp from "./StoryDp";
import { useSelector } from "react-redux";
import Nav from "./Nav";
import getSuggestedUsers from "../hooks/getSuggestedUsers.jsx";
import Post from "./Post";
import { BiMessageAltDetail } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Feed = () => {
  const navigate = useNavigate();

  const { postData } = useSelector((state) => state.post);
  const { userData } = useSelector((state) => state.user);
  const { storyList } = useSelector((state) => state.story);
  const { currentUserStory } = useSelector((state) => state.story);
  const { notificationData } = useSelector((state) => state.user);
  // console.log(userData);

  return (
    <div className="lg:w-[50%] min-h-[100vh] bg-[black] w-full lg:h-[100vh] relative lg:overflow-y-auto">
      <div
        className="w-full h-[100px] flex items-center justify-between p-[20px]
            lg:hidden"
      >
        <img src={logo} alt="" className="w-[80px]" />
        <div className="flex items-center gap-[10px]">
          <div
            className="relative z-[100]"
            onClick={() => setShowNotification((prev) => !prev)}
          >
            <FaRegHeart className="text-[white] w-[25px] h-[25px]" />
            {notificationData?.length > 0 &&
              notificationData.some((noti) => noti.isRead === false) && (
                <div className="w-[10px] h-[10px] bg-blue-600 rounded-full absolute top-0 right-[-5px]"></div>
              )}
          </div>
          <BiMessageAltDetail
            className="text-white w-[25px] h-[25px]"
            onClick={() => navigate("/messages")}
          />
        </div>
      </div>

      <div className="flex w-full overflow-auto gap-[20px] items-center p-[20px]">
        <StoryDp
          userName={"Your Story"}
          ProfileImage={userData?.profileImage}
          story={currentUserStory}
        />

        {storyList?.map((story, index) => (
          <StoryDp
            userName={story.author.userName}
            ProfileImage={story.author.profileImage}
            story={story}
          />
        ))}
      </div>

      <div className="w-full min-h-[100vh] flex flex-col items-center gap-[20px] p-[10px] pt-[40px] bg-white rounded-t-[60px] relative pb-[120px]">
        <Nav />

        {postData?.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
