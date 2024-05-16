import ErrorResponse from "../../handlers/errorResponse";
import { IUserRepository } from "../../interfaces/repositries/userRepository";
import { IRequestValidator } from "../../interfaces/repositries/validRepository";
import INodemailer from "../../interfaces/services/nodeMailer";
import Ijwt from "../../interfaces/services/jwt";
import { IResponse } from "../../interfaces/services/response";



export const forgotPassword = async (
requestValidator: IRequestValidator, userRepository: IUserRepository, jwt: Ijwt, nodemailer: INodemailer, email: string, name: string, token: string, 
  ): Promise<IResponse> => {
    try {
      // Validate required parameters
     

      const user = await userRepository.findUser(email);
      if (!user) {
          throw ErrorResponse.notFound("User not found");
      }

      const validation = requestValidator.validateRequiredFields(
        {  email },
        [  "email" ]
      );
  
      if (!validation.success) {
        throw ErrorResponse.badRequest(validation.message as string);
      }

      const token = jwt.createJWT(user._id as string, user.email, "resetPassword", user.name)

      console.log(token);
      
      
      const sendLink = await nodemailer.sendLink(user.email,user.name,token);
       
      return {
        status:200,
        success:true,
        message:sendLink
      }
    } catch (err) {
      throw err;
    }
  };
  