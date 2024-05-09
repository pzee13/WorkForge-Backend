import ErrorResponse from "../../handlers/errorResponse";
import { IProviderRepository } from "../../interfaces/repositries/providerRepositry";
import { IRequestValidator } from "../../interfaces/repositries/validRepository";
import IHashpassword from "../../interfaces/services/hashPassword";
import { IResponse } from "../../interfaces/services/response";
import IJwt  from "../../interfaces/services/jwt";



export const createProvider = async (
    requestValidator: IRequestValidator,
    providerRepository: IProviderRepository,
    bcrypt: IHashpassword,
    name: string,
    mobile: string,
    email: string,
    password: string
  ): Promise<IResponse> => {
    try {
      const validation = requestValidator.validateRequiredFields(
        { name, mobile, email, password },
        ["name", "mobile", "email", "password"]
      );
  
      if (!validation.success) {
        throw ErrorResponse.badRequest(validation.message as string);
      }
  
      const provider = await providerRepository.findProvider(email);
      if (!provider) {
        const hashedPassword = await bcrypt.createHash(password);
        const provider = {
          name,
          mobile,
          email,
          password: hashedPassword,
        };
        const createnewprovider = await providerRepository.createProvider(provider);
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
  