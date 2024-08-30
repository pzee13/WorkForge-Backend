import BookingModel from "../../model/bookingModel";

export const getBookingById = async (
    bookingId: string,
    bookingModel: typeof BookingModel
  ) => {
    try {
      console.log("Finding booking by ID");
      const existingBooking = await bookingModel.findById(bookingId);
      return existingBooking;
    } catch (error) {
      throw error;
    }
  };
  