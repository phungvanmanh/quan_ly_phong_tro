import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routers/user';
import danhMucRouter from './routers/danhMuc'
import thietBiRouter from './routers/thietBi'
import cors from 'cors';
import YeuThichRouter from './routers/yeuThich';
import contractRoutes from './routers/hopdong';
import routeImage from './routers/Image';
import routerPhong from './routers/phongTro';
dotenv.config();

const PORT = process.env.PORT || 3001;
const dbURL = `mongodb+srv://phamtu090303:gSPppVILdD2EJl4g@quanlyphongtro.k5jir.mongodb.net/?retryWrites=true&w=majority`;
// const dbURL = `mongodb://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@mongo:27017/${process.env.DB_NAME}?authSource=admin`;
const app = express();

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

app.use('/auth', userRouter);
app.use('/danh-muc', danhMucRouter);
app.use('/yeu-thich', YeuThichRouter);
app.use('/thiet-bi', thietBiRouter);
app.use('/Image-phong', routeImage);
app.use('/phongTro', routerPhong);  //chưa thêm middleware cho dử liệu
//hợp đồng
app.use('/api/contracts', contractRoutes); 
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
