import { Next, Req, Res } from "../infrastructureLayer/types/expressTypes";
import { ProviderUseCase } from "../useCaseLayer/usecases/providerUseCase"; 

export class ProviderAdapter {
    private readonly providerusecase: ProviderUseCase;
  
    constructor(providerusecase: ProviderUseCase) {
      this.providerusecase = providerusecase;
    }
  
    async createProvider(req: Req, res: Res, next: Next) {
      try {
        console.log('create')
        const newProvider = await this.providerusecase.createProvider(req.body);
        newProvider &&
          res.cookie("providerjwt", newProvider.token, {
            httpOnly: true,
            sameSite: "strict", // Prevent CSRF attacks
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
          });
          res.status(newProvider.status).json({
            success: newProvider.success,
            message: newProvider.message,
          });
      } catch (error) {
        next(error);
      }
    }
    
    async sendEmail(req: Req, res: Res, next: Next) {
      try {
        console.log('send')
        const provider = await this.providerusecase.sendEmails(req.body);
        res.status(provider.status).json({
          success: provider.success,
          message: provider.message,
        });
      } catch (error) {
        next(error);
      }
    }
  
    async emailVerification(req: Req, res: Res, next: Next) {
      try {
        console.log('verify')
        const provider = await this.providerusecase.emailVerification(req.body);
        console.log(provider)
        provider &&
          res.status(provider.status).json({
            success: provider.success,
            data: provider.data,
          });
      } catch (error) {
        next(error);
      }
    }
  
    async loginProvider(req: Req, res: Res, next: Next) {
      try {
        const provider = await this.providerusecase.loginProvider(req.body);
        provider &&
            res.cookie("providerjwt", provider.token, {
                httpOnly: true,
                sameSite: "strict", // Prevent CSRF attacks
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            });
          res.status(provider.status).json({
            success: provider.success,
            data: provider.data,
            message: provider.message,
          });
      } catch (error) {
        next(error);
      }
    }


    async logoutProvider(req: Req, res: Res, next:Next) {
        try {
          res.cookie("jwt", "", {
            httpOnly: true,
            expires: new Date(0),
          });
          res.status(200).json({ message: "Logged out successfully" });
        } catch (err) {
          next(err)
        }
      }


      async updateProviderProfile(req:Req, res:Res,next:Next) {
        try {
          const provider= await this.providerusecase.updateProviderProfile(req.body);
          provider && 
          res.status(provider.status).json({
            success:provider.success,
            data:provider.data,
            message:provider.message,
          })
        } catch (error) { 
          next(error)
        }
      }


      async getProviders(req: Req, res: Res, next: Next) {
        try {
          console.log("get provider datas");
          const providers = await this.providerusecase.getProviders();
          providers &&
            res.status(providers.status).json({
              success: providers.success,
              data: providers.data,
            });
            console.log(providers);
        } catch (err) {
          next(err);
        }
      }


      async blockProvider(req: Req, res: Res, next: Next) {
        try {
          const _id = req.query.id as string;
          const user = await this.providerusecase.blockProvider(_id);
    
          user &&
            res.status(user.status).json({
              success: user.success,
              data: user.data,
              message: user.message,
            });
        } catch (error) {
          next(error);
        }
      }
  }