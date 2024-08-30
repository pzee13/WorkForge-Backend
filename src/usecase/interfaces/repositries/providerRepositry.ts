import { Provider } from "../../../domain/provider";
import { StoreData } from "../services/response";

export interface IProviderRepository {
    createProvider(newProvider: Provider): Promise<Provider>;
    findProvider(email:string):Promise<Provider|null>;
    findProviderById(id: string): Promise<Provider | null>;
    updateProviderProfile(data:Record<string,string>): Promise<Provider>;
    profitToWallet(providerId: string,providerAmount:number): Promise<string | null>;
    blockProvider(_id:string):Promise<string | null>;
    updateProviderWallet(userId:string, refundAmount:number): Promise<string | null>;
  }

