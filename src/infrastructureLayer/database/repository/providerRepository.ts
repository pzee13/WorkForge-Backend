import { Provider } from "../../../domainLayer/provider";
import { IProviderRepository } from "../../../useCaseLayer/interfaces/repositries/providerRepositry";
import ProviderModel from "../model/providerModel";
import { createProvider } from "./provider/createProvider";
import { findProvider } from "./provider/findProvider";
import { findProviderById } from "./provider/findProviderById";
import { updateProviderProfile } from "./provider/updateProviderProfile";

export class ProviderRepository implements IProviderRepository{
    constructor(private readonly providerModel:typeof ProviderModel){}
  
  
     async createProvider(newProvider: Provider): Promise<Provider> {
      return createProvider(newProvider,this.providerModel);    
    }
  
    async findProvider(email: string): Promise<Provider | null> {
      return findProvider(email, this.providerModel);
    }

    async findProviderById(id: string): Promise<Provider | null> { // Add method here
      return findProviderById(id, this.providerModel);
    }

    async updateProviderProfile(data: Record<string, string>): Promise<Provider| never>{
      return updateProviderProfile(data,this.providerModel)
    }
}