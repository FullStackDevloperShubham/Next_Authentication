import nodemailer from 'nodemailer';
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        // create a hash token
        const hashToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId,
                {
                    verifyToken: hashToken, verfyTokenExpiration: Date.now() + 3600000
                })
        } else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId,
                {
                    forgetPasswordToken: hashToken, forgetPasswordTokenExpiry: Date.now() + 3600000
                })
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "4939a318b2d462",
                pass: "3566c42f42c766"
                //   add abov details to .env
            }
        });

        const mailOptions = {
            from: 'rohit@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.domain}/verifyemail?token=${hashToken}">here<a/> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser.<br> ${process.env.domain}/verifyemail?token=${hashToken}</p>`
        }

        const mailResponce = await transport.sendMail(mailOptions)

        return mailResponce


    } catch (error: any) {
        throw new Error(error.message)

    }
}