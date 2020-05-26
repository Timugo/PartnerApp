import { OrderRespository } from "./order.interface";

export interface GetOrdersResponseRepository {
  response : number,
  content : {
    orders : [OrderRespository],
    message : string
  }
}

export interface ChangeOrderStatusRespository {
  response : number,
  content : {
    order : [OrderRespository],
    message : string
  }
}