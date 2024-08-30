import { Booking } from "../../../domain/booking";
import ErrorResponse from "../../handlers/errorResponse";
import { BookingRepository } from "../../interfaces/repositries/bookingRepository";
import { IRequestValidator } from "../../interfaces/repositries/validRepository";
import { BookingResponse } from "../../interfaces/services/response";
import { IUserRepository } from "../../interfaces/repositries/userRepository";
import { IProviderRepository } from "../../interfaces/repositries/providerRepositry";
import { Types } from "mongoose";

export const cancelBooking = async (
  requestValidator: IRequestValidator,
  bookingRepository: BookingRepository,
  userRepository: IUserRepository,
  providerRepository: IProviderRepository,
  bookingId: string
): Promise<BookingResponse<Booking | null>> => {
  try {
    // Validate required parameters
    const validation = requestValidator.validateRequiredFields(
      { bookingId },
      ["bookingId"]
    );

    if (!validation.success) {
      throw ErrorResponse.badRequest(validation.message as string);
    }

    // Fetch the booking from the repository
    const booking = await bookingRepository.getBookingById(bookingId);

    if (!booking) {
      throw ErrorResponse.notFound(`Booking with ID ${bookingId} not found.`);
    }

    // Check if booking date is in the future (allow cancellation only if booking date is in future)
    const today = new Date();
    if (booking.bookingDate <= today) {
      throw ErrorResponse.badRequest(`Cannot cancel booking as the booking date (${booking.bookingDate.toDateString()}) has passed.`);
    }

    // Update booking details in the repository
    const updatedBooking = await bookingRepository.cancelBooking(bookingId);

    const calculateRefundAmount = (totalPrice: number, bookingDate: Date): number => {
      const today = new Date();
      const oneDayInMs = 24 * 60 * 60 * 1000;
      const oneDayBeforeBooking = new Date(bookingDate.getTime() - oneDayInMs);

      if (today.toDateString() === oneDayBeforeBooking.toDateString()) {
        // Reduce 20% if booking date is the day before
        return totalPrice * 0.8;
      } else {
        // Reduce 5% otherwise
        return totalPrice * 0.95;
      }
    };

    

    // Calculate refund amount (if applicable) and update wallet (assuming this logic exists in the repository)
    const refundAmount = calculateRefundAmount(booking.totalPrice, booking.bookingDate);

    const userId = booking.userId instanceof Types.ObjectId ? booking.userId.toString() : booking.userId;
    const providerId = booking.providerId instanceof Types.ObjectId ? booking.providerId.toString() : booking.providerId;

    await providerRepository.updateProviderWallet(providerId, refundAmount);
    await userRepository.updateUserWallet(userId, refundAmount);
    // Return success response
    return {
      status: 200,
      success: true,
      message: "Booking canceled successfully.",
      data: updatedBooking
    };
  } catch (err) {
    throw err;
  }
};
