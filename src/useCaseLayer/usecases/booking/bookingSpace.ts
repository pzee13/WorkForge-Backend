import ErrorResponse from "../../handlers/errorResponse";
import { BookingRepository } from "../../interfaces/repositries/bookingRepository";
import { IRequestValidator } from "../../interfaces/repositries/validRepository";
import { BookingResponse } from "../../interfaces/services/response";

export const bookSpace = async (
  requestValidator: IRequestValidator,
  bookingRepository: BookingRepository,
  spaceId: string,
  userId: string,
  providerId:string,
  bookingDate: Date,
  moveInTime: string,
  moveOutTime: string,
  chargePerHour: number,
  totalPrice: number
): Promise<BookingResponse> => {
  try {
    // Validate required parameters
    const validation = requestValidator.validateRequiredFields(
      { spaceId, userId, providerId, bookingDate, moveInTime, moveOutTime, chargePerHour, totalPrice },
      [ "spaceId", "userId", "providerId", "bookingDate", "moveInTime", "moveOutTime", "chargePerHour", "totalPrice" ]
    );

    if (!validation.success) {
      throw ErrorResponse.badRequest(validation.message as string);
    }

    // Create the new booking object
    const newBooking = {
      spaceId,
      userId,
      providerId,
      bookingDate,
      moveInTime,
      moveOutTime,
      chargePerHour,
      totalPrice
    };

    // Book the space using the repository
    const createBooking = await bookingRepository.bookSpace(newBooking);

    // Return success response
    return {
      status: 200,
      success: true,
      message: "Please Pay the amount to confirm the booking",
      data: createBooking
    };
  } catch (err) {
    throw err;
  }
};
