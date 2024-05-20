import { Provider } from "../../../domainLayer/provider";
import IHashpassword from "../../interfaces/services/hashPassword";
import Ijwt from "../../interfaces/services/jwt";
import { IResponse } from "../../interfaces/services/response";
import { IRequestValidator } from "../../interfaces/repositries/validRepository"
import ErrorResponse from "../../handlers/errorResponse";
import { IProviderRepository } from "../../interfaces/repositries/providerRepositry";


export const loginProvider = async (
    requestValidator: IRequestValidator,
    providerRepository: IProviderRepository,
    bcrypt: IHashpassword,
    jwt: Ijwt,
    email: string,
    password: string
  ):Promise<IResponse> => {
    try {
      const validation = requestValidator.validateRequiredFields(
        { email, password },
        ["email", "password"]
      );
  
      if (!validation.success) {
        throw ErrorResponse.badRequest(validation.message as string);
      }
  
      const provider: Provider | null = await providerRepository.findProvider(email);
  
      if (provider && provider._id) {
        if (provider.isBlocked) {
          throw ErrorResponse.badRequest("provider is blocked");
        }
        const match: boolean = await bcrypt.compare(password, provider.password);
  
        if (match) {
          const token = jwt.createJWT(provider._id, provider.email, "provider", provider.name);
          return {
            status: 200,
            success: true,
            token: token,
            data:provider,
            message: "Successfully logged out In",
          };
        }
        throw ErrorResponse.badRequest("Wrong password or email");
      }
      throw ErrorResponse.notFound("Wrong password or email");
    } catch (err) {
      throw err;
    } 
  };
  