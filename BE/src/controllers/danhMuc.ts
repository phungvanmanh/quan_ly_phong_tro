import dotenv from 'dotenv';
import { DanhMucService } from '../services/DanhMucService';
dotenv.config();

const storeDanhMuc = async (req: any, res: any) => {
	const body = req.body;
	try {
		const danhMucService = new DanhMucService();
		await danhMucService.createDanhMuc(body);

		res.status(200).json({
			message: 'Danh mục đã được tạo thành công',
		});
	} catch (error: any) {
		res.status(404).json({
			message: error.message,
		});
	}
};
const updateDanhMuc = async (req: any, res: any) => {
	const body = req.body;
	try {
		const danhMucService = new DanhMucService();
		await danhMucService.updateDanhMuc(body);

		res.status(200).json({
			message: 'Danh mục đã được cập nhật thành công'
		});
	} catch (error: any) {
		res.status(404).json({
			message: error.message,
		});
	}
};

const getData = async (req:any, res: any) => {
	try{
		const danhMucService = new DanhMucService();
		const data = await danhMucService.getDataDanhMuc();

		res.status(200).json({
			status: "200",
			data : data
		});
	} catch(error: any) {
		res.status(404).json({
			message: error.message,
		});
	}
}

const deleteAll = async (req:any, res: any) => {
	const body = req.body;
	try{
		const danhMucService = new DanhMucService();
		const data = await danhMucService.deleteAllDanhMuc(body);

		res.status(200).json({
			status: "200",
			message: "Đã xóa thành công!"
		});
	} catch(error: any) {
		res.status(404).json({
			message: error.message,
		});
	}
}

const deleteById = async (req:any, res: any) => {
	const { id } = req.params;
	try{
		const danhMucService = new DanhMucService();
		await danhMucService.deleteByIdaDanhMuc({ id });

		res.status(200).json({
			status: "200",
			message: "Đã xóa thành công!"
		});
	} catch(error: any) {
		res.status(404).json({
			message: error.message,
		});
	}
}

export { storeDanhMuc, updateDanhMuc, getData, deleteAll, deleteById};
