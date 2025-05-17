import User, { IUser } from "../data-base/User.ts";
import { Document } from "mongoose";
import bcrypt from "bcrypt";

class UserRepo {
  private readonly saltRounds = 10;
  public async createUser(userDetails: IUser): Promise<{
    success: boolean;
    user?: IUser & Document;
    message: string;
    status: number;
  }> {
    try {
      const userExist = await User.findOne({ email: userDetails.email });

      if (userExist)
        return { success: false, message: "user already exists", status: 400 };

      const hashedPassword = await bcrypt.hash(
        userDetails.password,
        this.saltRounds
      );

      const newUser = await User.create({
        ...userDetails,
        password: hashedPassword,
      });
      await newUser.save();
      return {
        success: true,
        user: newUser,
        message: "new user as been created",
        status: 200,
      };
    } catch (err) {
      console.log(err);
      return {
        success: false,
        message: "Somthing went while creating the user ",
        status: 500,
      };
    }
  }
  public async validUser(userDetails: {
    email: string;
    password: string;
  }): Promise<{
    success: boolean;
    status: number;
    message: string;
    data?: IUser;
  }> {
    const existingUser = await User.findOne({
      email: userDetails.email,
    });
    if (existingUser) {
      const match = await bcrypt.compare(
        userDetails.password,
        existingUser.password
      );
      if (!match)
        return { success: false, status: 400, message: "invalid credentials" };
      return {
        success: true,
        status: 200,
        message: "logged in success",
        data: existingUser,
      };
    } else {
      return { success: false, status: 400, message: "invalid credentials" };
    }
  }
}
const userRepo = new UserRepo();
export default userRepo;
