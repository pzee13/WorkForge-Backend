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
  }