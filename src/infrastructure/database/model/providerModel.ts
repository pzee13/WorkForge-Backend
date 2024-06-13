import mongoose, { Schema, Model, Document } from 'mongoose';
import { Provider } from "../../../domain/provider";

const providerSchema: Schema = new Schema<Provider & Document>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String, default: "" },
    isBlocked: { type: Boolean, default: false },
    wallet: { type: Number, default:0 },
  });
  
  
  
  const ProviderModel: Model<Provider & Document> = mongoose.model<Provider & Document>(
    "Provider",
    providerSchema
  );
  
  export default ProviderModel;