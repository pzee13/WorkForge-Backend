import { BookingResponse } from "../../../../useCaseLayer/interfaces/services/response";
import BookingModel from "../../model/bookingModel";

export const getPreBookings = async (
  spaceId: string,
  userId: string,
  providerId: string,
  bookingDate: Date,
  moveInTime: string,
  moveOutTime: string,
  totalPrice: number,
  bookingModel: typeof BookingModel
): Promise<BookingResponse> => {
  try {
    const preBooking = await bookingModel.findOne({
      spaceId: spaceId,
      isPaid: false,
      providerId: providerId,
      userId: userId,
      bookingDate: bookingDate,
      moveInTime: moveInTime,
      moveOutTime: moveOutTime,
      totalPrice: totalPrice
    }).sort({ createdAt: -1 }).exec(); // Sort by createdAt in descending order and get the first document

    if (!preBooking) {
      return {
        status: 404,
        success: false,
        message: 'No pre-booking found',
      };
    }

    return {
      status: 200,
      success: true,
      message: 'Pre-booking retrieved successfully',
      data: preBooking
    };
  } catch (err) {
    throw err;
  }
};
