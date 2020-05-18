export interface Product {
  _id?:string;
  description : string ;
  benefits : string;
  characteristics : string;
  img? : string;
  file : any;
  deliveryDays : number;
  name : string
  status? : string
}