import UserModel from "../../../infrastructure/database/model/userModel";
import { UserResponse } from "../../interfaces/services/response";

export const getUsers = async (): Promise<UserResponse> => {
    try {
      const users = await UserModel.find({}).select("-password");
      return {
        status: 200,
        success: true,
        data: users,
      };
    } catch (error) {
      throw new Error(`Error fetching users: ${error}`);
    }
  };
  