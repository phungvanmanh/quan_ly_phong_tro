/** @format */

import mongoose, { Schema } from 'mongoose';

const PhongTroScheme = new Schema(
    {
        id_map: {
            type: String,
            required: false,
        },
        id_danh_muc: {
            type: String,
            required: true,
        },
        id_users: {
            type: String,
            required: true,
        },
        ten_phong_tro: {
            type: String,
            required: true,
        },
        mo_ta: {
            type: String,
            required: false,
        },
        dien_tich: {
            type: String,
            required: false,
        },
        gia_tien: {
            type: Number,
            default: 1,
        },
        trang_thai: {
            type: Number,
            required: true,
        },
        so_luong_nguoi: {
            type: Number,
            default: 1,
        },

        createdAt: {
            type: Date,
            default: Date.now(),
        },
    },
    { timestamps: true }
);

const PhongTroModel = mongoose.model('phongtro', PhongTroScheme);
export default PhongTroModel;
