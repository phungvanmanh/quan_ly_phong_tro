/** @format */
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

dotenv.config();

export const getAccesstoken = async (payload: {
	_id: Types.ObjectId;
	email: string;
	rule?: string;
}) => {
	const token = jwt.sign(payload, process.env.SECRET_KEY as string, {
		// expiresIn: '10m',
	});
	return token;
};

export const verifyEmail = async (payload: {
	_id: Types.ObjectId;
	email: string;
}) => {
	const token = jwt.sign(payload, process.env.SECRET_KEY as string, {
		// expiresIn: '10m',
	});
	return token;
};

export const signverifyEmail = async (payload: {
	_id: Types.ObjectId;
	email: string;
}) => {
	const token = jwt.sign(payload, process.env.SECRET_KEY as string, {
		// expiresIn: '10m',
	});
	return token;
};