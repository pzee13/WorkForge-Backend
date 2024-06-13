import jwt from 'jsonwebtoken'
import Ijwt from '../../usecase/interfaces/services/jwt'
import ErrorResponse from '../../usecase/handlers/errorResponse'


class JwtPassword implements Ijwt {
    createJWT(userId: string, email: string, role: string, name: string): string {
        const jwtKey = process.env.JWT_SECRET;
        console.log("jwt:",jwtKey)
        if(jwtKey) {
          const token :string = jwt.sign(
            {id:userId,email:email,role:role,name:name},
            jwtKey,
            { expiresIn: '30d' }
          ) 
          console.log("token",token)
          return token;
          
        } 
        throw new Error('JWT_KEY is not defined');
    } 

    


  }
  
  export default JwtPassword;