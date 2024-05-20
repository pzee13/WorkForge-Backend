
import { IAdminRepository } from "../interfaces/repositries/adminRepository";
import { IRequestValidator } from "../interfaces/repositries/validRepository";
import IHashpassword from "../interfaces/services/hashPassword";
import Ijwt from "../interfaces/services/jwt";
import Nodemailer from "../interfaces/services/nodeMailer";
import { adminLogin } from "./admin/adminLogin";
import { getSpaceRequests } from "./admin/getSpaceRequests";
import { SpaceRepository } from "../interfaces/repositries/spaceRepository";
import { IProviderRepository } from "../interfaces/repositries/providerRepositry";
import { updateSpaceStatus } from "./admin/reviewRequest";



export class AdminUseCase {
    private readonly adminRepository :IAdminRepository;
    private readonly spaceRepository : SpaceRepository;
    private readonly providerRepository:IProviderRepository;
    private readonly bcrypt:IHashpassword;
    private readonly jwt: Ijwt;
    private readonly requestValidator :IRequestValidator;
    private readonly nodemailer :Nodemailer;

  
    constructor(
      adminRepository: IAdminRepository,
      spaceRepository: SpaceRepository,
      providerRepository:IProviderRepository,
      bcrypt: IHashpassword,
      jwt :Ijwt,
      requestValidator: IRequestValidator,
      nodemailer:Nodemailer,
    ){
      this.adminRepository = adminRepository
      this.spaceRepository = spaceRepository
      this.providerRepository = providerRepository
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

    async getSpaceRequests(){
      return getSpaceRequests(
      );
    }

    async updateSpaceStatus({id,providerId,isAccepted}:{ id: string,
      providerId: string,
      isAccepted: boolean}){
      return updateSpaceStatus(
        this.requestValidator,
        this.providerRepository,
        this.spaceRepository,
        this.nodemailer,
        id,
        providerId,
        isAccepted
      );
    }

   


}