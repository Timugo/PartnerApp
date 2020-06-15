import { Presentation } from "./product.interface";

export interface UpdatePresentationReponse {
  response : number,
  content :{
      presentation : Presentation
  }
}