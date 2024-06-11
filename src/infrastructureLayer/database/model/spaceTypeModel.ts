import mongoose, { Document, Model, Schema } from "mongoose";
import { SpaceType } from "../../../domain/spaceType";


const SpaceTypeSchema =new Schema<SpaceType & Document>(
    {
      spaceTypeName: { type: String, required: true, unique:true},
      description: { type: String, required: true },
      peopleAllowed: { type: Boolean, required: true },
      availableSpace: { type: Boolean, required: true },
    },
   
  );
  
  const SpaceTypeModel: Model<SpaceType & Document> = mongoose.model<SpaceType & Document>(
    "SpaceType",
    SpaceTypeSchema
  );
  
  export default SpaceTypeModel;