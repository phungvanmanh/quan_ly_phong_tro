import { Router } from "express";
import { login, Register } from "../controllers/User.controllers";
import { wrapRequestHandler } from "../utils/handlerl";
import { LoginValidator } from "../middleware/User.Middleware";
import { validate } from "../utils/validation";

const UserRoute =Router()
UserRoute.post('/regitter',wrapRequestHandler(Register))
UserRoute.post('/login',validate(LoginValidator) ,login)

export default UserRoute