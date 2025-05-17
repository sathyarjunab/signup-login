import { Request, Response } from "express";
import { loginValidation, user } from "../validator/user.ts";
import userRepo from "../../infrastructure/repository/user.ts";
import { JwtTokenGenrator } from "../utils/token.ts";

class UserController {
  public async signup(req: Request, res: Response) {
    try {
      const { success, data: userData } = user.safeParse(req.body);
      if (!success || !userData) {
        res.status(400).send({ message: "please give us a valid details" });
        return;
      }
      const result = await userRepo.createUser(userData);
      if (!result.success) {
        res.status(result.status).send({ message: result.message });
        return;
      }
      res.status(result.status).send({ message: result.message });
    } catch (err: any) {
      console.log(err);
      res
        .status(500)
        .send({ message: "somthing went wrong in the server side" });
    }
  }
  public async login(req: Request, res: Response) {
    const validatedCredentials = loginValidation.safeParse(req.body);
    if (!validatedCredentials.success || !validatedCredentials.data) {
      res.status(400).send({ message: "invalid credentials" });
      return;
    }
    const result = await userRepo.validUser(validatedCredentials.data);
    if (!result.success || !result.data) {
      res.status(result.status).send({ message: result.message });
      return;
    }
    const token = JwtTokenGenrator(req.body);
    res.status(200).send({ token: token });
  }
}

const userController = new UserController();

export default userController;
