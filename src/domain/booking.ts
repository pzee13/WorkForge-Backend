import { Types } from "mongoose";

export interface Booking {
    id?: string;
    spaceId:Types.ObjectId | string;
    providerId?: Types.ObjectId | string;
    userId: Types.ObjectId | string;
    bookingDate: Date;
    paidDate?: Date;
    moveInTime: string;
    moveOutTime: string;
    chargePerHour: number;
    totalPrice: number;
    totalPaid?:number;
    paymentId?:string;
    isPaid?:boolean;
  }