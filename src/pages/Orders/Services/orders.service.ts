/* IMport axios to make request to server */
import axios from 'axios';
/* Interfaces */
import { 
  GetOrdersResponseRepository,
  ChangeOrderStatusRespository
} from '../interfaces/responses.interface';
/* Envoriment service class */
import { Enviroment } from "../../../enviroments/enviroments";
/* Services */
import { LocalStorageService } from "../../../services/localStorage.service";
/* */


export class OrderServices {
  
  static async getActiveOrders() {
    /* Initlize the Envoriment Class to get url */
    const enviroment = new Enviroment();
    /* Save Phone in local storage */
    const phone = await LocalStorageService.getItem('phone');
    /* get url from envoriment service */
    const BASE_URL = await enviroment.getUrl();
    /* Config of request */
    let config :any = { 
      headers: {
        'Content-Type': 'application/json',
      },
    }
    //bUild the api
    let url : string = `${BASE_URL}/orders-pets/getAvailableOrders?phone=${phone.value}`;

    //fetch the api
    return  await axios.get<GetOrdersResponseRepository>(url);
    
  }      
  
  static async changeOrderStatus(idOrder : string, status:string) {
    /* Initlize the Envoriment Class to get url */
    const enviroment = new Enviroment();
    /* Save Phone in local storage */
    //const phone = await LocalStorageService.getItem('phone');
    /* get url from envoriment service */
    const BASE_URL = await enviroment.getUrl();
    /* Config of request */
    let config :any = { 
      headers: {
        'Content-Type': 'application/json',
      },
    }
    /* BOdy */
    const body ={
      idOrder,
      status
    }
    //bUild the api
    let url : string = `${BASE_URL}/orders-pets/changeStatus`;

    //fetch the api
    return  await axios.put<ChangeOrderStatusRespository>(url);
    
  }
  
  static async getTakenOrders() {
    /* Initlize the Envoriment Class to get url */
    const enviroment = new Enviroment();
    /* Save Phone in local storage */
    const phone = await LocalStorageService.getItem('phone');
    /* get url from envoriment service */
    const BASE_URL = await enviroment.getUrl();
    /* Config of request */
    let config :any = { 
      headers: {
        'Content-Type': 'application/json',
      },
    }
    //bUild the api
    let url : string = `${BASE_URL}/orders-pets/getTakenOrders?phone=${phone.value}`;

    //fetch the api
    return  await axios.get<GetOrdersResponseRepository>(url);
    
  } 

}