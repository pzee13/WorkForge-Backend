import ErrorResponse from "../../handlers/errorResponse";
import { IRequestValidator } from "../../interfaces/repositries/validRepository";
import { SpaceRepository } from "../../interfaces/repositries/spaceRepository";
import { IProviderRepository } from "../../interfaces/repositries/providerRepositry";
import { IResponse } from "../../interfaces/services/response";
import Nodemailer from "../../interfaces/services/nodeMailer";

export const updateSpaceStatus = async (
    requestValidator: IRequestValidator,
    providerRepository: IProviderRepository,
    spaceRepository: SpaceRepository,
    nodemailer: Nodemailer,
    id: string,
    providerId: string,
    isAccepted: boolean
  ): Promise<IResponse> => {
    try {
      const validation = requestValidator.validateRequiredFields(
        { id, providerId, isAccepted },
        ["id", "providerId", "isAccepted"]
      );
      if (!validation.success) {
        throw ErrorResponse.badRequest(validation.message as string);
      }
  
      const provider = await providerRepository.findProviderById(providerId);
      if (!provider) {
        throw ErrorResponse.notFound("Provider not found");
      }
  
      const space = await spaceRepository.updateSpaceStatus(id, isAccepted);
      if (!space) {
        throw ErrorResponse.notFound("Space not found");
      }
  
      const message = isAccepted ? "accepted" : "rejected";
      await nodemailer.sendReviewToEmail(provider.email, provider.name, message);
  
      return {
        status: 200,
        success: true,
        message: `Space request successfully ${message}`,
      };
    } catch (error) {
      throw error;
    }
  };