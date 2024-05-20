import { WorkSpace } from "../../../../domainLayer/workSpace";
import SpaceModel from "../../model/spaceModel";

export const updateSpaceStatus = async (
  id: string,
  isAccepted: boolean,
  spaceModel: typeof SpaceModel
): Promise<string> => {
  try {
    const space = await spaceModel.findByIdAndUpdate(
      id,
      { isAccepted },
      { new: true }
    );

    if (!space) {
      throw new Error("Space not found");
    }

    return `Space status successfully ${isAccepted ? "accepted" : "rejected"}`;
  } catch (error) {
    throw error;
  }
};