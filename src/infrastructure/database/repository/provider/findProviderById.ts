import ProviderModel from "../../model/providerModel"

export const findProviderById = async (
  id: string,
  providerModel: typeof ProviderModel
) => {
  try {
    console.log("Finding provider by ID");
    const existingProvider = await providerModel.findById(id);
    return existingProvider;
  } catch (error) {
    throw error;
  }
};
