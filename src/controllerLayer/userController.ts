import { Next, Req, Res } from "../infrastructureLayer/types/expressTypes";
import { UserUseCase } from "../useCaseLayer/usecases/userUseCases";

export class UserAdapter {
  private readonly userusecase: UserUseCase;

  constructor(userusecase: UserUseCase) {
    this.userusecase = userusecase;
  }

  async createUser(req: Req, res: Res, next: Next) {
    try {
      console.log("create user 3...")
      const newUser = await this.userusecase.createUser(req.body);
      newUser &&
        res.cookie("userjwt", newUser.token, {
          httpOnly: true,
          sameSite: "strict", 
          maxAge: 30 * 24 * 60 * 60 * 1000, 
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

  async googleAuth(req: Req, res: Res, next: Next) {
    try {
      const user = await this.userusecase.googleAuth(req.body);
      user &&
        res.cookie("userjwt", user.token, {
          httpOnly: true,
          sameSite: "none", 
          maxAge: 30 * 24 * 60 * 60 * 1000, 
        });

      res.status(user.status).json({
        success: user.success,
        data: user.data,
        message: user.message,
      });
    } catch (err) {
      next(err);
    }
  }

  async sendEmail(req: Req, res: Res, next: Next) {
    try {
      console.log("send email 3...")
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
      console.log("verify email 3...")
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


  async forgotPassword(req: Req, res: Res, next: Next) {
    try {
      const newUser = await this.userusecase.forgotPassword(req.body);
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
    } catch (err) {
      next(err);
    }
  }

  async validateAccessToken(req: Req, res: Res, next: Next) {
    try {
      console.log("body//////",req.body)
      const newUser = await this.userusecase.validateAccessToken(req.body);
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
    } catch (err) {
      next(err);
    }
  }


  async resetPassword(req: Req, res: Res, next: Next) {
    try {
      const newUser = await this.userusecase.resetPassword(req.body);
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
    } catch (err) {
      next(err);
    }
  }
  
}