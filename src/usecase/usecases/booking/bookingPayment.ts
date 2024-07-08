import { IAdminRepository } from "../../interfaces/repositries/adminRepository";
import { BookingRepository } from "../../interfaces/repositries/bookingRepository";
import { IProviderRepository } from "../../interfaces/repositries/providerRepositry";

export const paymentConfirmation = async(
    bookingRepository:BookingRepository,
    providerRepository:IProviderRepository,
    adminRepository:IAdminRepository,
    transactionId:string,
    bookingId:string,
    workerId:string,
    amount:number,
)=>{
    try{
        console.log("payment booking updated")
        console.log("hai booking")
        await bookingRepository.payment(bookingId,transactionId,amount)
        const adminProfit =Math.round(amount * 5 / 100)
        const providerAmount = amount - adminProfit
        await providerRepository.profitToWallet(workerId,providerAmount)
        await adminRepository.profitToWallet(adminProfit)
        
    }catch(err){
        console.log(err)

        throw err
    }

}