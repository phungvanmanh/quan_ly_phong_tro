import DanhMucModel from '../models/DanhMucModel';

export class DanhMucService {
    // Tạo mới một danh mục
    async createDanhMuc(body: any): Promise<void> {
        const { ten_danh_muc, trang_thai, mo_ta } = body;

        // Kiểm tra danh mục đã tồn tại chưa
        const existingDanhMuc = await DanhMucModel.findOne({ ten_danh_muc });
        if (existingDanhMuc) {
            throw new Error('Danh mục đã tồn tại');
        }

        // Tạo mới danh mục
        const newDanhMuc = new DanhMucModel({
            ten_danh_muc,
            trang_thai,
            mo_ta,
        });

        // Lưu danh mục vào cơ sở dữ liệu
        await newDanhMuc.save();
    }

    // Cập nhật thông tin danh mục
    async updateDanhMuc(body: any): Promise<void> {
        const { id, ten_danh_muc, trang_thai, mo_ta } = body;

        // Kiểm tra danh mục cần cập nhật có tồn tại không
        const danhMuc = await DanhMucModel.findById(id);
        if (!danhMuc) {
            throw new Error('Danh mục không tồn tại');
        }

        // Cập nhật thông tin danh mục
        danhMuc.ten_danh_muc = ten_danh_muc ?? danhMuc.ten_danh_muc;
        danhMuc.trang_thai = trang_thai ?? danhMuc.trang_thai;
        danhMuc.mo_ta = mo_ta ?? danhMuc.mo_ta;

        // Lưu các thay đổi vào cơ sở dữ liệu
        await danhMuc.save();
    }


    //Lấy danh sách dữu liệu danh mục
    async getDataDanhMuc(): Promise<any[]> {
        // Sử dụng `find()` để lấy tất cả dữ liệu danh mục
        const danhMuc = await DanhMucModel.find();

        // Trả về kết quả
        return danhMuc;
    }


    async deleteAllDanhMuc(body:any): Promise<void> {
        // Sử dụng `find()` để lấy tất cả dữ liệu danh mục
        const danhMuc = await DanhMucModel.find();

    }

    async deleteByIdaDanhMuc(body:any): Promise<void> {
        const { id } = body;
        const danhMuc = await DanhMucModel.findById(id);
        if (!danhMuc) {
            throw new Error('Danh mục không tồn tại');
        }

        // Xóa danh mục
        await DanhMucModel.findByIdAndDelete(id);
    }
}
