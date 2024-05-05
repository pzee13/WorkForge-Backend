import { User } from "../../../../domainLayer/user";
import UserModel from "../../model/userModel";

export const createUser = async (
  newUser: User,
  userModels: typeof UserModel
): Promise<User> => {
  try {
    const user = await userModels.create(newUser);
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};
