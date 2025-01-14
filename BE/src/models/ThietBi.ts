/** @format */

import mongoose, { Schema } from 'mongoose';

const ThietBiScheme = new Schema(
	{
		id_phong_tro : {
			type : String,
			require: true
		},

		ten_thiet_bi: {
			type: String,
			require: true
		},

		so_luong_thiet_bị: {
			type: Number,
			require: false
		}
	},
	{ timestamps: true }
);

const ThietBiModel = mongoose.model('thiet_bis', ThietBiScheme);
export default ThietBiModel;
