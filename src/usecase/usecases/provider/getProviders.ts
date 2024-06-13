import ProviderModel from "../../../infrastructure/database/model/providerModel";
import { IProviderResponse } from "../../interfaces/services/response";

export const getProviders  = async (): Promise<IProviderResponse> => {
    try {
      const providers = await ProviderModel.find({}).select("-password");
      return { 
        status: 200,
        success: true,
        data: providers,
      };
    } catch (error) {
      throw new Error(`Error fetching Providers: ${error}`);
    }
  };
  