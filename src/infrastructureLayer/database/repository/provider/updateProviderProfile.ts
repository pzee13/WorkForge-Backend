import { Provider } from "../../../../domainLayer/provider";
import ProviderModel from "../../../database/model/providerModel"

export const updateProviderProfile = async (
    data : Record<string,string>,
    providerModels: typeof ProviderModel
): Promise<Provider | never> => {
    try {
       
        const provider = await providerModels.findOne({ _id: data._id}).select("-password");
        if (provider) {
            // Assuming isStatus is a property on the user model
            provider.name = data.name
            provider.mobile = data.mobile
            await provider.save();
            return provider;
        }
        throw new Error("Internal Server Error") 
    } catch (error) {
        throw error;
    }
}
