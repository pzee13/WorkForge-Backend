import mongoose, { Document, Model, Schema } from "mongoose";
import { User } from "../../../domain/user";

const userSchema: Schema = new Schema<User & Document>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String, default: "" },
    isBlocked: { type: Boolean, default: false },
    wallet: { type: Number, default:0 },
  },
  {
    timestamps: true,
  }
);

const UserModel: Model<User & Document> = mongoose.model<User & Document>(
  "User",
  userSchema
);

export default UserModel;