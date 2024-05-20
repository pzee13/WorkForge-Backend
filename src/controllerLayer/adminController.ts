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

  async getSpaceRequests(req: Req, res: Res, next: Next) {
    
    try {
      console.log("get Space datas");
      const requests = await this.adminusecase.getSpaceRequests();
      requests &&
        res.status(requests.status).json({
          success: requests.success,
          data: requests.data,
        });
        console.log(requests);
    } catch (err) {
      next(err);
    }
  }


  async updateSpaceStatus(req: Req, res: Res, next: Next) {
    try {
      const { id, providerId } = req.params // Extracting id, providerId, isAccepted from the request body
      const { isAccepted } = req.body;
      console.log(req.params.id)
      const spaceStatus = await this.adminusecase.updateSpaceStatus({ id, providerId, isAccepted }); 

      res.status(spaceStatus.status).json({
        success: spaceStatus.success,
        message: spaceStatus.message,
      });
    } catch (err) {
      next(err);
    }
  }

  async logoutAdmin(req: Req, res: Res, next:Next) {
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

}