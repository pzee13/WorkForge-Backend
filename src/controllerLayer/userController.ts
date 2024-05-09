import { Next, Req, Res } from "../infrastructureLayer/types/expressTypes";
import { UserUseCase } from "../useCaseLayer/usecases/userUseCases";

export class UserAdapter {
  private readonly userusecase: UserUseCase;

  constructor(userusecase: UserUseCase) {
    this.userusecase = userusecase;
  }

  async createUser(req: Req, res: Res, next: Next) {
    try {
      const newUser = await this.userusecase.createUser(req.body);
      newUser &&
        res.cookie("userjwt", newUser.token, {
          httpOnly: true,
          sameSite: "strict", // Prevent CSRF attacks
          maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });
        res.status(newUser.status).json({
          success: newUser.success,
          message: newUser.message,
          user: newUser.data,
        });
    } catch (error) {
      next(error);
    }
  }

  async sendEmail(req: Req, res: Res, next: Next) {
    try {
      const user = await this.userusecase.sendEmails(req.body);
      res.status(user.status).json({
        success: user.success,
        message: user.message,
      });
    } catch (error) {
      next(error);
    }
  }

  async emailVerification(req: Req, res: Res, next: Next) {
    try {
      const user = await this.userusecase.emailVerification(req.body);
      console.log(user)
      user &&
        res.status(user.status).json({
          success: user.success,
          data: user.data,
          message:user.message
        });
    } catch (error) {
      next(error);
    }
  }

  async loginUser(req: Req, res: Res, next: Next) {
    try {
      const user = await this.userusecase.loginUser(req.body);
      user &&
        res.cookie("userjwt", user.token, {
          httpOnly: true,
          sameSite: "strict", // Prevent CSRF attacks
          maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });
        res.status(user.status).json({
          success: user.success,
          data: user.data,
          message: user.message,
        });
    } catch (error) {
      next(error);
    }
  }

  async logoutUser(req: Req, res: Res, next:Next) {
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