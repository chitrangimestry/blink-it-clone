exports.forgotPasswordOTPTemplate = ({name, otp}) => {
    return `
    <div>
          <h1>Dear ${name},</h1>
          <p>OTP for password reset is ${otp}. </p>
          <p>Please use the following OTP to reset your password. This OTP is valid for 1 hour</p> 
          </br>
          </br>
          <p>Thanks</p>
          <p>Team BlinkIt</p>
    </div>
    `;
}