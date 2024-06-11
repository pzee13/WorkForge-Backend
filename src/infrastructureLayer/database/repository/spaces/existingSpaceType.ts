import SpaceTypeModel from "../../model/spaceTypeModel";


export const existingSpaceType = async (
    spaceType: string,
    spaceTypeModel: typeof SpaceTypeModel
  ) => {
    try {
      console.log("Email in findByEmail in AdminRepository === >>> ", spaceType);
      console.log("333",spaceType)
      const allTypes = await spaceTypeModel.find();
      console.log(allTypes, "all admin");
  
      const existingSpaceType = await spaceTypeModel.findOne({ spaceTypeName: spaceType });
      console.log(existingSpaceType, "is is admin");
      return existingSpaceType;
    } catch (error) {
      throw error;
    }
  };