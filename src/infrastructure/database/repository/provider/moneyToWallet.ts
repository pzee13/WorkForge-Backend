import ProviderModel from "../../model/providerModel";

// Correct the parameter type for _id
export const moneyToWallet = async (
    providerId:string,
    providerAmount:number,
    providerModels: typeof ProviderModel
): Promise<string | null> => {
    try {
        console.log(" provider wallet");
        console.log("providerId",providerId);
        console.log("providerAmount",providerAmount);
        
        
        const provider = await providerModels.findById(providerId).select("-password");
        console.log("worker",provider);
        
        if (provider) {
            provider.wallet = (provider.wallet || 0) + providerAmount;
            const res = await provider.save();
            console.log("res", res);
            return "Successfully updated wallet"; // Return success message
        } else {
            return null; // Worker not found
        }
    } catch (error) {
        throw error;
    }
}
