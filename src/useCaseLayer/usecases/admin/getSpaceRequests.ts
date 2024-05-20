import SpaceModel from '../../../infrastructureLayer/database/model/spaceModel'
import { SpaceResponse } from '../../interfaces/services/response'

export const getSpaceRequests = async (): Promise<SpaceResponse> => {
    try {
      const space = await SpaceModel.find({}).select("-password");
      return {
        status: 200,
        success: true,
        data: space,
      };
    } catch (error) {
      throw new Error(`Error fetching users: ${error}`);
    }
  };
  