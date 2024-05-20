import { User } from "../../../domainLayer/user";
import { IUserRepository } from "../../../useCaseLayer/interfaces/repositries/userRepository";
import { StoreData } from "../../../useCaseLayer/interfaces/services/response";
import UserModel from "../model/userModel";
import { createUser } from "./user/createUser";
import { findUser } from './user/findUser'
import { IResetPassword } from "../../../useCaseLayer/interfaces/services/response";
import { resetPassword } from "./user/resetPassword";
import { updateProfile } from "./user/updateProfile";

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

}  