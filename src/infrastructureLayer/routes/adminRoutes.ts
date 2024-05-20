import express, { NextFunction, Request, Response } from "express";
import { adminAdapter } from "./injections/adminInjection";

const router = express.Router();

router.post("/login", 
  (req: Request, res: Response, next: NextFunction) =>
    adminAdapter.loginAdmin(req,res,next)
);

router.get(
  "/getSpaceRequests",
  (req: Request, res: Response, next: NextFunction) =>
    adminAdapter.getSpaceRequests(req, res, next)
);

router.patch(
  "/updateSpaceStatus/:id/:providerId",
  (req: Request, res: Response, next: NextFunction) =>
    adminAdapter.updateSpaceStatus(req, res, next)
);

router.post("/logout", (req:Request,res:Response,next:NextFunction) => 
  adminAdapter.logoutAdmin(req,res,next)
)

export default router
