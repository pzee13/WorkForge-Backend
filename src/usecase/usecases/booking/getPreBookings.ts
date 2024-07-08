import ErrorResponse from "../../handlers/errorResponse";
import { BookingRepository } from "../../interfaces/repositries/bookingRepository";
import { IRequestValidator } from "../../interfaces/repositries/validRepository";
import { BookingResponse } from "../../interfaces/services/response";

export const getPreBookings = async (
  requestValidator: IRequestValidator,
  bookingRepository: BookingRepository,
  spaceId: string,
  userId: string,
  providerId: string,
  bookingDate: Date,
  moveInTime: string,
  moveOutTime: string,
  noOfSpaces: number,
  totalPrice: number
): Promise<BookingResponse> => {
  try {
    // Validate required parameters
    const validation = requestValidator.validateRequiredFields(
      { spaceId, userId, providerId, bookingDate, moveInTime, moveOutTime, noOfSpaces, totalPrice },
      ["spaceId", "userId", "providerId", "bookingDate", "moveInTime", "moveOutTime", "noOfSpaces", "totalPrice"]
    );

    if (!validation.success) {
      throw ErrorResponse.badRequest(validation.message as string);
    }

    const booking = await bookingRepository.getPreBookings(
      spaceId,
      userId,
      providerId,
      bookingDate,
      moveInTime,
      moveOutTime,
      noOfSpaces,
      totalPrice
    );
    return booking;
  } catch (err) {
    throw err;
  }
};
