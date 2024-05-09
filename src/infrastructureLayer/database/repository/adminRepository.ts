import { Admin } from "../../../domainLayer/admin";
import { IAdminRepository } from "../../../useCaseLayer/interfaces/repositries/adminRepository";
import AdminModel from "../model/adminModel";
import { isAdmin } from "./admin/isAdmin";

export class AdminRepository implements IAdminRepository {
  constructor (private readonly adminModel:typeof AdminModel) { }

   async findAdmin(email: string): Promise<Admin | null> {
   return isAdmin(email,this.adminModel);   
  }
}