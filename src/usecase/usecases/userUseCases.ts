
import { IUserRepository } from "../interfaces/repositries/userRepository";
import { IRequestValidator } from "../interfaces/repositries/validRepository";
import IHashpassword from "../interfaces/services/hashPassword";
import Ijwt from "../interfaces/services/jwt";
import Nodemailer from "../interfaces/services/nodeMailer";
import { createUser } from "./user/createUser";
import { loginUser } from "./user/loginUser";
import { sendEmail } from "./user/sendEmail";
import { emailVerification } from "./user/emailVerification";
import { googleAuth } from "./user/googleAuth";
import { forgotPassword } from "./user/forgotPassword";
import { validateAccessToken } from "./user/validateAccessToken";
import { resetPassword } from "./user/resetPassword";
import { getSpaces } from "./user/getSpaces";
import { updateProfile }  from "./user/updateUserProfile"


export class UserUseCase {
    private readonly userRepository: IUserRepository;
    private readonly bcrypt: IHashpassword;
    private readonly jwt: Ijwt;
    private readonly nodemailer: Nodemailer;
    private readonly requestValidator: IRequestValidator;
  
    constructor(
      userRepository: IUserRepository,
      bcrypt: IHashpassword,
      jwt: Ijwt,
      nodemailer: Nodemailer,
      requestValidator: IRequestValidator
    ) {
      this.userRepository = userRepository;
      this.bcrypt = bcrypt;
      this.jwt = jwt;
      this.nodemailer = nodemailer;
      this.requestValidator = requestValidator;
    }
  
    async createUser({
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
      console.log("creating user 2...")
      return createUser(
        this.requestValidator,
        this.userRepository,
        this.bcrypt,
        name,
        mobile,
        email,
        password
      );
    }

    
  async loginUser({ email, password }: { email: string; password: string }) {
    return loginUser(
      this.requestValidator,
      this.userRepository,
      this.bcrypt,
      this.jwt,
      email,
      password
    );
  }

  async googleAuth({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) {
    return googleAuth(
      this.requestValidator,
      this.userRepository,
      this.bcrypt,
      this.jwt,
      name,
      email,
      password
    );
  } 


  async sendEmails({email,name}:{email:string;name:string}) {
    console.log("email sending .. 2")
    return sendEmail(this.requestValidator,this.nodemailer,email,name);
  }

  async emailVerification({otp,email}:{otp:string,email:string} ) {
    console.log("email verifying ..2")
    return emailVerification(this.requestValidator,this.nodemailer,otp,email);
  } 

  async forgotPassword({email,name,token}: {email: string, name:string, token: string;}) {return forgotPassword(
      this.requestValidator,
      this.userRepository,
      this.jwt,
      this.nodemailer,
      email,
      name,
      token

    );
  }

  async validateAccessToken({token}:{token:string}){
    return validateAccessToken(
      this.userRepository,
      token
    )
  }

  async resetPassword({id,password}:{id:string,password:string}){
    return resetPassword(
      this.userRepository,
      this.requestValidator,
      this.bcrypt,
      id,
      password
    )
  }



  async getAcceptedSpaces(page: number, perPage: number, spaceType: string, state: string, search: string){
    return getSpaces(page, perPage, spaceType, state, search);
  }


  
  async updateProfile({
    _id,
    name,
    mobile
  }: {
  _id : string,
  name : string,
  mobile : string
  }) {
   return updateProfile(
     this.requestValidator,
     this.userRepository,
     _id,
     name,
     mobile
   );
  }



  
}  