import nodemailer from "nodemailer";
import INodemailer from "../../useCaseLayer/interfaces/services/nodeMailer";

class Nodemailer implements INodemailer {
  private otps: Map<string, string> = new Map();
  generateOTP(email: string): string {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString();
  }

  async sendEmailVerification(email: string, name: string): Promise<string> {
    try {
      console.log(email, name);
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: false,
        auth: {
          user: process.env.SMTP_MAIL,
          pass: process.env.SMTP_PASS,
        },
      });

      const otp = this.generateOTP(email);
      this.otps.set(email, otp);

      const mailOptions = {
        from: "aswinpc9@gmail.com",
        to: email,
        subject: "Email Verification for SetSpace",
        html: `
        <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #3BE48B;text-decoration:none;font-weight:600">SetSpace</a>
    </div>
    <p style="font-size:1.1em">Hi ${name},</p>
    <p>Thank you for choosing SetSpace. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
    <h2 style="background: #3BE48B;margin: 0 auto;width: max-content;padding: 0 10px;color: #000;border-radius: 4px;">${otp}</h2>
    <p style="font-size:0.9em;">Regards,<br />SetSpace</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>SetSpace Inc</p>
      <p>InfoPark Kochi</p>
      <p>Cochin</p>
    </div>
  </div>
</div>
        `,
      };
      await transporter.sendMail(mailOptions);
      return "Email Sent";
    } catch (error) {
      throw new Error(`Unable to send email verification to ${email}:${error}`);
    }
  }


  async sendEmailVerificationProvider(email: string, name: string): Promise<string> {
    try {
      console.log(email, name);
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: false,
        auth: {
          user: process.env.SMTP_MAIL,
          pass: process.env.SMTP_PASS,
        },
      });

      const otp = this.generateOTP(email);
      this.otps.set(email, otp);

      const mailOptions = {
        from: "Setspace@gmail.com",
        to: email,
        subject: "Email Verification for SetSpace Space Owners",
        html: `
        <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #3BE48B;text-decoration:none;font-weight:600">SetSpace</a>
    </div>
    <p style="font-size:1.1em">Hi ${name},</p>
    <p>Thank you for choosing SetSpace. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
    <h2 style="background: #3BE48B;margin: 0 auto;width: max-content;padding: 0 10px;color: #000;border-radius: 4px;">${otp}</h2>
    <p style="font-size:0.9em;">Regards,<br />SetSpace</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>SetSpace Inc</p>
      <p>InfoPark Kochi</p>
      <p>Cochin</p>
    </div>
  </div>
</div>
        `,
      };
      await transporter.sendMail(mailOptions);
      return "Email Sent";
    } catch (error) {
      throw new Error(`Unable to send email verification to ${email}:${error}`);
    }
  }

  async verifyEmail(enteredOTP: string, email: string): Promise<boolean> {
    try {
      const expectedOTP = this.otps.get(email);
      if (expectedOTP === enteredOTP) {
        this.otps.delete(email);
        console.log('entered')
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error("Wrong otp");
    }
  }

   

}

export default Nodemailer;
