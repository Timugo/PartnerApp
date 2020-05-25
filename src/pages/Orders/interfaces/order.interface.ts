import { Product } from "../../../interfaces/product.interface";

export interface OrderRespository {
  _id:string,
  status:string,
  logPayment:[any],
  updated:string,
  nameClient:string,
  commission:number,
  address:string,
  dateBeginOrder:string,
  hourStart:string,
  products:[Product],
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