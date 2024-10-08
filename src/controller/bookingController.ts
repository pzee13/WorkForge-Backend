import { Next, Req, Res } from "../infrastructure/types/expressTypes";
import { BookingUseCase } from "../usecase/usecases/bookingUseCase";

export class BookingAdapter {
  private readonly bookingusecase: BookingUseCase;

  constructor(bookingusecase: BookingUseCase) {
    this.bookingusecase = bookingusecase; 
  }

  async bookSpace(req: Req, res: Res, next: Next) {
    try {
      const newBooking = await this.bookingusecase.bookSpace(req.body);
      newBooking &&
        res.status(newBooking.status).json({
          success: newBooking.success,
          message: newBooking.message,
          data: newBooking.data,
        });
    } catch (err) {
      next(err);
    }
  }

  async getPreBookings(req: Req, res: Res, next: Next) {
    try {
      console.log("get booking data before payment ");
      
      const { spaceId, userId, providerId, bookingDate, moveInTime, moveOutTime,noOfSpaces, totalPrice } = req.body;

      const booking = await this.bookingusecase.getPreBookings({
        spaceId,
        userId,
        providerId,
        bookingDate,
        moveInTime,
        moveOutTime,
        noOfSpaces,
        totalPrice
      });

      booking &&
        res.status(booking.status).json({
          success: booking.success,
          message:booking.message, 
          data: booking.data,
        });
      console.log(booking);
    } catch (err) {
      next(err);
    }
  }

  async payment(req: Req, res: Res, next: Next) {
    try {
      console.log("entered");
      const payment = await this.bookingusecase.createPayment(req.body);
      res.status(payment.status).json({
        data: payment.data,
      });
    } catch (err) {
      next(err);
    }
  }


  async webhook(req: Req, res: Res, next: Next) {
    try {
  
      const event = req.body;
      console.log("payment started")
     
      switch (event.type) {
        case "checkout.session.completed":
         
          const session = event.data.object;
          const metadata = session.metadata;
          const bookingId = metadata.bookingId;
          const providerId = metadata.providerId;
          const amount = metadata.amount;
          const transactionId = event.data.object.payment_intent;
          await this.bookingusecase.paymentConfirmation({
            transactionId,
            bookingId,
            providerId,
            amount,
          });
          break;
        default:
          console.log(`Unhandled event type: ${event.type}`);
      }

      // Respond with a success message
      res.status(200).json({ received: true });
    } catch (error) {
      next(error);
    }
  }
  

  async getBookings(req: Req, res: Res, next: Next){
    try {
        console.log("get space datas");
        const bookings = await this.bookingusecase.getBookings();
        bookings &&
          res.status(bookings.status).json({
            success: bookings.success,
            data: bookings.data,
          });
          console.log(bookings);
      } catch (err) {
        next(err);
      }
}



  async cancelBooking(req: Req, res: Res, next: Next) {
    try {
      const { bookingId } = req.body;

      const cancelledBooking = await this.bookingusecase.cancelBooking({ bookingId });

      cancelledBooking &&
        res.status(cancelledBooking.status).json({
          success: cancelledBooking.success,
          message: cancelledBooking.message,
          data: cancelledBooking.data,
        });
    } catch (err) {
      next(err);
    }
  }

  

}
