import { Provider } from "../../../../domain/provider";
import ProviderModel from "../../../database/model/providerModel"

export const createProvider = async (
    newProvider: Provider,
    providerModel: typeof ProviderModel
  ): Promise <Provider> => {
    try {
        console.log('database saving')
      const provider = await providerModel.create(newProvider);
      await provider.save();
      return provider;
    } catch (error) {
      throw error
    }
  }