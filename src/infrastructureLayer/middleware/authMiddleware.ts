import jwt from 'jsonwebtoken';
import { Request,Response,NextFunction } from 'express';
import { UserRepository } from '../database/repository/userRepository';
import { User } from '../../domainLayer/user';
import { Admin } from '../../domainLayer/admin'
import UserModel from '../database/model/userModel';

declare global {
    namespace Express {
      interface Request{
      user?:User | Admin;
      }
    }
  }

  class AuthMiddleware {
    static async protectUser(req:Request,res:Response,next:NextFunction):Promise<void> {
      let token: string | undefined;
      console.log('User protect');
      token = req.cookies.userjwt;
  
      const userRepository = new UserRepository(UserModel);
  
      if(token) {
        try {
          const decoded: any = jwt.verify(token, process.env.JWT_KEY as string);
          const user = await userRepository.findUser(decoded.email);
          if (user) {
            req.user = user;
            console.log('before next');
            next();
          } else {
            console.error('User not found');
            res.status(404).send('User not found');
          }
        } catch (error) {
          console.error(error);
          res.status(401).send('Not Authorized, no token');
        }
      }else {
        console.log('No token');
        res.status(401).send('Not authorized ,no token');
        
      }
      
    }
}