import ErrorResponse from "../../handlers/errorResponse";
import { IRequestValidator } from "../../interfaces/repositries/validRepository";
import { IUserRepository } from "../../interfaces/repositries/userRepository";
import { IResponse } from "../../interfaces/services/response";


export const blockUnblockUser = async (
  requestValidator:IRequestValidator,
  userRepository:IUserRepository,
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

    const block = await userRepository.blockUser(_id)
    return {
      status: 200,
      success: true,
      message: `Successfully updated`,
    };
  } catch (error) {
    throw error
  }
}