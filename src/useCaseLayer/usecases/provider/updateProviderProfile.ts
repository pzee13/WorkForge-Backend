import ErrorResponse from "../../handlers/errorResponse";
import { IProviderRepository } from "../../interfaces/repositries/providerRepositry";
import { IRequestValidator } from "../../interfaces/repositries/validRepository";
import { IProviderResponse } from "../../interfaces/services/response";



export const updateProviderProfile = async (
    requestValidator: IRequestValidator,
    providerRepository: IProviderRepository,
    _id:string,
    name : string,
    mobile : string,
  ): Promise<IProviderResponse> => {
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
        const updatedProvider = await providerRepository.updateProviderProfile(data);
        
        return {
          status: 200,
          success: true,
          message: `Successfully Uploaded Profile `,
          data : updatedProvider
        };
      
    } catch (err) {
      throw err;
    }
  };
  