import { User } from "../../../domain/user";
import { IUserRepository } from "../../../usecase/interfaces/repositries/userRepository";
import { StoreData } from "../../../usecase/interfaces/services/response";
import UserModel from "../model/userModel";
import { createUser } from "./user/createUser";
import { findUser } from './user/findUser'
import { IResetPassword } from "../../../usecase/interfaces/services/response";
import { resetPassword } from "./user/resetPassword";
import { updateProfile } from "./user/updateProfile";
import { blockUser } from "./user/blockUser"
import { updateUserWallet } from "./user/updateUserWallet";

export class UserRepository implements IUserRepository {
    constructor(private readonly usersModel:typeof UserModel) {}
  
     async createUser(newUser: User): Promise<User> {
        return createUser(newUser,this.usersModel);
    }
    
   async findUser(email: string): Promise<User | null> {
    return findUser(email,this.usersModel);
}

async resetPassword(newPassword: IResetPassword): Promise<User> {
    return resetPassword(newPassword, this.usersModel);
  }

  async updateProfile(data: Record<string, string>): Promise<User | never>{
    return updateProfile(data,this.usersModel)
  }

  async blockUser(_id: string): Promise<string | null> {
    return blockUser(_id,this.usersModel)
  }

  async updateUserWallet(userId: string, refundAmount: number): Promise<string | null> { // Add method here
    return updateUserWallet(userId,refundAmount,this.usersModel)
  }

}  