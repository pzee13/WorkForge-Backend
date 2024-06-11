export interface User{
    _id?:string;
    name:string;
    email: string;
    mobile? : string
    password: string;
    isBlocked?: boolean;
    wallet?:number;
}