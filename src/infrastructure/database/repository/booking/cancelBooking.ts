import BookingModel from "../../model/bookingModel";

export const cancelBooking = async (
  bookingId: string,
  bookingModel: typeof BookingModel
) => {
  try {
    console.log(`Cancelling booking with ID: ${bookingId}`);

    // Find the booking by its ID
    const booking = await bookingModel.findById(bookingId);

    if (!booking) {
      throw new Error(`Booking with ID ${bookingId} not found`);
    }

    // Update booking properties
    booking.isPaid = false;
    booking.totalPrice = 0;

    // Save the updated booking
    await booking.save();

    // Return the updated booking object
    return booking;
  } catch (error) {
    throw error;
  }
};