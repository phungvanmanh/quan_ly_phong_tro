import { Router } from "express";
import { deleteAll, deleteById, getData, storePhongTro, updatePhongTro } from "../controllers/phongTro";

const routerPhong =Router()

routerPhong.post('/create', storePhongTro);
routerPhong.post('/update', updatePhongTro);
routerPhong.get('/', getData);
routerPhong.post('/delete/all', deleteAll);
routerPhong.post('/delete/:ma_phong', deleteById);

export default routerPhong