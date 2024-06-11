import mongoose,{Document,Model,Schema} from "mongoose";
import { Admin } from '../../../domain/admin'


const adminSchema: Schema = new Schema<Admin & Document>(
    {
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      wallet: { type: Number, default:0 },
    },
    {
      timestamps:true,
    }
  ) 
  
  const AdminModel: Model<Admin & Document> = mongoose.model<Admin & Document> (
    "Admin",
    adminSchema
  )
  
  export default AdminModel;