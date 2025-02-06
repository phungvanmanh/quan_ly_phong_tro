/** @format */

import mongoose, { Schema } from 'mongoose';

const HopDongScheme = new Schema(
    {
        ten_hop_dong: {
            type: String,
            default:"Hợp đồng thuê phòng"
        },
        id_phong: {
            type: String,
            required: true,
        },
        id_users: {
            type: String,
            required: true,
        },
        start_date: {
            type: Date,
            required: true,
        },
        end_date: {
            type: Date,
            required: true,
        },
        tien_coc: {
            type: Number,
            default: 1,
        },
        trang_thai: {
            type: Number,
            enum: ["cho_ky", "da_ky", "het_han"],
            required: true,
        },
        file_hop_dong: {
            type: String,
            required: true,
        },
        image_chu_ky: {
            type: String,
            required: true,
        },

        createdAt: {
            type: Date,
            default: Date.now(),
        },
    },
    { timestamps: true }
);

const HopDongModel = mongoose.model('hopdong', HopDongScheme);
export default HopDongModel;
