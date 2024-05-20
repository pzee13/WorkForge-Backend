import { User } from "../../../domainLayer/user";
import { IResetPassword } from "../services/response";

export interface IUserRepository {
    createUser(newUser: User): Promise<User>;
    findUser(email: string): Promise<User | null>;
    resetPassword(newPassword:IResetPassword): Promise<User>;
    updateProfile(data:Record<string,string>): Promise<User>;
}