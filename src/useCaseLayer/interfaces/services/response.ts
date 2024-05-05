import { User } from "../../../domainLayer/user";





export interface StoreData {
  _id?: string;
  name: string;
  email: string;
  mobile: string
}

export interface IResponse<T = StoreData | string> {
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




