import { User } from "../../../domainLayer/user";

export interface IUserRepository {
    createUser(newUser: User): Promise<User>;
    findUser(email: string): Promise<User | null>;
}