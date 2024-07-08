import { Booking } from "../../../domain/booking";
import { BookingResponse } from "../services/response";



export interface BookingRepository{
    bookSpace(newBooking: Booking): Promise<Booking>;
    getPreBookings(spaceId : string,userId: string,providerId : string, bookingDate: Date,moveInTime: string,moveOutTime: string, noOfSpaces:number,totalPrice: number):Promise<BookingResponse>;
    payment(bookingId:string,transactionId:string,totalPrice:number): Promise<string>;
}

