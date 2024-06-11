import { User } from "../../../domain/user";
import { Admin } from "../../../domain/admin";
import { Provider } from "../../../domain/provider"
import { WorkSpace } from "../../../domain/workSpace";
import { SpaceType } from "../../../domain/spaceType";
import { Booking } from "../../../domain/booking";




export interface StoreData {
  _id?: string;
  name: string;
  email: string;
  
}



export interface IResetPassword {
  id:string
  password : string;
}


export interface IResponse<T = StoreData | string > {
  status: number;
  success: boolean;
  message?: string;
  data?: T;
  token? : string
}

export interface UserResponse<T = User| User[]|string> {
  status: number;
  success: boolean;
  message?: string;
  data?: T;
  token? : string
} 


export interface ILoginResponse<T = User | string | Admin | Provider> {
  status: number;
  success: boolean;
  message?: string;
  token?: string
  data?:{
    name:string;
    role:string;
    email:string;
  } ;
}


export interface SpaceResponse<T = WorkSpace| WorkSpace[]|string> {
  status: number;
  success: boolean;
  message?: string;
  data?: T;
  total?: number;
}

export interface SpaceTypeResponse<T = SpaceType| SpaceType[]|string |undefined> {
  status: number;
  success: boolean;
  message?: string;
  data?: T;
}

export interface BookingResponse<T = Booking| Booking[]|string> {
  status: number;
  success: boolean;
  message?: string;
  data?: T;
}


export interface IUserResponse<T = User| User[]|string> {
  status: number;
  success: boolean;
  message?: string;
  data?: T;
  token? : string
}

export interface IProviderResponse<T = Provider| Provider[]|string> {
  status: number;
  success: boolean;
  message?: string;
  data?: T;
  token? : string
}
