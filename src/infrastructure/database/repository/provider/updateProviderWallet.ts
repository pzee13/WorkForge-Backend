import ProviderModel from "../../model/providerModel";

export const updateProviderWallet = async (
    providerId: string,
    refundAmount: number,
    providerModel: typeof ProviderModel
  ): Promise<string | null> => {

    try{
    // Fetch the provider
    const provider = await providerModel.findById(providerId).select("-password");
    console.log("provider", provider);

    if (provider) {
      // Ensure wallet balance doesn't go negative
      provider.wallet = (provider.wallet || 0) - refundAmount;
      if (provider.wallet < 0) {
        throw new Error("Insufficient funds in provider's wallet");
      }

      // Save the updated provider
      const res = await provider.save();
      console.log("res", res);
      return "Successfully refunded wallet"; // Return success message
    } else {
      return null; // Provider not found
    }
  } catch (error) {
    throw error;
  }

}
  