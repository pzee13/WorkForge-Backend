import BookingModel from "../../../infrastructure/database/model/bookingModel";
import { BookingResponse } from "../../interfaces/services/response";

export const getBookings = async (): Promise<BookingResponse> => {
    try {
      const bookings = await BookingModel.find({ isPaid: true });
      return {
        status: 200,
        success: true,
        data: bookings,
      };
    } catch (error) {
      throw new Error(`Error fetching bookings: ${error}`);
    }
  };