
import axios from 'axios';
import { LoginResponse } from "../interfaces/responses.interface"; 


const  endpoint  =  `https://sandboxv2.timugo.com`;

export class LoginServices {

    async login(user : string , pass:string) {
      let data :any ={
        phone: user,
        password : pass
      }
      let config :any = { 
        headers: {
         'Content-Type': 'application/json',
        },
      }
      let url : string = `${endpoint}/auth/loginPartner`
      //fetch the api
      return  await axios.post<LoginResponse>(url,data,config);
      
    }      
  
}