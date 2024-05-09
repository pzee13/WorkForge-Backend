import ErrorResponse from "../../handlers/errorResponse";
import { IRequestValidator } from "../../interfaces/repositries/validRepository";
import INodemailer from "../../interfaces/services/nodeMailer";
import { IResponse } from "../../interfaces/services/response";


export const sendEmail = async (
    requestValidator:IRequestValidator,
    nodemailer:INodemailer,
    email:string,
    name:string
  ): Promise <IResponse> => {
    try {
      const validation =requestValidator.validateRequiredFields(
        {email,name},
        ["email","name"]
      );
  
      if(!validation.success) {
        throw ErrorResponse.badRequest(validation.message as string);
      }
  
      const verify = await nodemailer.sendEmailVerificationProvider(email,name);
  
      return {
        status:200,
        success:true,
        message:verify
      }
    } catch (error) {
      throw error
    }
  }