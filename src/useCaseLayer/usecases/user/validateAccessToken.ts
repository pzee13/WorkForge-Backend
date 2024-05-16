import ErrorResponse from "../../handlers/errorResponse";
import { IUserRepository } from "../../interfaces/repositries/userRepository";
import { IResponse } from "../../interfaces/services/response";
const jwt = require("jsonwebtoken");
import Ijwt from "../../interfaces/services/jwt";

export const validateAccessToken = async (
    userRepository: IUserRepository,
    token: string,
): Promise<IResponse> => {
    try {

        console.log('token::::',token)

        const decoded = await jwt.verify(token, process.env.JWT_SECRET, (err:any, res: any) => {
            if (err) {
                throw ErrorResponse.badRequest("token not verified");
            }
            return res
        });
 
        console.log(decoded)
        
        console.log(decoded.email)
        const user = await userRepository.findUser(decoded.email);
        console.log(user,"userrrr")
        


        if (user) {
            return {
                status: 200,
                success: true,
                message: "Token verified",
                data: user._id
            }
        } else {
            throw ErrorResponse.badRequest("token not verified");
        }
    } catch (error) {
        throw error
    }
};