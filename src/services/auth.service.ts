/* IMport axios to make request to server */
import axios from 'axios';
/* Interfaces */
import { LoginResponse } from "../interfaces/responses.interface"; 
/* Envoriment service class */
import { Enviroment } from "../enviroments/enviroments";
/* Services */
import { LocalStorageService } from "../services/localStorage.service";


export class LoginServices {
  
  static async login(user : string , pass:string) {
    /* Initlize the Envoriment Class to get url */
    let enviroment = new Enviroment();
    /* Save Phone in local storage */
    await LocalStorageService.saveItem('phone',user);
    /* get url from envoriment service */
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