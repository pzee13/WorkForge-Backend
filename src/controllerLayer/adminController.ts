import { Next, Req, Res } from "../infrastructureLayer/types/expressTypes";
import { AdminUseCase } from "../useCaseLayer/usecases/adminUseCase";

export class AdminAdapter {
  private readonly adminusecase: AdminUseCase;

  constructor(adminusecase: AdminUseCase) {
    this.adminusecase = adminusecase;
  }

  async loginAdmin(req: Req, res: Res, next: Next) {
    try {
      const admin = await this.adminusecase.loginAdmin(req.body);
      admin &&
      res.cookie("adminjwt", admin.token, {
        httpOnly: true,
        sameSite: "strict", // Prevent CSRF attacks
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });
        res.status(admin.status).json({
          succeess: admin.success,
          data: admin.data,
          message: admin.message,
        });
    } catch (error) {
      next(error);
    }
  }

}