
export interface OrderRespository {
  _id:string,
  status:string,
  logPayment:[any],
  updated:string,
  nameClient:string,
  phoneClient:string,
  commission:number,
  address:string,
  dateBeginOrder:string,
  hourStart:string,
  products:[ProductOrderRepository],
  totalAmount:number,
  paymentMethod:{
    type:string,
    _id:string,
    id:string,
  }
  history:{
    date:string,
    description:string,
  }
}

export interface ProductOrderRepository {
  _id:string;
  description : string ;
  benefits : string;
  characteristics : string;
  img? : string;
  file : any;
  deliveryDays : number;
  name : string
  status? : string
  presentations: [PresentationOrderRepository];
}

export interface PresentationOrderRepository {
  _id:string;
  reference:string;
  status:string;
  sizes:string;
  volume:string;
  weigth:string;
  description:string;
  price:number;
  stock:number;
  units:number;
  urlImg:string;
}
