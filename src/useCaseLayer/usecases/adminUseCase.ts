
import { IAdminRepository } from "../interfaces/repositries/adminRepository";
import { IRequestValidator } from "../interfaces/repositries/validRepository";
import IHashpassword from "../interfaces/services/hashPassword";
import Ijwt from "../interfaces/services/jwt";
import Nodemailer from "../interfaces/services/nodeMailer";
import { adminLogin } from "./admin/adminLogin";


export class AdminUseCase {
    private readonly adminRepository :IAdminRepository;

    private readonly bcrypt:IHashpassword;
    private readonly jwt: Ijwt;
    private readonly requestValidator :IRequestValidator;
    private readonly nodemailer :Nodemailer;
  
    constructor(
      adminRepository: IAdminRepository,

      bcrypt: IHashpassword,
      jwt :Ijwt,
      requestValidator: IRequestValidator,
      nodemailer:Nodemailer,
    ){
      this.adminRepository = adminRepository
      this.bcrypt= bcrypt;
      this.jwt = jwt;
      this.requestValidator= requestValidator;
      this.nodemailer=nodemailer;
    }
  
    async loginAdmin({ email, password }: { email: string; password: string }){
      return adminLogin(
        this.requestValidator,
        this.adminRepository,
        this.bcrypt,
        this.jwt,
        email,
        password
      )
    }
}