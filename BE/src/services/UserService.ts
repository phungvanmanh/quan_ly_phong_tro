import UserModel from '../models/UserModel';
import bcrypt from 'bcryptjs';
import { getAccesstoken, verifyEmail } from '../utils/getAccesstoken';

export class UserService {
    async registerUser(body: any): Promise<void> {
        const { email, password } = body;

        // Check if user already exists
        const user = await UserModel.findOne({ email });
        if (user) {
            throw new Error(`Tài khoản đã tồn tại`);
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt);
        body.password = hashpassword;

        // Save new user
        const newUser: any = new UserModel(body);
        await newUser.save();
    }

    async loginUser(body: any): Promise<string> {
        const { email, password } = body;

        const user = await UserModel.findOne({ email });
        if (!user) {
            throw new Error(`Tài khoản không tồn tại`);
        }

        const isMatchPassword = await bcrypt.compare(password, user.password);
        if (!isMatchPassword) {
            throw new Error(
                'Đăng nhập thất bại, vui lòng kiểm tra lại Email/Password và thử lại'
            );
        }

        return await getAccesstoken({
            _id: user._id,
            email: user.email,
            rule: user.id_quyen ?? "1",
        });
    }
    async Veriftemail (email: string): Promise<string> {
       
        const user =await UserModel.findOne({email:email})
        console.log(user)
        if(user === null) {
            throw new Error('User not fout')
        }
        
        return await verifyEmail({
            _id:user._id,
            email:email,
        
        });
    }
}
