import nodemailer from "nodemailer";
import INodemailer from "../../usecase/interfaces/services/nodeMailer";

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
        console.log("eee")
        return false;
      }
    } catch (error) {
      console.log("weee")
      throw new Error("Wrong otp");
    }
  }

  async sendLink(email: string, username: string, token: string): Promise<string> {
    console.log("---------------------",email, username);
    
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASS
        }
    });
    const mailOptions = {
        from: "aswinpc9@gmail.com",
        to: email,
        subject: "SetSpace Password Assistance",
        html: `  <div style="max-width: 600px;">
                    <p style="font-size: 16px;">Hello, ${username},</p>
                    <p style="font-size: 14px;">We received a request to reset your password for your SetSpace account.</p>
                    <p style="font-size: 14px;">Please click on the link below to reset your password:</p>
                    <p style="font-size: 14px;"><a href="http://localhost:3000/resetPassword/${email}/${token}" style="color: #007bff; text-decoration: none;">Reset Password</a></p>
                    <p style="font-size: 14px;">If you did not request this change, please ignore this email.</p>
                    <p style="font-size: 14px;">Thank you,</p>
                    <p style="font-size: 14px;">SetSpace</p>
                </div>` 
    }        

    await transporter.sendMail(mailOptions);
    return "success";
    
}

    async sendReviewToEmail(email: string, name: string, status: string): Promise<string> {
      try {
        
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
        
        const message = status === "accepted" ? "Your space has been accepted." : "Your space has been rejected.";

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
              <p>${message}</p>
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

   

}

export default Nodemailer;
