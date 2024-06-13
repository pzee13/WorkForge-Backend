
import { IAdminRepository } from "../interfaces/repositries/adminRepository";
import { BookingRepository } from "../interfaces/repositries/bookingRepository";
import { IRequestValidator } from "../interfaces/repositries/validRepository";
import { IUserRepository } from "../interfaces/repositries/userRepository";
import { SpaceRepository } from "../interfaces/repositries/spaceRepository";
import { IProviderRepository } from "../interfaces/repositries/providerRepositry";
import { paymentStripe } from "./booking/bookingStripe";
import IStripe from "../interfaces/services/IStripe";
import { bookSpace } from "./booking/bookingSpace"
import { getPreBookings } from "./booking/getPreBookings"
import { paymentConfirmation } from "./booking/bookingPayment";

export class BookingUseCase {
    private readonly bookingRepository: BookingRepository;
    private readonly providerRepository: IProviderRepository;
    private readonly adminRepository: IAdminRepository;
    private readonly requestValidator: IRequestValidator;
    private readonly stripe : IStripe
    constructor(
      bookingRepository: BookingRepository,
      providerRepository: IProviderRepository,
      adminRepository: IAdminRepository,
      requestValidator: IRequestValidator,
      stripe: IStripe
    ) {
      this.bookingRepository = bookingRepository;
      this.providerRepository = providerRepository;
      this.adminRepository = adminRepository;
      this.requestValidator = requestValidator;
      this.stripe = stripe
    }
  
    //to book service
    async bookSpace({
        spaceId,
        userId,
        providerId,
        bookingDate,
        moveInTime,
        moveOutTime,
        chargePerHour,
        totalPrice
    }: {
        spaceId: string,
        userId: string,
        providerId: string,
        bookingDate: Date,
        moveInTime: string,
        moveOutTime: string,
        chargePerHour: number,
        totalPrice: number
    }) {
      return bookSpace(
        this.requestValidator,
        this.bookingRepository,
        spaceId,
        userId,
        providerId,
        bookingDate,
        moveInTime,
        moveOutTime,
        chargePerHour,
        totalPrice
      );
    }

    async createPayment({amount,bookingId,providerId}:{ amount:number,bookingId:string,providerId:string}){
        return paymentStripe(this.stripe,amount,bookingId,providerId)
    }

    async getPreBookings({
        spaceId, userId, providerId,  bookingDate, moveInTime, moveOutTime, totalPrice
      }: {
        spaceId : string,
        userId: string,
        providerId : string,
        bookingDate: Date,
        moveInTime: string,
        moveOutTime: string,
        totalPrice: number
      }) {
        return getPreBookings(
          this.requestValidator,
          this.bookingRepository,
          spaceId, userId, providerId,  bookingDate, moveInTime, moveOutTime, totalPrice
        );
      }


      async paymentConfirmation({transactionId,bookingId,providerId,amount}:
        {transactionId:string,bookingId:string,providerId:string,amount:number}){
          return paymentConfirmation(this.bookingRepository,this.providerRepository,this.adminRepository
            ,transactionId,bookingId,providerId,amount)
      }
    

}
  