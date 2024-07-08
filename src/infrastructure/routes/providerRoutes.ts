import express, { NextFunction, Request, Response } from "express";
import { providerAdapter } from "./injections/providerInjection";
import { spaceAdapter } from "./injections/spaceInjection";
import AuthMiddleware from "../middleware/authMiddleware";


const router = express.Router();


router.post("/register", (req: Request, res: Response, next: NextFunction) =>
    providerAdapter.createProvider(req, res, next)
  );
  
  router.post("/login", (req: Request, res: Response, next: NextFunction) =>
    providerAdapter.loginProvider(req, res, next)
  );
  
  router.post("/sendEmail", (req: Request, res: Response, next: NextFunction) =>
    providerAdapter.sendEmail(req, res, next)
  );
  
  router.post("/verifyEmail", (req: Request, res: Response, next: NextFunction) =>
    providerAdapter.emailVerification(req, res, next)
  );

  router.post(
    "/createSpace",
    AuthMiddleware.protectProvider,
    (req: Request, res: Response, next: NextFunction) =>
      spaceAdapter.createSpace(req, res, next)
  );


  router.patch(
    "/updateProviderProfile",
    AuthMiddleware.protectProvider,
    (req:Request, res:Response,next:NextFunction) =>
      providerAdapter.updateProviderProfile(req,res,next)
  )
  

  router.post("/logout", (req:Request,res:Response,next:NextFunction) => 
    providerAdapter.logoutProvider(req,res,next)
 )


 router.get(
  "/getProviders",
  (req: Request, res: Response, next: NextFunction) =>
     providerAdapter.getProviders(req,res,next)
)

router.get(
  "/mySpaces",
  (req: Request, res: Response, next: NextFunction) =>
    spaceAdapter.getSpaces(req,res,next)
)


  export default router;