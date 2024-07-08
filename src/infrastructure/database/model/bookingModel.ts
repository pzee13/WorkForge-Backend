// models/booking.model.ts

import mongoose, { Document, Model, Schema } from "mongoose";
import { Booking } from "../../../domain/booking";

const BookingSchema: Schema<Booking & Document> = new Schema(
    {
        spaceId: { type: Schema.Types.ObjectId, ref: "Space", required: true },
        providerId: { type: Schema.Types.ObjectId, ref: "Provider", default: null  },
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        bookingDate: { type: Date, required: true },
        paidDate: { type: Date, default: Date.now() },
        moveInTime: { type: String, required: true },
        moveOutTime: { type: String, required: true },
        chargePerHour: { type: Number, required: true },
        noOfSpaces: {type: Number, required:true },
        totalPrice: { type: Number, required: true },
        totalPaid: { type: Number, default:0 },
        paymentId: { type: String, default:"" },
        isPaid: { type: Boolean, default: false}
    },
    {
        timestamps: true,
    }
);

const BookingModel: Model<Booking & Document> = mongoose.model<Booking & Document>(
    "Booking",
    BookingSchema
);

export default BookingModel;
