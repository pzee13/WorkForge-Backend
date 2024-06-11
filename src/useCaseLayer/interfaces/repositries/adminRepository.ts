import { Admin } from "../../../domain/admin";



export interface IAdminRepository {
  findAdmin(email: string): Promise<Admin | null>;
  profitToWallet(adminProfit:number): Promise<string | null>;
}