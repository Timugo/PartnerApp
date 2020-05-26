/* IMport axios library to make request */
import axios from 'axios';
/* Enviroments  */
import { Enviroment } from "../../../enviroments/enviroments";
/* Interfaces */
import { UpdatePresentationReponse } from '../interfaces/presentation.interface';
import { Presentation } from '../../../interfaces/product.interface';
/* Services */
import { LocalStorageService } from '../../../services/localStorage.service';



export class PresentationService {
  
  /*
    This function update the product info
  */
  static async updatePresentation(presentation:Presentation){
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
    return  await axios.put<UpdatePresentationReponse>(url,presentation,config);
  }
  /*
    This function Delete a presentation from the databse
  */
  static async deletePresentation(idPresentation : string) {
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
    let url : string = `${BASE_URL}/partner/products/deletePresentation?idPresentation=${idPresentation}`
    //fetch the api
    return  await axios.delete<any>(url,config);
  }
  
}