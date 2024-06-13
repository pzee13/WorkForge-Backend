import { Provider } from "../../../domain/provider";
import { IProviderRepository } from "../../../usecase/interfaces/repositries/providerRepositry";
import ProviderModel from "../model/providerModel";
import { createProvider } from "./provider/createProvider";
import { findProvider } from "./provider/findProvider";
import { findProviderById } from "./provider/findProviderById";
import { updateProviderProfile } from "./provider/updateProviderProfile";
import { moneyToWallet } from "./provider/moneyToWallet";
import { blockProvider } from './provider/blockProvider'

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

    async profitToWallet(providerId: string, providerAmount:number): Promise<string | null> {
      return moneyToWallet(providerId,providerAmount,this.providerModel)
    }

    async blockProvider(_id: string): Promise<string | null> {
      return blockProvider(_id,this.providerModel)
    }
  
}