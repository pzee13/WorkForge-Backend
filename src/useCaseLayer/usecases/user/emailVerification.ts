import ErrorResponse from "../../handlers/errorResponse";
import { IRequestValidator } from "../../interfaces/repositries/validRepository";
import INodemailer from "../../interfaces/services/nodeMailer";
import { IResponse } from "../../interfaces/services/response";


export const emailVerification = async (
  requestValidator: IRequestValidator,
  nodemailer: INodemailer,
  otp: string,
  email: string
): Promise<IResponse> => {
  try {
    console.log(email);
    console.log('email verifying..');

    const validation = requestValidator.validateRequiredFields({ email, otp }, [
      "email",
      "otp",
    ]);

    if (!validation.success) {
      throw ErrorResponse.badRequest(validation.message as string);
    }

    const verify = await nodemailer.verifyEmail(otp, email);
    console.log("ver",verify)
    if (verify) {
      return {
        status: 200,
        success: true,
        message: "Successfully logged In",
      };
    }else{
      return {
        status: 400,
        success: false,
        message: "Wrong Otp",
      };
    }
  } catch (error) {
    console.log("kerreee")
    if (error instanceof ErrorResponse) {
      return {
        status: error.status,
        success: false,
        message: error.message,
      };
    }
    throw error;
  }
};
