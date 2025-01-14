import express from 'express';
import DatabaseService from './service/database.services';
import UserRoute from './routes/user.routes';
import cors from 'cors';

const app = express();

const PORT = 5000;
// Cấu hình CORS
const corsOptions = {
    origin: "*", // Chỉ cho phép frontend ở localhost:3000 truy cập
    methods: "GET,POST,PUT,DELETE", // Chỉ cho phép các phương thức này
    allowedHeaders: ["Content-Type", "Authorization"], // Chỉ cho phép các header này
};
  
app.use(cors(corsOptions)); // Thêm middleware CORS

app.use(express.json()); // Đây là bước quan trọng
app.use('/api/user', UserRoute)
DatabaseService.connect()

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
