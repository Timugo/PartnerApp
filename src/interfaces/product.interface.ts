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

export interface Presentation {
  // _id:         string;
  reference:   string;
  status:      string;
  sizes:       string;
  volume:      string;
  weigth:      string;
  description: string;
  price:       number;
  stock:       number;
  file:      string;
}