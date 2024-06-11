import ErrorResponse from "../../handlers/errorResponse";
import { IRequestValidator } from "../../interfaces/repositries/validRepository";
import { IProviderRepository } from "../../interfaces/repositries/providerRepositry";
import { IResponse } from "../../interfaces/services/response";
import { providerRepository } from "../../../infrastructureLayer/routes/injections/providerInjection";


export const blockProvider = async (
  requestValidator:IRequestValidator,
  providerRepository:IProviderRepository,
  _id:string,
):Promise<IResponse> => {
  try {
    const validation = requestValidator.validateRequiredFields(
    {_id},
    ["_id"]
    );

    if (!validation.success) {
      throw ErrorResponse.badRequest(validation.message as string);
    }

    const block = await providerRepository.blockProvider(_id)
    return {
      status: 200,
      success: true,
      message: `Successfully updated`,
    };
  } catch (error) {
    throw error
  }
}