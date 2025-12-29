exports.otpTemplate = (otp) => {
  return `
  <!DOCTYPE html>
  <html>
  <body style="margin:0;padding:0;background-color:#ffffff;font-family:Arial,sans-serif;">
    
    <div style="max-width:600px;margin:0 auto;padding:20px;text-align:center;">
      
      <img src="https://i.ibb.co/7Xyj3PC/logo.png" 
           alt="StudyNotion Logo" 
           style="max-width:200px;margin-bottom:20px;" />

      <h2 style="color:#333;">OTP Verification Email</h2>

      <p style="font-size:16px;color:#333;">Dear User,</p>

      <p style="font-size:16px;color:#333;">
        Thank you for registering with StudyNotion. Please use the OTP below to verify your account:
      </p>

      <h1 style="color:#000;background:#FFD60A;padding:10px;border-radius:5px;">
        ${otp}
      </h1>

      <p style="font-size:14px;color:#555;">
        This OTP is valid for <b>5 minutes</b>. If you did not request this, please ignore this email.
      </p>

      <p style="font-size:14px;color:#999;margin-top:20px;">
        Need help? Contact us at 
        <a href="mailto:info@studynotion.com">info@studynotion.com</a>
      </p>

    </div>
  </body>
  </html>`;
};
