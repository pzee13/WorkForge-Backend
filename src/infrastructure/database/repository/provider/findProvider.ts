import ProviderModel from "../../model/providerModel"

export const findProvider = async (
  email:string,
  providerModel:typeof ProviderModel
)=> {
  try {
    console.log("email finduser");
    const existingProvider = await providerModel.findOne({email})
    return existingProvider
  } catch (error) {
    throw error
  }
}