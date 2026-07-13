const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    bio: {
      type: String,
      default: "",
      maxlength: 300,
    },

    avatar: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      default: "",
    },

    experienceLevel: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced", "Professional"],
      default: "Beginner",
    },

    location: {
      type: String,
      default: "",
    },

    skills: [
      {
        type: String,
        trim: true,
      },
    ],

    socialLinks: {
      github: {
        type: String,
        default: "",
      },

      linkedin: {
        type: String,
        default: "",
      },

      portfolio: {
        type: String,
        default: "",
      },

      twitter: {
        type: String,
        default: "",
      },
    },

    collaborationStatus: {
      type: String,
      enum: ["Open", "Busy", "Looking for Team"],
      default: "Open",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);