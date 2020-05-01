
import axios from 'axios';
import { LoginResponse } from "../interfaces/responses.interface"; 
import { Enviroment } from "../enviroments/enviroments";



export class LoginServices {
   
  constructor(private envoriment : Enviroment){}

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
    const baseUrl = await this.envoriment.getUrl();

    let url : string = `${baseUrl}/auth/loginPartner`
    console.log(url);
    //fetch the api
    //return  await axios.post<LoginResponse>(url,data,config);
    
  }      
  
}