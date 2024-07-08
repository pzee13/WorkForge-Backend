import jwt from 'jsonwebtoken';
import { Request,Response,NextFunction } from 'express';
import { UserRepository } from '../database/repository/userRepository';
import { User } from '../../domain/user';
import { Admin } from '../../domain/admin'
import { Provider } from '../../domain/provider';
import { AdminRepository } from '../database/repository/adminRepository';
import { ProviderRepository } from '../database/repository/providerRepository';
import UserModel from '../database/model/userModel';
import AdminModel from '../database/model/adminModel';
import ProviderModel from '../database/model/providerModel'

declare global {
    namespace Express {
      interface Request{
      user?:User | Admin | Provider;
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
          const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
          const user = await userRepository.findUser(decoded.email);
          if (user) {
            req.user = user;

            if (user.isBlocked) {
              res.status(403).json({ message: 'User blocked' });
              return;
            }
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


    static async protectAdmin(req: Request, res: Response, next: NextFunction): Promise<void> {
        let token: string | undefined;
    
        console.log('Admin protect');
        token = req.cookies.adminjwt;
    
        const adminRepository = new AdminRepository(AdminModel);
    
        if (token) {
          try {
            const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
            console.log("decoded:",decoded)
            const admin = await adminRepository.findAdmin(decoded.email);
            if (admin) {
              req.user = admin;
              console.log('before next');
              next();
            } else {
              console.error('Admin not found');
              res.status(404).send('Admin not found');
            }
          } catch (error) {
            console.error(error);
            res.status(401).send('Not authorized, no token');
          }
        } else {
          console.log('No token');
          res.status(401).send('Not authorized, no token');
        }
      }


      //Provider authentication
      static async protectProvider(req: Request, res: Response, next: NextFunction): Promise<void> {
        let token: string | undefined;
    
        console.log('Provider protect');
        token = req.cookies.providerjwt;
        console.log(token)
    
        const providerRepository = new ProviderRepository(ProviderModel)
    
        if (token) {
          try {
            const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
            const provider = await providerRepository.findProvider(decoded.email);
            if (provider) {
              req.user = provider;
              console.log('before next');
              next();
            } else {
              console.error('Provider not found');
              res.status(404).send('Provider not found');
            }
          } catch (error) {
            console.log("hai")
            console.error(error);
            res.status(401).send('Not authorized, no token');
          }
        } else {
          console.log('No token');
          res.status(401).send('Not authorized, no token');
        }
      }
    
}

export default AuthMiddleware;