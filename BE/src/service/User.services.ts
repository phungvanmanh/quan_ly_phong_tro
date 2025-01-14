import { ObjectId } from "mongodb";
import { TokenType, UserVerifyStatus } from "../constants/enums";
import User from "../models/schemas/users.schemas";
import { signToken } from "../utils/jwt";
import databaseService from "./database.services";
import { loginbody, RegisterReqBody } from "../models/requests/users";
import { USERS_MESSAGES } from "../constants/Messager";
import RefreshToken from "../models/schemas/refresh_token";

class UserService {
   
 private signAccessToken({ user_id, verify }: { user_id: string; verify: UserVerifyStatus }) {
        return signToken({
          payload: {
            user_id,
            token_type: TokenType.AccessToken,
            verify
          },
          privatekey: process.env.JWT_SECRET_ACCESS_TOKEN as string,
          options: {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN 
          }
        })
      }
      private signRefreshToken({ user_id, verify }: { user_id: string; verify: UserVerifyStatus }) {
        return signToken({
          payload: {
            user_id,
            token_type: TokenType.RefreshToken,
            verify
          },
          privatekey: process.env.JWT_SECRET_REFRESH_TOKEN as string,
          options: {
            expiresIn: process.env.REFRSH_TOKEN_EXPIRES_IN
          }
        })
      }
      //hàm tạo tokenemail
      private signEmailVeryfiToken({ user_id, verify }: { user_id: string; verify: UserVerifyStatus }) {
        return signToken({
          payload: {
            user_id,
            token_type: TokenType.EmailVerifyToken,
            verify
          },
          privatekey: process.env.JWT_SECRET_EMAIL_VERIFY_TOKEN as string,
          options: {
            expiresIn: process.env.EAMIL_VERIFY_TOKEN_EXPIRES_IN
          }
        })
      }
      //hàm tạo token quên mk
      private signForgotPasswordToken({ user_id, verify }: { user_id: string; verify: UserVerifyStatus }) {
        return signToken({
          payload: {
            user_id,
            token_type: TokenType.ForgotPasswordToken,
            verify
          },
          privatekey: process.env.JWT_SECRET_FORGOT_PASSWORD_TOKEN as string,
          options: {
            expiresIn: process.env.FORGOT_PASSWORD_TOKEN_EXPIRES_IN
          }
        })
      }
    
      private signAccessAndRefreshToken({ user_id, verify }: { user_id: string; verify: UserVerifyStatus }) {
        return Promise.all([this.signAccessToken({ user_id, verify }), this.signRefreshToken({ user_id, verify })])
      }
 async Register(payload:RegisterReqBody){

    const user_id = new ObjectId()
    const email_verify_token = await this.signEmailVeryfiToken({
      user_id: user_id.toString(),
      verify: UserVerifyStatus.Unverified
    })
    await databaseService.user.insertOne(
        new User({
          _id:user_id,
         ...payload,
         email_verify_token,
         date_of_birth:new Date(payload.date_of_birth),
         password:payload.password
        })   
    )
    const [access_token, refregh_token] = await this.signAccessAndRefreshToken({
        user_id: user_id.toString(),
        verify: UserVerifyStatus.Unverified
      })
      return{
        access_token,
        refregh_token,
        email_verify_token
      }
 }
   
    async login ({user_id, verify}:{ user_id:string,verify:UserVerifyStatus}){
    const [accesstoken,refreshToken] =await this.signAccessAndRefreshToken({user_id,verify})
    const _id =new ObjectId(user_id)
    //  const checkRefestToken = await databaseService.refeshToken.findOne({user_id:_id})
    //  if(checkRefestToken){
    //    await databaseService.refeshToken.deleteOne({user_id:_id})
    //  }
    //  await databaseService.refeshToken.insertOne(
    //   new RefreshToken({
    //     user_id: new ObjectId(user_id),
    //     token: refreshToken
    //   })
    // )
     return {
      accesstoken,
      refreshToken
     }
    }
    
    
}
const UserService1 = new UserService()
export default UserService1