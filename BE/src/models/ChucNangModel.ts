/** @format */

import mongoose, { Schema } from 'mongoose';

const ChucNangScheme = new Schema(
    {
        ten_chuc_nang: {
            type: String,
            required: true,
        },
        ten_group: {
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

const ChucNangModel = mongoose.model('chucnang', ChucNangScheme);
export default ChucNangModel;
