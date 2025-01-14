import { Router } from 'express';
import {
	register,
	login,
	verifyEmail1,
	sendverifymail,
	sendPassword,
	verifypassword,
} from '../controllers/user';
import { UserLoginRequest, userRegisterRequest, UserVerifyEmail } from '../request/user.requet';


const router = Router();

router.post('/register',userRegisterRequest, register);
router.post('/login',UserLoginRequest, login);
router.post('/verify_Email',UserVerifyEmail, verifyEmail1);
router.post('/send_verify_mail', sendverifymail);
router.post('/resend-forgot-password', sendPassword);
router.post('/verify-forgot-password', verifypassword);

export default router;