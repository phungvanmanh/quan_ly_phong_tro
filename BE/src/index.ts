import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routers/user';
import danhMucRouter from './routers/danhMuc'
import cors from 'cors';
import { verifyToken } from './middlewares/verifyToken';
dotenv.config();

const PORT = process.env.PORT || 3001;
// const dbURL = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.rervmah.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const dbURL = `mongodb://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@mongo:27017/${process.env.DB_NAME}?authSource=admin`;
const app = express();

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

//Những trang không cần token thì để ở đây
app.use('/auth', userRouter);

//Những trang yêu cầu phải có token mới sử dụng thì viết ở đây
app.use(verifyToken);
app.use('/danh-muc', danhMucRouter);


const connectDB = async () => {
	try {
		await mongoose.connect(dbURL);
		console.log(`Connect to db successfully!!!`);
	} catch (error) {
		console.log(`Can not connect to db ${error}`);
	}
};

connectDB()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server is stating at http://localhost:${PORT}`);
		});
	})
	.catch((error) => {
		console.log(error);
	});
