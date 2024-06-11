import BookingModel from "../../model/bookingModel";

export const payment = async (
  bookingId: string,
  transactionId: string,
  amount: number,
  bookingModel: typeof BookingModel
): Promise<string> => {
  try {
    const booking = await bookingModel.findOne({ _id: bookingId });
    if (booking) {
      booking.isPaid = true;
      booking.paymentId = transactionId;
      booking.totalPaid = amount;
      booking.paidDate = new Date(); // Set the current date here
      await booking.save();
      return "Payment successfully completed";
    } else {
      return "Something went wrong";
    }
  } catch (error) {
    throw error;
  }
};
