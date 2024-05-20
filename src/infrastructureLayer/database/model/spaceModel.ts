import mongoose, { Document, Model, Schema } from "mongoose";
import { WorkSpace } from "../../../domainLayer/workSpace";

const SpaceSchema:Schema =new Schema<WorkSpace & Document>(
    {
      spaceName: { type: String, required: true, unique:true},
      providerId: { type: String, required: true },
      spaceType:{ type: String, required: true },
      state:{ type: String, required: true },
      district:{ type: String, required: true },
      city:{ type: String, required: true },
      areaName:{ type: String, required: true },
      buildingName:{ type: String, required: true },
      description:{ type: String, required: true },
      images: [{ type: String }],
      floor:{type:String},
      chargePerHour:{ type: Number, required: true },
      availableSpaces:{ type: Number, required: true },
      isAccepted:{ type: Boolean, default: false },
      contactNumber:{ type: String, required: true },
      facilities: [{ type: String }],
      rentalAgreement:{ type: String, required: true },
    //   startService: { type: Date },
    //   endService: { type: Date },
      latitude: {type:Number, required: true},
      longitude: {type:Number, required: true}
    },
    {
      timestamps: true,
    }
  );
  
  const SpaceModel: Model<WorkSpace & Document> = mongoose.model<WorkSpace & Document>(
    "Space",
    SpaceSchema
  );
  
  export default SpaceModel;