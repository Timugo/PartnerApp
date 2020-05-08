/* Interfaces */
import { Product } from "./product.interface";

export interface LoginResponse {
    response : number,
    content : {
      expiresIn: number,
      token: string            

    }
}

export interface CreateProductResponse {
    response : number,
    content :{
        message: string,
        product : any 
    }
}

export interface ProductResponse {
    _id :string,
    status : string,
    price : number,
    description : string
}
export interface GetProductsReponse {
    response : number,
    content :{
        products : [ProductResponse] 
    }
}
export interface UpdateProductReponse {
    response : number,
    content :{
        product : Product 
    }
}


