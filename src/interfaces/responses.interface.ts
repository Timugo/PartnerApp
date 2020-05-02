export interface LoginResponse {
    token : string
}

export interface CreateProductResponse {
    response : number,
    content :{
        message: string,
        product : any 
    }
}


