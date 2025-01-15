const { sendEmail } = require("../config/sendEmail.js");
const UserModel = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const { verifyEmailTemplate } = require("../utils/verifyEmailTemplate.js");
const { generateAccessToken } = require("../utils/generateAccessToken.js");
const { generateRefreshToken } = require("../utils/generateRefreshToken.js");
// const upload = require("../middlewares/multer.js");
const {
  uploadImageOnCloudinary,
} = require("../utils/uploadImageOnCloudinary.js");
const { generateOTP } = require("../utils/generateOTP.js");
const {
  forgotPasswordOTPTemplate,
} = require("../utils/forgotPasswordOTPTemplate.js");
const jwt = require("jsonwebtoken");

// Register User
exports.registerUserController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!( name || email || password)) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
        error: true,
      });
    }

    const user = await UserModel.findOne({ email });

    if (user) {
      return res.json({
        message: "User already exists",
        success: false,
        error: true,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const payload = {
      name,
      email,
      password: hashPassword,
    };

    const newUser = new UserModel(payload);
    await newUser.save();

    const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${newUser._id}`;

    const verifyEmail = await sendEmail({
      sendTo: email,
      subject: "Verify your email address",
      html: verifyEmailTemplate({
        name,
        url: verifyEmailUrl,
      }),
    });

    return res.json({
      message: " User registered successfully",
      error: false,
      success: true,
      newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error + " Internal Server Error",
      error: true,
    });
  }
};

// Verify Email
exports.verifyEmailController = async (req, res) => {
  try {
    const code = req.body;

    const user = await UserModel.findOne({ _id: code });

    if (!user) {
      return res.status(400).json({
        message: "Invalid code provided",
        success: false,
        error: true,
      });
    }

    const updateUser = await UserModel.updateOne(
      { _id: code },
      { verifyEmail: true }
    );

    return res.status(200).json({
      message: "Email verified successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error + "Internal Server Error",
      error: true,
      success: false,
    });
  }
};

// Login User
exports.loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email || password)) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
        error: true,
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
        error: true,
      });
    }

    if (user.status !== "Active") {
      return res.status(400).json({
        message:
          "User is not active for a long time, please contact the Admin to resume your activity.",
      });
    }

    const hashedPassword = await bcrypt.compare(password, user.password);

    if (!hashedPassword) {
      return res.status(400).json({
        message: "Invalid credentials",
        success: false,
        error: true,
      });
    }

    const accessToken = await generateAccessToken(user._id);
    const refreshToken = await generateRefreshToken(user._id);

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.cookie("accessToken", accessToken, cookieOptions);
    res.cookie("refreshToken", refreshToken, cookieOptions);

    return res.status(200).json({
      message: "User logged in successfully",
      success: true,
      error: false,
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error + "Internal Server Error",
      error: true,
      success: false,
    });
  }
};

// Logout User
exports.logoutUserController = async (req, res) => {
  try {
    const userId = req.userId;

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.clearCookie("accessToken", cookieOptions);
    res.clearCookie("refreshToken", cookieOptions);

    const removeRefreshToken = await UserModel.findByIdAndUpdate(userId, {
      refreshToken: "",
    });

    return res.status(200).json({
      message: "User logged out successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error + " : Internal Server Error",
      error: true,
      success: false,
    });
  }
};

// Upload User Avatar
exports.uploadAvatarController = async (req, res) => {
  try {
    const userId = req.userId;
    const image = req.file;

    const upload = await uploadImageOnCloudinary(image);

    const updateUser = await UserModel.findByIdAndUpdate(userId, {
      avatar: upload.secure_url,
    });

    return res.status(200).json({
      message: "Image uploaded successfully",
      success: true,
      error: false,
      data: {
        _id: userId,
        avatar: upload.secure_url,
      },
    });

    //console.log(image);
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error : " + error,
      error: true,
      success: false,
    });
  }
};

// Update User Details
exports.updateUserDetailsController = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, email, mobile, password } = req.body;

    let hashPassword = "";
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashPassword = await bcrypt.hash(password, salt);
    }

    const updateUser = await UserModel.updateOne(
      { _id: userId },
      {
        ...(name && { name }),
        ...(email && { email }),
        ...(mobile && { mobile }),
        ...(password && { password: hashPassword }),
      }
    );

    return res.status(200).json({
      message: "User details updated successfully",
      success: true,
      error: false,
      data: { updateUser },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error : " + error,
      error: true,
      success: false,
    });
  }
};

// Forgot Password OTP
exports.forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await UserModel.findOne({ email });
    console.log(user)

    if (!user) {
      return res.status(400).json({
        message: "Email not found",
        success: false,
        error: true,
      });
    }

    const otp = generateOTP();

    const expireTime = new Date(new Date().getTime() + 2 * 60 * 1000);  // 2 minute   new Date(new Date().getTime() + 10 * 60 * 1000);
    const expireTimeInMinutes = new Date(expireTime).toISOString();
    const update = await UserModel.findByIdAndUpdate(user._id, {
      forgotPasswordOTP: otp,
      forgotPasswordExpire: new Date(expireTimeInMinutes).toISOString(),
    });

    await sendEmail({
      sendTo: email,
      subject: "OTP for password reset",
      html: forgotPasswordOTPTemplate({ name: user.name, otp }),
    });

    return res.status(200).json({
      message: "OTP sent successfully, Please check your email",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error : " + error,
      error: true,
      success: false,
    });
  }
};

// verify forgot password otp
exports.verifyForgotPasswordOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!(email && otp)) {
      return res
        .status(400)
        .json({ status: false, message: "Please enter your Email and OTP." });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ status: false, message: "Email not available" });
    }
 
    const currentTime = new Date().toISOString();
    const otpExpiryTime = user.forgotPasswordExpire;
 
    // if (user.forgot_password_expiry < currentTime) {
    if (new Date(otpExpiryTime) < new Date(currentTime)) {
      return res.status(400).json({
        status: false,
        message: "OTP has expired. Please request a new OTP.",
      });
    }
 
    if (otp !== user.forgotPasswordOTP) {
      return res.status(400).json({
        status: false,
        message: "Incorrect OTP. Please try again or request a new one.",
      });
    }
 
    //if otp is not expire
    //if otp === user.forgot_password_otp
 
    return res
      .status(200)
      .json({ status: true, message: "OTP verified successfully." });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
// Reset the Password

exports.resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    if (!(email || newPassword || confirmPassword)) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
        error: true,
      });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Email not found",
        success: false,
        error: true,
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "New password and confirm password do not match",
        success: false,
        error: true,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);

    const update = await UserModel.findOneAndUpdate(user._id, {
      password: hashPassword,
    });

    return res.status(200).json({
      message: "Password reset successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error : " + error,
      error: true,
      success: false,
    });
  }
};

// Refresh Token Controller
exports.refreshTokenController = async (req, res) => {
  try {
    const refreshToken =
      req.cookies.refreshToken || req.headers.authorization.split(" ")[1];
    if (!refreshToken) {
      return res.status(401).json({
        message: "Unauthorized",
        error: true,
        success: false,
      });
    }

    console.log("refreshToken: ", refreshToken);

    const verifyToken = await jwt.verify(
      refreshToken,
      process.env.SECRET_KEY_REFRESH_TOKEN
    );
    if (!verifyToken) {
      return res.status(401).json({
        message: "Token is Expired",
        error: true,
        success: false,
      });
    }

    const userId = verifyToken._id;
    console.log("verifyToken: ", verifyToken);
    const newAccessToken = await generateAccessToken(userId);
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.cookie("accessToken", newAccessToken, cookieOptions);

    return res.status(200).json({
      message: "Token refreshed successfully",
      success: true,
      error: false,
      data:{
        accessToken: newAccessToken
      }
    })
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error : " + error,
      error: true,
      success: false,
    });
  }
};
