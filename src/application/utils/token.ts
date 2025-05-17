import jwt from "jsonwebtoken";
import { IUser } from "../../infrastructure/data-base/User";

export const JwtTokenGenrator = (payLoad: IUser) => {
  console.log(payLoad);
  if (process.env.SECRETE) {
    const token = jwt.sign(payLoad, process.env.SECRETE, {
      algorithm: "HS256",
    });
    return token;
  }
};

export const JwtTokenVerify = (token: string) => {
  if (process.env.SECRETE) {
    const valid = jwt.verify(token, process.env.SECRETE);
    console.log(valid);
  }
};
