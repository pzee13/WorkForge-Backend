import { Provider } from "../../../domainLayer/provider";
import { StoreData } from "../services/response";

export interface IProviderRepository {
    createProvider(newProvider: Provider): Promise<Provider>;
    findProvider(email:string):Promise<Provider|null>;
    findProviderById(id: string): Promise<Provider | null>;
    updateProviderProfile(data:Record<string,string>): Promise<Provider>;
  }  

