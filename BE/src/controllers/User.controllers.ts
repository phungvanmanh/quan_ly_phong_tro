import { ObjectId } from 'mongodb';
import { loginbody, RegisterReqBody } from '../models/requests/users';
import UserService1 from '../service/User.services';
import { Request, Response,NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";

export const Register = async(req:Request<ParamsDictionary,any, RegisterReqBody> ,res:Response, next:NextFunction) =>{
 const resuilt = await UserService1.Register(req.body)
 res.status(200).json({
    message :"Đăng ký thành công",
    resuilt
 })

}

export const login = async(req:Request<ParamsDictionary,any, loginbody> ,res:Response,next:NextFunction) =>{
 const {user}:any =req
 const user_id =user._id as ObjectId
 const resuil= await UserService1.login({user_id:user_id.toString(), verify:user.verify})
 res.status(200).json({
   message :"đăng nhập thành công",
   resuil
})
 
}