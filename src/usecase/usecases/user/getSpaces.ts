import SpaceModel from '../../../infrastructure/database/model/spaceModel'
import { SpaceResponse } from '../../interfaces/services/response'

export const getSpaces  = async (page: number, perPage: number, spaceType: string, state: string, search: string): Promise <SpaceResponse> => {
    try {
      let query: any = { isAccepted:true };
      
      if (spaceType) {
        query['spaceType'] = spaceType;
      }
  
      
      if (state) {
        query['state'] = state;
      }
  
      
      if (search) {
        query['spaceName'] = { $regex: new RegExp(search, 'i') };
      }
  
      const TotalSpaces = await SpaceModel.countDocuments(query);
  
      const spaces = await SpaceModel.find(query)
          .limit(perPage)
          .skip((page - 1) * perPage);
  
      return {
        status:200,
        success:true,
        data:spaces,
        total:TotalSpaces
      }
    } catch (error) {
      throw new Error (`Error fetching trainers:${error}`)
    }
  }
