import { Collection, Db, MongoClient } from 'mongodb'; 
import { config } from 'dotenv';
import User from '../models/schemas/users.schemas';
import RefreshToken from '../models/schemas/refresh_token';

config(); // Load các biến môi trường từ file .env

// Tạo URL kết nối từ các biến môi trường
const url = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mongo:27017/${process.env.DB_NAME}?authSource=admin`;

class DatabaseService {
    private client: MongoClient
    private db: Db

    constructor() {
      this.client = new MongoClient(url) // Tạo đường dẫn kết nối đến database
      this.db = this.client.db(process.env.DB_NAME) // Chọn database theo tên
    }
  
    async connect() {
      try {
        // Kết nối và ping database để kiểm tra kết nối
        await this.db.command({ ping: 1 })
        console.log('Đã ping quá trình triển khai của bạn. Bạn đã kết nối thành công với MongoDB!')
      } catch (error) {
        console.log('Lỗi kết nối:', error)
        throw error
      }
    }

    // Lấy collection người dùng
    get user(): Collection<User> {
       return this.db.collection(process.env.DB_USER as string)
    }

    // Lấy collection refresh token (nếu cần)
    // get refreshToken(): Collection<RefreshToken> {
    //   return this.db.collection(process.env.DB_REFESH_TOKENS_COLLECTION as string)
    // }
}

const databaseService = new DatabaseService();
export default databaseService;