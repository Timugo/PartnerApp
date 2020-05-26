/* IMport axios library to make request */
import axios from 'axios';
/* Enviroments  */
import { Enviroment } from "../enviroments/enviroments";
/* Interfaces */
import { Product, Presentation } from "../interfaces/product.interface";
import { CreateProductResponse, GetProductsReponse, UpdateProductReponse, GenericResponse } from "../interfaces/responses.interface";
/* Services */
import { LocalStorageService } from './localStorage.service';



export class ProductService {
  
  static async createProduct(dataEncode : FormData) {
    /* Build the base Url*/
    /* Initlize the Envoriment Class to get url */
    let enviroment = new Enviroment();
    /* get url from envoriment service */
    const BASE_URL = await enviroment.getUrl();
    const jwt : any = await LocalStorageService.getItem('jwt');
    let config :any = { 
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${jwt.value}`
      },
    }
    /* Endpoint Url */
    let url : string = `${BASE_URL}/partner/products/create`
    //fetch the api
    return  await axios.post<CreateProductResponse>(url,dataEncode,config);
    
  }
  /*
    This function returns all the products 
    of a partner
  */
  static async getProducts() {
    
    const phonePartner = await LocalStorageService.getItem('phone');
    /* Build the base Url*/
    /* Initlize the Envoriment Class to get url */
    let enviroment = new Enviroment();
    /* get url from envoriment service */
    const BASE_URL = await enviroment.getUrl();
    const jwt : any = await LocalStorageService.getItem('jwt');
    //console.log(jwt);
    let config :any = { 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt.value}`
      },
    };
    /* Endpoint Url */
    let url : string = `${BASE_URL}/partner/products/getProducts?phone=${phonePartner.value}`
    //fetch the api
    return  await axios.get<GetProductsReponse>(url,config);
    
  }
  /*
    This function update the product info
  */
  static async updateProduct(product:Product){
    /* get url from envoriment service */
    let enviroment = new Enviroment();
    const BASE_URL = await enviroment.getUrl();
    /* Get the JWT from local storage */
    const jwt : any = await LocalStorageService.getItem('jwt');
    let config :any = { 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt.value}`
      },
    };
    /* Endpoint Url */
    let url : string = `${BASE_URL}/partner/products/update`
    //fetch the api
    return  await axios.put<UpdateProductReponse>(url,product,config);
  }
  /*
    This function Delete a product from the databse
  */
  static async deleteProduct(idProduct : string) {
    /* Build the base Url*/
    /* Initlize the Envoriment Class to get url */
    let enviroment = new Enviroment();
    /* get url from envoriment service */
    const BASE_URL = await enviroment.getUrl();
    const jwt : any = await LocalStorageService.getItem('jwt');
    //console.log(jwt);
    let config :any = { 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt.value}`
      },
    };
    /* Endpoint Url */
    let url : string = `${BASE_URL}/partner/products/delete?idProduct=${idProduct}`
    //fetch the api
    return  await axios.delete<GenericResponse>(url,config);
  }

  static async createPresentation(dataEncode : FormData,idProduct: string) {
    /* Build the base Url*/
    /* Initlize the Envoriment Class to get url */
    let enviroment = new Enviroment();
    /* get url from envoriment service */
    const BASE_URL = await enviroment.getUrl();
    const jwt : any = await LocalStorageService.getItem('jwt');
    const idPartner  = await LocalStorageService.getItem('id');

    let config :any = { 
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${jwt.value}`
      },
    }
    /* Endpoint Url */
    let url : string = `${BASE_URL}/partner/products/presentations/new?idProduct=${idProduct}&idPartner=${idPartner.value}}`
    //fetch the api
    return  await axios.post<CreateProductResponse>(url,dataEncode,config);
    
  }
}