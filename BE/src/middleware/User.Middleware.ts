import { checkSchema } from 'express-validator';
import { USERS_MESSAGES } from '../constants/Messager';
import databaseService from '../service/database.services';

export const LoginValidator = checkSchema({
   email :{
    notEmpty:{
        errorMessage: USERS_MESSAGES.EMAIL_IS_REQUIREA
    },
    isEmail:{
        errorMessage :USERS_MESSAGES.EMAIL_IS_INVALID
    },
    custom:{
        options: async(values,{req})=>{
        const User =await databaseService.user.findOne({emal:values,password:req.body.password})
        if(User=== null){
             throw new Error(USERS_MESSAGES.USERS_OR_PASSWORD_IS_INCORRECT)
         }
         req.user = User;
         return true
        }
        
    }
   },
  
})
