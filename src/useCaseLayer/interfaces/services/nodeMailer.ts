interface Nodemailer {
    verifyEmail(otp: string, email: string): unknown;
    generateOTP(email: string): string;
    sendEmailVerification(email: string, username: string): Promise<string>;
    sendEmailVerificationProvider(email: string, username: string) :Promise<string>;
    sendLink(email: string, username: string, token: string): Promise<string>;
  }
  
  export default Nodemailer;