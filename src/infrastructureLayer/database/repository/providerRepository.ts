import { Provider } from "../../../domainLayer/provider";
import { IProviderRepository } from "../../../useCaseLayer/interfaces/repositries/providerRepositry";
import ProviderModel from "../model/providerModel";
import { createProvider } from "./provider/createProvider";
import { findProvider } from "./provider/findProvider";

export class ProviderRepository implements IProviderRepository{
    constructor(private readonly providerModel:typeof ProviderModel){}
  
  
     async createProvider(newProvider: Provider): Promise<Provider> {
      return createProvider(newProvider,this.providerModel);    
    }
  
    async findProvider(email: string): Promise<Provider | null> {
      return findProvider(email, this.providerModel);
    }
}