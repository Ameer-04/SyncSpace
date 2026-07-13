const User = require("../models/User");

const getUserProfile = async (req, res) => {
  try {
    const userProfile = await User.findById(req.user.id).select("-password");
    if (!userProfile) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(userProfile);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const {
      name,
      bio,
      avatar,
      location,
      role,
      experienceLevel,
      collaborationStatus,
      skills,
      socialLinks,
    } = req.body;

    const updatePayload = {};

    if (name !== undefined) updatePayload.name = name;
    if (bio !== undefined) updatePayload.bio = bio;
    if (avatar !== undefined) updatePayload.avatar = avatar;
    if (location !== undefined) updatePayload.location = location;
    if (role !== undefined) updatePayload.role = role;
    if (experienceLevel !== undefined) updatePayload.experienceLevel = experienceLevel;
    if (collaborationStatus !== undefined) updatePayload.collaborationStatus = collaborationStatus;
    if (skills !== undefined) updatePayload.skills = skills;
    if (socialLinks !== undefined) updatePayload.socialLinks = socialLinks;

    const userProfile = await User.findByIdAndUpdate(
      req.user.id,
      updatePayload,
      { new: true }
    ).select("-password");

    if (!userProfile) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(userProfile);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
};