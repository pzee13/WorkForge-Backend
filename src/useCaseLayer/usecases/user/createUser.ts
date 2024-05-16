import exp from "constants";
import ErrorResponse from "../../handlers/errorResponse";
import { IUserRepository } from "../../interfaces/repositries/userRepository";
import { IRequestValidator } from "../../interfaces/repositries/validRepository";
import IHashpassword from "../../interfaces/services/hashPassword";
import { IResponse } from "../../interfaces/services/response";

export const createUser = async (
  requestValidator: IRequestValidator,
  userRepository: IUserRepository,
  bcrypt: IHashpassword,
  name: string,
  mobile: string,
  email: string,
  password: string
): Promise<IResponse> => {
  try {
    console.log("creating user ...")
    const validation = requestValidator.validateRequiredFields(
      { name, mobile, email, password },
      ["name", "mobile", "email", "password"]
    );

    if (!validation.success) {
      throw ErrorResponse.badRequest(validation.message as string);
    }

    const user = await userRepository.findUser(email);
    if (!user) {
      const hashedPassword = await bcrypt.createHash(password);
      const newUser = {
        name,
        mobile,
        email,
        password: hashedPassword,
      };
      const createnewUser = await userRepository.createUser(newUser);
      return {
        status: 200,
        success: true,
        message: "Successfully created",
      };
    }
    throw ErrorResponse.badRequest("User already exists");
  } catch (error) {
    throw error;
  }
};
