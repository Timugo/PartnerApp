import { Presentation } from "../../../interfaces/product.interface";

export interface UpdatePresentationReponse {
  response : number,
  content :{
      presentation : Presentation
  }
}