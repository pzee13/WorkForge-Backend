import { Admin } from "../../../domainLayer/admin";


export interface IAdminRepository {
  findAdmin(email: string): Promise<Admin | null>;
}