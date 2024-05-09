import { User } from "../../../domainLayer/user";
import ErrorResponse from "../../handlers/errorResponse";
import { IUserRepository } from "../../interfaces/repositries/userRepository";
import { IRequestValidator } from "../../interfaces/repositries/validRepository";
import IHashpassword from "../../interfaces/services/hashPassword";
import Ijwt from "../../interfaces/services/jwt";
import { IResponse } from "../../interfaces/services/response";

export const loginUser = async (
  requestValidator: IRequestValidator,
  userRepository: IUserRepository,
  bcrypt: IHashpassword,
  jwt: Ijwt,
  email: string,
  password: string
): Promise<IResponse> => {
  try {
    const validation = requestValidator.validateRequiredFields(
      { email, password },
      ["email", "password"]
    );

    if (!validation.success) {
      throw ErrorResponse.badRequest(validation.message as string);
    }

    const user: User | null = await userRepository.findUser(email);

    if (user && user._id) {
      if (user.isBlocked) {
        throw ErrorResponse.badRequest("User is blocked");
      }
      const match: boolean = await bcrypt.compare(password, user.password);

      if (match) {
        const token = jwt.createJWT(user._id, user.email, "user", user.name);
        return {
          status: 200,
          success: true,
          token: token,
          data:user,
          message: "Successfully logged In",
        };
      }
      throw ErrorResponse.badRequest("Wrong password or email");
    }
    throw ErrorResponse.notFound("Wrong password or email");
  } catch (err) {
    throw err;
  }
};
