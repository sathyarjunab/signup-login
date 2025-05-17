import { Router } from "express";
import userController from "../../application/services/user-controller.ts";

const route = Router();

route.post("/user/signup", userController.signup);

route.post("/user/login", userController.login);

export default route;
