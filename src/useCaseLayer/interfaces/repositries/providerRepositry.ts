import { Provider } from "../../../domainLayer/provider";
import { StoreData } from "../services/response";

export interface IProviderRepository {
    createProvider(newProvider: Provider): Promise<Provider>;
    findProvider(email:string):Promise<Provider|null>;
    
  }  

