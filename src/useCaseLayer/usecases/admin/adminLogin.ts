import { Admin } from "../../../domainLayer/admin";
import ErrorResponse from "../../handlers/errorResponse";
import { IAdminRepository } from "../../interfaces/repositries/adminRepository";
import { IRequestValidator } from "../../interfaces/repositries/validRepository";
import IHashpassword from "../../interfaces/services/hashPassword";
import IJwt  from "../../interfaces/services/jwt";
import { IResponse,StoreData } from "../../interfaces/services/response";

export const adminLogin = async (
  requestValidator: IRequestValidator,
  adminRepository: IAdminRepository,
  bcrypt: IHashpassword,
  jwt: IJwt,
  email: string,
  password: string
): Promise<IResponse> => {
    try {
      const validation = requestValidator.validateRequiredFields(
        { email, password },
        ["email", "password"]
      );
  
      if (!validation.success) {
        throw ErrorResponse.badRequest(validation.message as string);
      }
  
      const admin: Admin | null = await adminRepository.findAdmin(email);
  
      if (admin && admin._id) {
        const match: boolean = await bcrypt.compare(password, admin.password);
        if (match) {
          const token = jwt.createJWT(
            admin._id,
            admin.email,
            "admin",
            admin.name
          );
  
          const responseData : StoreData = {
            _id: admin._id,
            name: admin.name,
            email : admin.email
          }
  
          return {
            status: 200,
            success: true,
            data:responseData,
            token:token,
            message: "Successfully logged In",
          };
        }
        throw ErrorResponse.badRequest("Wrong password or email");
      }
      throw ErrorResponse.notFound("Wrong password or email");
    } catch (error) {
      throw error;
    }
  };
  