import IStripe from "../../useCaseLayer/interfaces/services/IStripe";
import { IResponse } from "../../useCaseLayer/interfaces/services/response"
import { Req } from "../types/expressTypes";

import dotenv from "dotenv";
import Stripe from "stripe";
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string,{
    apiVersion: "2024-04-10"
});

class StripeService implements IStripe {

    async  createPaymentIntent(
      amount:number,
      bookingId:string,
      workerId:string
    ):Promise<IResponse> {
      console.log("here");
      
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'inr',
              product_data: {
                name: 'Service Payment is',
              },
              unit_amount: amount *100,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: 'http://localhost:4000/profile/Bookings',
        cancel_url: 'http://localhost:4000/profile/Bookings',
        metadata: { 
          bookingId,
          amount,
          workerId
        },
      });
        return {
          success:true,
          status:200,
          data:session.id
        }
  }

  async paymentSuccess(req:Req){
    const payload = req.body;     
    const payloadString = JSON.stringify(payload, null, 2);
    const signature = req.headers["stripe-signature"];

    if (typeof signature !== "string") {
      return false;
    }

    const endpointSecret= 'whsec_dff92d8ed6a4e81f90ee2455c377312e633bc1083ad1ece9d2d2f82ad8cdc960';
    const header = stripe.webhooks.generateTestHeaderString({
      payload:payloadString,
      secret:endpointSecret
    });

    let event
       event = stripe.webhooks.constructEvent(
      payloadString,
      header,
      endpointSecret
    );
    if (event.type == "charge.succeeded") {
      return true;
    } else {
      return false;
    }

  }
}

export default StripeService