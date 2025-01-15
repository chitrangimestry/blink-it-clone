const {
  registerUserController,
  verifyEmailController,
  loginUserController,
  logoutUserController,
  uploadAvatarController,
  updateUserDetailsController,
  forgotPasswordController,
  // verifyForgotPasswordOTPController,
  resetPasswordController,
  refreshTokenController,
  verifyForgotPasswordOtp,
} = require("../controllers/userController.js");

const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware.js");
const upload = require("../middlewares/multer.js");
const route = express.Router();

route.post("/register", registerUserController);
route.post("/verify-email", verifyEmailController);
route.post("/login", loginUserController);
route.get("/logout", authMiddleware, logoutUserController);
route.patch(
  "/uploadAvatar",
  authMiddleware,
  upload.single("avatar"),
  uploadAvatarController
);
route.patch("/updateUser", authMiddleware, updateUserDetailsController);
route.patch("/forgotPassword", forgotPasswordController);
route.patch("/verifyForgotPasswordOTP", verifyForgotPasswordOtp);
route.patch("/resetPassword", resetPasswordController);
route.post("/refreshToken", refreshTokenController);

module.exports = route;
