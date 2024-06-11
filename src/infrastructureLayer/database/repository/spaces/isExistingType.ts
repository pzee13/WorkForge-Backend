import SpaceTypeModel from "../../model/spaceTypeModel";

export const isExistingType = async (
  spaceType: string,
 
  spaceTypeModel: typeof SpaceTypeModel,
  excludeId?: string,
   // Add excludeId as an optional parameter
) => {
  try {
    console.log("SpaceType in existingSpaceType === >>> ", spaceType);

    // Build the query with an optional exclusion of the current _id
    const query = excludeId
      ? { spaceTypeName: spaceType, _id: { $ne: excludeId } }
      : { spaceTypeName: spaceType };

    const existingSpaceType = await spaceTypeModel.findOne(query);
    console.log(existingSpaceType, "is existing space type");
    
    return existingSpaceType;
  } catch (error) {
    throw error;
  }
};