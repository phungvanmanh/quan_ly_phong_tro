/** @format */

import mongoose, { Schema } from 'mongoose';

const HoaDonThanhToanScheme = new Schema(
    {
        id_phong: {
            type: String,
            required: false,
        },
        id_users: {
            type: String,
            required: true,
        },
        so_tien: {
            type: Number,
            required: true,
        },
        noi_dung: {
            type: String,
            required: false,
        },
        ma_chuyen_khoan: {
            type: String,
            required: false,
        },
        ngay_chuyen_khoan: {
            type: Date,
            required: true,
        },

        createdAt: {
            type: Date,
            default: Date.now(),
        },
    },
    { timestamps: true }
);

const HoaDonThanhToanModel = mongoose.model('hoadonthanhtoan', HoaDonThanhToanScheme);
export default HoaDonThanhToanModel;
