import dotenv from 'dotenv';
import { UserService } from '../services/UserService';
dotenv.config();

const register = async (req: any, res: any) => {
	const body = req.body;
	try {
		const userService = new UserService();
		await userService.registerUser(body);

		res.status(200).json({
			message: 'Đăng ký thành công!',
		});
	} catch (error: any) {
		res.status(404).json({
			message: error.message,
		});
	}
};
const login = async (req: any, res: any) => {
	const body = req.body;
	try {
		const userService = new UserService();
		const token = await userService.loginUser(body);

		res.status(200).json({
			message: 'Login successfuly!!!',
			data: { token },
		});
	} catch (error: any) {
		res.status(404).json({
			message: error.message,
		});
	}
};

export { register, login};
