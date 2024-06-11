import SpaceTypeModel from "../../../infrastructureLayer/database/model/spaceTypeModel";
import { SpaceTypeResponse } from "../../interfaces/services/response";


export const getSpaceType = async (): Promise<SpaceTypeResponse> => {
    try {
      const spacetype = await SpaceTypeModel.find({})
      return {
        status: 200,
        success: true,
        data: spacetype,
      };
    } catch (error) {
      throw new Error(`No space types given : ${error}`);
    }
  };
