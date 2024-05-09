import { IRequestValidator } from "../interfaces/repositries/validRepository";
import IHashpassword from "../interfaces/services/hashPassword";
import Ijwt from "../interfaces/services/jwt";
import Nodemailer from "../interfaces/services/nodeMailer";
import { IProviderRepository } from "../interfaces/repositries/providerRepositry";
import { createProvider } from "./provider/createProvider";
import { loginProvider } from "./provider/loginProvider";
import { sendEmail } from "./provider/sendEmailToProvider";
import { emailVerification } from "./user/emailVerification";


export class ProviderUseCase {
    private readonly providerRepository: IProviderRepository;
    private readonly bcrypt: IHashpassword;
    private readonly jwt: Ijwt;
    private readonly nodemailer: Nodemailer;
    private readonly requestValidator: IRequestValidator;
  
    constructor(
      providerRepository: IProviderRepository,
      bcrypt: IHashpassword,
      jwt: Ijwt,
      nodemailer: Nodemailer,
      requestValidator: IRequestValidator
    ) {
      this.providerRepository = providerRepository;
      this.bcrypt = bcrypt;
      this.jwt = jwt;
      this.nodemailer = nodemailer;
      this.requestValidator = requestValidator;
    }
  
    async createProvider({
      name,
      mobile,
      email,
      password,
    }: {
      name: string;
      mobile: string;
      email: string;
      password: string;
    }) {
      return createProvider(
        this.requestValidator,
        this.providerRepository,
        this.bcrypt,
        name,
        mobile,
        email,
        password
      );
    }

    
  async loginProvider({ email, password }: { email: string; password: string }) {
    return loginProvider(
      this.requestValidator,
      this.providerRepository,
      this.bcrypt,
      this.jwt,
      email,
      password
    );
  }

  async sendEmails({email,name}:{email:string;name:string}) {
    return sendEmail(this.requestValidator,this.nodemailer,email,name);
  }

  async emailVerification({otp,email}:{otp:string,email:string} ) {
    console.log('email verify')
    return emailVerification(this.requestValidator,this.nodemailer,otp,email);
  }


  
}  