const nodeMailer = require('nodemailer');
require('dotenv').config();
const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls:{
        rejectUnauthorized: false,
    }
});

exports.sendOTP = async(to, otp) => {
    if(!to || typeof to !==  'string' || !to.includes('@')){
        throw new Error('Không tìm thấy email hợp lệ của người dùng');
    }

    await transporter.sendMail({
    from: `"Your App" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Xác thực OTP",
    html: `<p>Mã OTP của bạn là: <b>${otp}</b></p>`,
  });
};  
