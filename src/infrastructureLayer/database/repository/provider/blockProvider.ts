import ProviderModel from "../../model/providerModel";

export const blockProvider = async (
  _id:string,
  providerModels:typeof ProviderModel
): Promise<string | null > => {
  try {
    const user = await providerModels.findOne({_id:_id}).select("-password");
    if(user) {
      user.isBlocked = !user.isBlocked;
      await user.save();
      return "Successfully updated";
    }else {
      return null;
    }
  } catch (error) {
    throw error
  }
}