import mongoose, { Model } from "mongoose";

const { Schema, model } = mongoose;

export enum TypeOfUser {
  GUEST = "GUEST",
  AUTH = "AUTH",
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  type: TypeOfUser;
}

export const UserSchema = new Schema<IUser>(
  {
    name: { type: String },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    type: { type: String, enum: TypeOfUser, default: TypeOfUser.GUEST },
  },
  { autoCreate: false, autoIndex: false }
);

const User: Model<IUser> = model("Users", UserSchema);

export default User;
