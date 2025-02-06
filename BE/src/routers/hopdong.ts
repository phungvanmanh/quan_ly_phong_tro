import express from 'express';
import { createContract } from '../controllers/hopDong';
const router = express.Router();
router.post('/create', createContract);
export default router;