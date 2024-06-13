
import { Booking } from "../../../../domain/booking";
import BookingModel from "../../model/bookingModel";

// Creating new order
export const bookSpace = async (
  newBooking: Booking,
  bookingModel: typeof BookingModel
): Promise<Booking> => {
  try {
    const booking = await bookingModel.create(newBooking);
    await booking.save();
    return booking;
  } catch (error) {
    throw error;
  }
};
