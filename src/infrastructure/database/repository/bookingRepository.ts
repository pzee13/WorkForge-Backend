import { Booking } from "../../../domain/booking";
import { BookingRepository } from "../../../usecase/interfaces/repositries/bookingRepository";
import { BookingResponse } from "../../../usecase/interfaces/services/response";
import { getPreBookings } from "./booking/getPreBookings"
import BookingModel from "../model/bookingModel";
import { payment } from './booking/bookPayment'

import { bookSpace } from "./booking/bookSpace";


// This class for exporting all the single DB operations togethor 
export class BookingRepositories implements BookingRepository {
  constructor(private readonly bookingModel: typeof BookingModel) {}

  // Create new user
  async bookSpace(newBooking: Booking): Promise<Booking> {
    return bookSpace(newBooking, this.bookingModel);
  }

  async  getPreBookings(spaceId: string, userId: string, providerId: string,  bookingDate: Date, moveInTime: string, moveOutTime: string, totalPrice: number): Promise<BookingResponse<string | Booking | Booking[]>> {
      return getPreBookings(spaceId, userId, providerId,  bookingDate, moveInTime, moveOutTime, totalPrice,this.bookingModel)
  }

  async payment(
    bookingId: string,
    transactionId: string,
    amount: number
  ): Promise<string> {
    return payment(bookingId, transactionId, amount, this.bookingModel);
  }


}
