import ErrorResponse from "../../handlers/errorResponse";
import { IUserRepository } from "../../interfaces/repositries/userRepository";
import { IRequestValidator } from "../../interfaces/repositries/validRepository";
import IHashpassword from "../../interfaces/services/hashPassword";
import { IResponse } from "../../interfaces/services/response";


export const resetPassword = async (
    userRepository: IUserRepository,
    requestValidator:IRequestValidator,
    bcrypt:IHashpassword,
    id:string,
    password:string
): Promise<IResponse> => {
    try {
        console.log("creating reseting passsword  ...")
        const validation = requestValidator.validateRequiredFields(
          { password },
          ["password"]
        );
    
        if (!validation.success) {
          throw ErrorResponse.badRequest(validation.message as string);
        }


    
        
          const hashedPassword = await bcrypt.createHash(password);

          const nPassword = {
            id:id,
            password:hashedPassword
          }
          const newPassword = await userRepository.resetPassword(nPassword)
          
          return {
            status: 200,
            success: true,
            message: "Successfully created",
          };
  
      } catch (error) {
        throw error;
      }
    };