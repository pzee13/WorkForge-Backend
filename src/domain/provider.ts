import { ObjectId } from "mongoose";


export interface Provider {
    _id?:string;
    name:string;
    email: string;
    mobile? : string
    password: string;
    isBlocked?: boolean;
    wallet?:number;

}