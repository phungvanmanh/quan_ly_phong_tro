import HinhAnhPhongModel from "../models/HinhAnhPhongModel";

export class ImageService {
    // Tạo mới hình ảnh
    async createImage(body: any): Promise<void> {
        const { id_phong_tro, image_url } = body;

        // Kiểm tra hình ảnh đã tồn tại chưa
        const existingImage = await HinhAnhPhongModel.findOne({ id_phong_tro });
        if (existingImage) {
            throw new Error('Hình ảnh đã tồn tại cho phòng trọ này');
        }

        // Tạo mới hình ảnh
        const newImage = new HinhAnhPhongModel({
            id_phong_tro,
            image_url,
        });

        // Lưu hình ảnh vào cơ sở dữ liệu
        await newImage.save();
    }

    // Cập nhật thông tin hình ảnh
    async updateImage(body: any): Promise<void> {
        const { _id, id_phong_tro, image_url } = body;

        // Kiểm tra hình ảnh cần cập nhật có tồn tại không
        const image = await HinhAnhPhongModel.findById(_id);
        if (!image) {
            throw new Error('Hình ảnh không tồn tại');
        }

        // Cập nhật thông tin hình ảnh
        image.id_phong_tro = id_phong_tro ?? image.id_phong_tro;
        image.image_url = image_url ?? image.image_url;

        // Lưu các thay đổi vào cơ sở dữ liệu
        await image.save();
    }

    // Lấy danh sách tất cả hình ảnh
    async getAllImages(): Promise<any[]> {
        // Sử dụng `find()` để lấy tất cả dữ liệu hình ảnh
        const images = await HinhAnhPhongModel.find();

        // Trả về kết quả
        return images;
    }

    // Xóa tất cả hình ảnh
    async deleteAllImages(): Promise<void> {
        // Sử dụng `deleteMany()` để xóa toàn bộ dữ liệu hình ảnh
        await HinhAnhPhongModel.deleteMany();
    }

    // Xóa hình ảnh theo ID
    async deleteImageById(body: any): Promise<void> {
        const { id } = body;

        // Kiểm tra hình ảnh cần xóa có tồn tại không
        const image = await HinhAnhPhongModel.findById(id);
        if (!image) {
            throw new Error('Hình ảnh không tồn tại');
        }

        // Xóa hình ảnh
        await HinhAnhPhongModel.findByIdAndDelete(id);
    }
}
