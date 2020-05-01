
import axios from 'axios';
import { LoginResponse } from "../interfaces/responses.interface"; 
import { Enviroment } from "../enviroments/enviroments";

export class LoginServices {

  constructor(private enviroment : Enviroment){}
  
  static async login(user : string , pass:string) {
    /* Initlize the Envoriment Class to get url */
    let enviroment = new Enviroment();
    const BASE_URL = await enviroment.getUrl();
    /* Body of request */
    let data :any ={
      phone: user,
      password : pass
    }
    /* Config of request */
    let config :any = { 
      headers: {
        'Content-Type': 'application/json',
      },
    }
    //bUild the api
    let url : string = `${BASE_URL}/auth/loginPartner`;

    //fetch the api
    return  await axios.post<LoginResponse>(url,data,config);
    
  }      
  
}