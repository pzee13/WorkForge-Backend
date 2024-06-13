import ErrorResponse from "../../handlers/errorResponse";
import { IUserRepository } from "../../interfaces/repositries/userRepository";
import { IRequestValidator } from "../../interfaces/repositries/validRepository";
import { IUserResponse } from "../../interfaces/services/response";


export const updateProfile = async (
    requestValidator: IRequestValidator,
    userRepository: IUserRepository,
    _id:string,
    name : string,
    mobile : string,
  ): Promise<IUserResponse> => {
    try {
      
      const validation = requestValidator.validateRequiredFields(
        {_id,name,mobile},
        ["_id","name","mobile"]
      );
  
      if (!validation.success) {
          console.log('validation');
          
        throw ErrorResponse.badRequest(validation.message as string);
      }
  
      const data = {
          _id,
          name,
          mobile
      }
        const updatedUser = await userRepository.updateProfile(data);
        
        return {
          status: 200,
          success: true,
          message: `Successfully Uploaded Profile `,
          data : updatedUser
        };
      
    } catch (err) {
      throw err;
    }
  };
  