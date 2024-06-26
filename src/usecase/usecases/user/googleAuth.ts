import { User } from "../../../domain/user";
import ErrorResponse from "../../handlers/errorResponse";
import { IUserRepository } from "../../interfaces/repositries/userRepository";
import { IRequestValidator } from "../../interfaces/repositries/validRepository";
import IHashpassword from "../../interfaces/services/hashPassword";
import Ijwt from "../../interfaces/services/jwt";
import { IResponse } from "../../interfaces/services/response";


export const googleAuth = async (
  requestValidator: IRequestValidator,
  userRepository: IUserRepository,
  bcrypt: IHashpassword,
  jwt : Ijwt,
  name: string,
  email: string,
  password: string
): Promise<IResponse> => {
  try {
    // Validate required parameters
    const validation = requestValidator.validateRequiredFields(
      { name, email, password },
      [ "name", "email", "password"]
    );

    if (!validation.success) {
      throw ErrorResponse.badRequest(validation.message as string);
    }

    const user = await userRepository.findUser(email); // checking if the user exist or not

    if (!user) {
      const hashedPassword = await bcrypt.createHash(password);
      const newUser = {
        name,
        email,
        password: hashedPassword,
      };
      const createnewUser = await userRepository.createUser(newUser);
      const token = jwt.createJWT(createnewUser._id as string, createnewUser.email, "user", createnewUser.name);

      return {
        status: 200,
        success: true,
        message: `Successfully Registerd Welcome ${createnewUser.name}`,
        token : token,
        data : createnewUser
      };
    }
   
    if (user && user._id) {
        if (user.isBlocked) {
          throw ErrorResponse.badRequest("You account is blocked");
        }
          const token = jwt.createJWT(user._id, user.email, "user", user.name);

          user.password = ""
  
          return {
            status: 200,
            success: true,
            token: token,
            data:user,
            message: `Login successful. Welcome ${user.name}`,
          };
        }  
        throw ErrorResponse.internalError("Unexpected error occurred");   
  } catch (err) {
    throw err;
  }

}
