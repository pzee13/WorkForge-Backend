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

    const validation = requestValidator.validateRequiredFields({ email, otp }, [
      "email",
      "otp",
    ]);

    if (!validation.success) {
      throw ErrorResponse.badRequest(validation.message as string);
    }

    const verify = await nodemailer.verifyEmail(otp, email);
    if (verify) {
      return {
        status: 200,
        success: true,
        message: "Succesfully logged In  gg",
      };
    }
    throw ErrorResponse.badRequest("Wrong OTP");
  } catch (error) {
    throw error;
  }
};
