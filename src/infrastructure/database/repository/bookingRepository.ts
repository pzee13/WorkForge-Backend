import { Booking } from "../../../domain/booking";
import { BookingRepository } from "../../../usecase/interfaces/repositries/bookingRepository";
import { BookingResponse } from "../../../usecase/interfaces/services/response";
import { getPreBookings } from "./booking/getPreBookings"
import BookingModel from "../model/bookingModel";
import { payment } from './booking/bookPayment'
import { isBooked } from "./booking/isBooked";
import { bookSpace } from "./booking/bookSpace";
import { getBookingById } from "./booking/getBookingById"
import { cancelBooking } from "./booking/cancelBooking";
import SpaceModel from "../model/spaceModel";


// This class for exporting all the single DB operations togethor 
export class BookingRepositories implements BookingRepository {
  constructor(private readonly bookingModel: typeof BookingModel,
    private readonly spaceModel: typeof SpaceModel, // Other models required for this class can be added here as well.
  ) {}

  // Create new user
  async bookSpace(newBooking: Booking): Promise<Booking> {
    return bookSpace(newBooking, this.bookingModel);
  }

  async  getPreBookings(spaceId: string, userId: string, providerId: string,  bookingDate: Date, moveInTime: string, moveOutTime: string,noOfSpaces:number, totalPrice: number): Promise<BookingResponse<string | Booking | Booking[]>> {
      return getPreBookings(spaceId, userId, providerId,  bookingDate, moveInTime, moveOutTime,noOfSpaces, totalPrice,this.bookingModel)
  }

  async payment(
    bookingId: string,
    transactionId: string,
    amount: number
  ): Promise<string> {
    return payment(bookingId, transactionId, amount, this.bookingModel);
  }

  async isBooked(spaceId: string, bookingDate: Date, moveInTime: string, moveOutTime: string, noOfSpaces: number): Promise<boolean> {
    return isBooked(spaceId,bookingDate,moveInTime,moveOutTime,noOfSpaces,this.bookingModel,this.spaceModel)
}

async getBookingById(bookingId:string):Promise<Booking | null>{
  return getBookingById(bookingId,this.bookingModel);
}

async cancelBooking(bookingId: string): Promise<Booking | null> {
  return cancelBooking(bookingId,this.bookingModel); // Placeholder for cancel booking logic. In a real-world application, this method would call the appropriate cancellation service or repository.
}



}
