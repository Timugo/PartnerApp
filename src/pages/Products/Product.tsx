import React from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton } from '@ionic/react';
import { Product } from "../../interfaces/product.interface";
interface CustomProps{
  
  fieldName : string
}

class ProductPage extends React.Component<any,any> {
  render() {
    return(
      <div>Hola</div>
    )
  }
}
// const ProductPage: React.FC<CustomProps> = (CustomProps) => {

//   console.log("Hola");
//   return(
//     <IonPage>
//       <IonHeader>
//         <IonToolbar>
//           <IonButtons slot="start">
//             <IonBackButton text="Volver" defaultHref="/home" />
//           </IonButtons>
//         </IonToolbar>
//       </IonHeader>
//       <IonContent>
//         Hola Amigazos
//         {CustomProps.fieldName}
      
//       </IonContent>

//     </IonPage>
//   )
// };
export default ProductPage;