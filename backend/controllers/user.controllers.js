import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";
import { getSocketId, io } from "../socket.js";
import Notification from "../models/notification.model.js";

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId)
      .populate("posts loops")
      .populate(
        "posts loops posts.author posts.comments saved saved.author story following"
      );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `getCurrentUser error ${error}` });
  }
};

export const suggestedUsers = async (req, res) => {
  try {
    const users = await User.find({
      _id: { $ne: req.userId }, // Exclude the current user
    }).select("-password");

    console.log("Suggested Users: ", users);

    res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: `suggestedUsers error ${error}` });
  }
};

export const editProfile = async (req, res) => {
  try {
    const { name, userName, bio, profession, gender } = req.body;
    console.log("Edit Profile Data: ", req.body);

    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const sameUserWithUserName = await User.findOne({ userName }).select(
      "-password"
    );

    if (sameUserWithUserName && sameUserWithUserName._id != req.userId) {
      return res.status(400).json({ message: "userName already exist" });
    }

    let profileImage = user.profileImage;
    if (req.file) {
      profileImage = await uploadOnCloudinary(req.file.path);
    }

    user.name = name;
    user.userName = userName;
    user.bio = bio;
    user.profession = profession;
    user.gender = gender;
    user.profileImage = profileImage;

    await user.save();

    return res
      .status(200)
      .json({ message: "Profile updated successfully", user });
  } catch (error) {
    return res.status(500).json({ message: `editProfile error ${error}` });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userName = req.params.userName;
    const user = await User.findOne({ userName })
      .select("-password")
      .populate("posts loops followers following");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `getProfile error ${error}` });
  }
};

export const follow = async (req, res) => {
  try {
    const currentUserId = req.userId;
    const targetUserId = req.params.targetUserId;
    console.log(currentUserId, targetUserId);

    if (!targetUserId) {
      return res.status(400).json({ message: "target user is not found" });
    }

    if (currentUserId == targetUserId) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    const currentUser = await User.findById(currentUserId);
    const targetUser = await User.findById(targetUserId);

    const isFollowing = currentUser.following.includes(targetUserId);
    if (isFollowing) {
      currentUser.following = currentUser.following.filter(
        (id) => id.toString() != targetUserId.toString()
      );
      targetUser.followers = targetUser.followers.filter(
        (id) => id.toString() != currentUserId.toString()
      );

      await currentUser.save();
      await targetUser.save();

      return res.status(200).json({
        message: "Unfollowed successfully",
        following: false,
      });
    } else {
      currentUser.following.push(targetUserId);
      targetUser.followers.push(currentUserId);

      if (currentUser._id != targetUser._id) {
        const notification = await Notification.create({
          sender: req.userId,
          receiver: targetUserId,
          type: "follow",
          // post: loop._id,
          message: `started following you`,
        });
        const populatedNotification = await Notification.findById(
          notification._id
        ).populate("sender receiver");

        const receiverSocketId = getSocketId(targetUserId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit(
            "newNotification",
            populatedNotification
          );
        }
      }

      await currentUser.save();
      await targetUser.save();

      return res.status(200).json({
        message: "Followed successfully",
        following: true,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: `backend follow error ${error}` });
  }
};

export const followingList = async (req, res) => {
  try {
    const result = await User.findById(req.userId);
    return res.status(200).json(result?.following);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `backend followingList error ${error}` });
  }
};

export const search = async (req, res) => {
  try {
    const keyWord = req.query.keyWord;
    if (!keyWord) {
      return res.status(400).json({ message: "keyword is required" });
    }

    const users = await User.find({
      $or: [
        { userName: { $regex: keyWord, $options: "i" } },
        { name: { $regex: keyWord, $options: "i" } },
      ],
    });

    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({
        message: `search error backend user controller search fn ${error}`,
      });
  }
};

export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      receiver: req.userId,
    }).populate("sender receiver post loop").sort({ createdAt: -1 });

    return res.status(200).json(notifications);
  } catch (error) {
    return res
      .status(500)
      .json({
        message: `getAllNotifications error backend user controller getAllNotifications fn ${error}`,
      });
  }
};

export const markAsRead = async (req, res) => {
  // try{
  //     const notificationId = req.params.notificationId;
  //     const notification = await Notification.findById(notificationId)
  //         .populate("sender receiver post loop");

  //     notification.isRead = true;
  //     await notification.save();

  //     return res.status(200).json({message: "marked as read"});
  // }
  try {
    const { notificationId } = req.body;

    if (Array.isArray(notificationId)) {
      // bulk mark-as-read
      await Notification.updateMany(
        { _id: { $in: notificationId }, receiver: req.userId },
        { $set: { isRead: true } }
      );
    } else {
      // mark single notification as read
      await Notification.findOneAndUpdate(
        { _id: notificationId, receiver: req.userId },
        { $set: { isRead: true } }
      );
    }
    return res.status(200).json({ message: "marked as read" });
  } catch (error) {
    return res
      .status(500)
      .json({
        message: `markAsRead error backend user controller markAsRead fn ${error}`,
      });
  }
};
