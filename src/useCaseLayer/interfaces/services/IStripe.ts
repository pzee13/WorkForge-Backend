import { Req } from "../../../infrastructureLayer/types/expressTypes";
import { IResponse } from "./response";

interface IStripe {
    createPaymentIntent(amount:number,bookingId:string,workerId:string):Promise<IResponse>
    paymentSuccess(request:Req):Promise<boolean|null>
}


export default IStripe