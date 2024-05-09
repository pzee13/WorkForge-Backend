import express, { NextFunction, Request, Response } from "express";
import { providerAdapter } from "./injections/providerInjection";

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
  

  export default router;