import { Admin } from "../../../domain/admin";
import { IAdminRepository } from "../../../useCaseLayer/interfaces/repositries/adminRepository";
import AdminModel from "../model/adminModel";
import { isAdmin } from "./admin/isAdmin";
import { profitToWallet } from "./admin/moneyToWallet";

export class AdminRepository implements IAdminRepository {
  constructor (private readonly adminModel:typeof AdminModel) { }

   async findAdmin(email: string): Promise<Admin | null> {
   return isAdmin(email,this.adminModel);   
   
  }

  async profitToWallet(adminProfit:number): Promise<string | null> {
    return profitToWallet(adminProfit,this.adminModel)
  }
  
}