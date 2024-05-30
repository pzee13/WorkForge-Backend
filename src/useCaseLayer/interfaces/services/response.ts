import { User } from "../../../domainLayer/user";
import { Admin } from "../../../domainLayer/admin";
import { Provider } from "../../../domainLayer/provider"
import { WorkSpace } from "../../../domainLayer/workSpace";




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
