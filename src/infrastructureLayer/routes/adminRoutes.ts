import express, { NextFunction, Request, Response } from "express";
import { adminAdapter } from "./injections/adminInjection";
import { spaceAdapter } from "./injections/spaceInjection";
import { providerAdapter } from "./injections/providerInjection";
import AuthMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.post("/login", 
  (req: Request, res: Response, next: NextFunction) =>
    adminAdapter.loginAdmin(req,res,next)
);

router.get(
  "/getSpaceRequests",AuthMiddleware.protectAdmin,
  (req: Request, res: Response, next: NextFunction) =>
    adminAdapter.getSpaceRequests(req, res, next)
);

router.get(
  "/getUsers",AuthMiddleware.protectAdmin,
  (req: Request, res: Response, next: NextFunction) =>
     adminAdapter.getUsers(req,res,next)
)

router.patch(
  "/updateSpaceStatus/:id/:providerId",
  AuthMiddleware.protectAdmin,
  (req: Request, res: Response, next: NextFunction) =>
    adminAdapter.updateSpaceStatus(req, res, next)
);

router.post(
  "/createSpaceType",
  AuthMiddleware.protectAdmin,
  (req: Request, res: Response, next: NextFunction) =>
    spaceAdapter.createSpaceType(req, res, next)
)

router.patch(
  "/updateSpaceType",
  AuthMiddleware.protectAdmin,
  (req: Request, res: Response, next: NextFunction) =>
    spaceAdapter.updateSpaceType(req, res, next)
);


router.get(
  "/getSpaceTypes",
  AuthMiddleware.protectAdmin,
  (req: Request, res: Response, next: NextFunction) =>
    spaceAdapter.getSpaceType(req, res, next)
)

router.patch(
  "/users/unblock-block",
  AuthMiddleware.protectAdmin,
  (req: Request, res: Response, next: NextFunction) =>
    adminAdapter.blockUnblockUser(req, res, next)
);

router.patch(
  "/providers/unblock-block",
  AuthMiddleware.protectAdmin,
  (req: Request, res: Response, next: NextFunction) =>
    providerAdapter.blockProvider(req, res, next)
);


router.post("/logout", (req:Request,res:Response,next:NextFunction) => 
  adminAdapter.logoutAdmin(req,res,next)
)

router.get(
  "/getProviders",
  AuthMiddleware.protectAdmin,
  (req: Request, res: Response, next: NextFunction) =>
     providerAdapter.getProviders(req,res,next)
)

export default router
 