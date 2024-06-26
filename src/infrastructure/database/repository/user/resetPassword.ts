import { User } from "../../../../domain/user";
import { IResetPassword } from "../../../../usecase/interfaces/services/response";
import UserModel from "../../model/userModel";

// Correct the parameter type for _id
export const resetPassword = async (
    newPassword : IResetPassword,
    userModels: typeof UserModel
): Promise<User | never> => {
    try {
        const user = await userModels.findOne({ _id: newPassword.id });
           if(user){
            user.password = newPassword.password;
            await user.save();
            user.password = ""
            return user;
           }
           throw new Error("Internal Server Error")
    } catch (error) {
        throw error;
    }
}
