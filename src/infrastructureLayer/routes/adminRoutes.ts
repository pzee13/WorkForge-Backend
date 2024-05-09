import express, { NextFunction, Request, Response } from "express";
import { adminAdapter } from "./injections/adminInjection";

const router = express.Router();

router.post("/login", 
  (req: Request, res: Response, next: NextFunction) =>
    adminAdapter.loginAdmin(req,res,next)
);


export default router
