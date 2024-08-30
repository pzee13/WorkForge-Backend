import { User } from "../../../domain/user";
import { IResetPassword } from "../services/response";

export interface IUserRepository {
    createUser(newUser: User): Promise<User>;
    findUser(email: string): Promise<User | null>;
    resetPassword(newPassword:IResetPassword): Promise<User>;
    updateProfile(data:Record<string,string>): Promise<User>;
    blockUser(_id:string):Promise<string | null>;
    updateUserWallet(userId:string, refundAmount:number): Promise<string | null>;
} 