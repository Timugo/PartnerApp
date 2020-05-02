/* IMport axios library to make request */
import axios from 'axios';
/* Enviroments  */
import { Enviroment } from "../enviroments/enviroments";
/* Interfaces */
import { Product } from "../interfaces/product.interface";
import { CreateProductResponse } from "../interfaces/responses.interface";
/* Services */
import { LocalStorageService } from './localStorage.service';



export class ProductService {
  
  static async createProduct(product : Product) {
    console.log(product);
    /* Build the base Url*/
    /* Initlize the Envoriment Class to get url */
    let enviroment = new Enviroment();
    /* get url from envoriment service */
    const BASE_URL = await enviroment.getUrl();
    const jwt : any = await LocalStorageService.getItem('jwt');
    console.log(jwt);
    let config :any = { 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt.value}`
      },
    }
    /* Endpoint Url */
    let url : string = `${BASE_URL}/partner/products/create`
    //fetch the api
    return  await axios.post<CreateProductResponse>(url,product,config);
    
  }      
  
}