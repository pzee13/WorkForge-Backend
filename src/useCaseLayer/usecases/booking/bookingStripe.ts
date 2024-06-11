

import IStripe from "../../interfaces/services/IStripe";
import { IResponse } from "../../interfaces/services/response";

import ErrorResponse from "../../handlers/errorResponse";

export const paymentStripe = async(
    stripe:IStripe,
    amount:number,
    bookingId:string,
    providerId:string,
):Promise<IResponse>=>{
    try{
            const res = await stripe.createPaymentIntent(amount,bookingId,providerId)
            if(res){
                return {
                    status: 200,
                    success: true,
                    message: 'created',
                    data:res.data
                }
            }
            throw ErrorResponse.badRequest('Failed to create payment intent');
    }catch(error){
        console.log(error)

        throw error
    }
}