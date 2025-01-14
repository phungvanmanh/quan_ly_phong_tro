import dotenv from "dotenv";
import { UserService } from "../services/UserService";
import { Request, Response } from "express";
import nodemailer from 'nodemailer'

dotenv.config();


const transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
	  user: process.env.MAIL_USERNAME,
	  pass: process.env.MAIL_PASSWORD
	}
  })

export const register = async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const userService = new UserService();
  const result=  await userService.registerUser(body);
 const mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: req.body.email,
    subject: 'Xác thực tài khoản của bạn',
    text: `Chào ${req.body.name}, vui lòng xác thực tài khoản của bạn bằng cách nhấp vào liên kết sau: ${process.env.CLIENT_ORIGIN}/verify-email?token=${result.email_verify_token}`
  }
  //cấu hình gửi email
  await transporter.sendMail(mailOptions)
    res.status(200).json({
      message: "Đăng ký thành công!",
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};
export const login = async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const userService = new UserService();
    const token = await userService.loginUser(body);

    res.status(200).json({
      message: "Login successfuly!!!",
      data: { token },
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};
export const verifyEmail1 = async (req: Request, res: Response) => {
  const email = req.body.email;
  try {
    const userService = new UserService();
    const TokenVerify = await userService.Veriftemail(email);
    res.json({
      message: "Tao Verify Token Thanh Cong",
      TokenVerify,
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};
export const  sendverifymail =async (req:Request ,res:Response) =>{
 //chua viet
}

export const  sendPassword =async (req:Request ,res:Response) =>{
	//chua viet
}

export const ResendMail = async (req:Request,res:Response) =>{

}
export const verifypassword = async (req:Request,res:Response) =>{

}