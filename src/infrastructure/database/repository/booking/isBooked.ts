// import BookingModel from "../../model/bookingModel";

// import SpaceModel from "../../model/spaceModel";


// export const isBooked = async (
//   spaceId: string,
//   bookingDate: Date,
//   moveInTime: string,
//   moveOutTime: string,
//   noOfSpaces: number,
//   bookingModel: typeof BookingModel,
//   spaceModel:typeof SpaceModel
// ): Promise<boolean> => {
//   try {
//     // Find existing bookings for the given spaceId on the same date and overlapping time
//     const existingBookings = await bookingModel.find({
//       spaceId,
//       bookingDate,
//       $or: [
//         {
//           moveInTime: { $lt: moveOutTime },
//           moveOutTime: { $gt: moveInTime }
//         }, 
//         {
//           moveInTime: moveInTime,
//           moveOutTime: moveOutTime
//         }
//       ] 
//     });

//     // Calculate total booked spaces for the specified time interval
//     const totalBookedSpaces = existingBookings.reduce((acc, booking) => acc + booking.noOfSpaces, 0);

//     // Retrieve total available spaces for the given spaceId
//     const space = await spaceModel.findById(spaceId);
//     console.log("hai hai hi hoi",space)
//     console.log("totalSpaceBooked",totalBookedSpaces)
//     console.log("totalAvailableSoace",space?.availableSpaces)
//     const availableSpaces = space ? space.availableSpaces - totalBookedSpaces : 0;
//     console.log("availzbe",availableSpaces)
//     // Check if required noOfSpaces can be accommodated
//     return availableSpaces > noOfSpaces;
//   } catch (error) {
//     console.error("Error checking booking status:", error);
//     throw error;
//   }
// };


import BookingModel from "../../model/bookingModel";
import SpaceModel from "../../model/spaceModel";

export const isBooked = async (
  spaceId: string,
  bookingDate: Date,
  moveInTime: string,
  moveOutTime: string,
  noOfSpaces: number,
  bookingModel: typeof BookingModel,
  spaceModel: typeof SpaceModel
): Promise<boolean> => {
  try {
    // Find existing bookings for the given spaceId on the same date and overlapping time
    const existingBookings = await bookingModel.find({
        spaceId,
        bookingDate,
        isPaid: true,
        $or: [
          {
            moveInTime: { $lt: moveOutTime },
            moveOutTime: { $gt: moveInTime }
          },
          // Existing booking fully encloses the new booking
          {
            moveInTime: { $lte: moveInTime },
            moveOutTime: { $gte: moveOutTime }
          },
          // Existing booking starts at the same time and ends at the same time as the new booking
          {
            moveInTime,
            moveOutTime
          },
          // Existing booking starts before and ends after the new booking starts and ends
          {
            moveInTime: { $lt: moveInTime },
            moveOutTime: { $gt: moveOutTime }
          }
        ]
      });

      console.log("existingBookings",existingBookings)

        const totalBookedSpaces = existingBookings.reduce((acc, booking) => acc + booking.noOfSpaces, 0);

    // Retrieve total available spaces for the given spaceId
    const space = await spaceModel.findById(spaceId);

    if (!space) {
      console.error("Space not found");
      return false;
    }

    const availableSpaces = space.availableSpaces - totalBookedSpaces;
    console.log("availableSpaces", availableSpaces);
    console.log("totalBookedSpaces",totalBookedSpaces)
    console.log("noOfSpaces",noOfSpaces)

    // Check if the required noOfSpaces can be accommodated
    return availableSpaces < noOfSpaces;
  } catch (error) {
    console.error("Error checking booking status:", error);
    throw error;
  }
};

