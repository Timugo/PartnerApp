/* React importations */
import React, { useState } from 'react';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
  IonList,
  IonText,
  IonToast,
  IonFooter,
  IonListHeader,
  IonSelect,
  IonSelectOption,
  IonTextarea,
} from '@ionic/react';
import { } from 'ionicons/icons';
/* Css component styles */
import './ProductModal.scss'
/* Capacitor Plugins */
import { Plugins } from '@capacitor/core';
import { Presentation } from '../../../interfaces/product.interface';

const { Clipboard } = Plugins;

/*  Function Properties */
interface OwnProps {
  onDismissModal: () => void;
}
/* Variables props */
interface PageProps {
  presentation : Presentation,
  idProduct :string,
}
/* Union of all properties to inject into component */
type ProductModalProps = OwnProps & PageProps;

/* React Functional Component */
const ProductModal: React.FC<ProductModalProps> = ({ onDismissModal,presentation,idProduct }) => {
  const [ showToast , setShowToast] = useState<boolean>(false);
  const [ showDeleteToast , setShowDeleteToast] = useState<boolean>(false);
  const [ toasMessage , setToastMessage] = useState<string>("");
  /* Product characteristics */
  const [ currentPresentation, setCurrentPresentation ] = useState<Presentation>(presentation)
  /*
    This Function use the clipboard plugin
    from capacitor to copy a specific text
    to the clipboard
  */
  const CopyText=(text : string)=>{
    Clipboard.write({
      string: text
    })
    .then(res=>{
      setToastMessage("Codigo Copiado !")
      setShowToast(true);
    });
  };
  /*
    This function update the information
    of the product when the user click 
    in the button 
  */
  const UpdateProduct = () =>{
    /* Request to the server */
    let presentationUpdated : Presentation = currentPresentation;
    /* Fetch the api to update the product */
    // ProductService.updatePresentation(presentationUpdated)
    //   .then(response =>{
    //     setToastMessage("El producto se actualizo correctamente");
    //     setShowToast(true);
    //   })
    //   .catch(err=>{
    //     console.log(err);
    //     setToastMessage("Ups, ocurrio un error, intenta mas tarde");
    //     setShowToast(true);
    //   });
  }
  /*
    This function make a request to server
    to delete a current product in the modal
  */
  const DeleteProduct =() =>{
    /* Fetch the server to delete a product */
    // ProductService.deleteProduct(product._id!)
    //   .then(response =>{
    //     /* reponse = 2 its a good request */
    //     if(response.data.response === 2){
    //       setToastMessage("El producto se elimino");
    //       setShowToast(true);
    //     }else{
    //       setToastMessage("El producto no se elimino, intenta mas tarde");
    //       setShowToast(true);
    //     }
    //   })
    //   .catch(err=>{
    //     setToastMessage("Ups, ocurrio un error, intenta mas tarde");
    //     setShowToast(true);
    //   });
  }

  return (
    /* Used the <> because only can return a hole component  */
    <>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={onDismissModal}>Volver</IonButton>
          </IonButtons>
          <IonTitle>
            {presentation.reference}
          </IonTitle>
          
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol size="6" offset="3">
              <img src={presentation.urlImg} alt={presentation.description}/>
            </IonCol>
          </IonRow>
        </IonGrid>
        
          
        <IonGrid>
          <IonRow>
            <IonCol size="4">
              <IonItem>
                <IonLabel position="stacked">Referencia</IonLabel>
                <IonInput
                  type="text"
                  className="inputs"
                  autofocus={true}
                  value={presentation.reference}
                  placeholder="referencia"
                  //onIonChange={(e) => setReference(e.detail.value!)}
                ></IonInput>
              </IonItem>
            </IonCol>
            <IonCol size="4">
              <IonItem>
                <IonLabel position="stacked">Precio</IonLabel>
                <IonInput
                  type="number"
                  className="inputs"
                  autofocus={true}
                  value={presentation.price}
                  placeholder="pesos"
                  //onIonChange={(e) => setPrice(parseInt(e.detail.value!))}
                ></IonInput>
              </IonItem>
            </IonCol>
            <IonCol size="4">
              <IonItem>
                <IonLabel position="stacked">Stock</IonLabel>
                <IonInput
                  type="number"
                  className="inputs"
                  autofocus={true}
                  value={presentation.stock}
                  placeholder="Cantidad"
                  //onIonChange={(e) => setStock(parseInt(e.detail.value!))}
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          {/* Row 4  */}
          <IonRow>
            <IonCol size="4">
              <IonItem>
                <IonLabel position="stacked">Peso</IonLabel>
                <IonInput
                  className="inputs"
                  autofocus={true}
                  value={presentation.weigth}
                  placeholder="Kg"
                  //onIonChange={(e) => setWeight(e.detail.value!)}
                ></IonInput>
              </IonItem>
            </IonCol>
            <IonCol size="4">
              <IonItem>
                <IonLabel position="stacked">Volumen</IonLabel>
                <IonInput
                  className="inputs"
                  autofocus={true}
                  value={presentation.volume}
                  placeholder="ejemplo(300ml)"
                  //onIonChange={(e) => setVolumen(e.detail.value!)}
                ></IonInput>
              </IonItem>
            </IonCol>
            <IonCol size="4">
              <IonItem>
                <IonLabel position="stacked">Medidas</IonLabel>
                <IonInput
                  className="inputs"
                  value={presentation.sizes}
                  placeholder="Alto X Ancho x Profundo"
                  //onIonChange={(e) => setVolumex(e.detail.value!)}
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>  
          <IonRow>
            <IonCol>
              <IonList>
                <IonItem>
                  <IonLabel position="stacked">Descripción</IonLabel>
                  <IonTextarea
                    className="inputs"
                    placeholder="Descripvión de la pressentación (maximo 400 palabras)"
                    autoGrow={true}
                    maxlength={400}
                    value={presentation.description}
                    rows={6}
                    cols={20}
                    //onIonChange={(e) => setDescription(e.detail.value!)}
                  ></IonTextarea>
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Estado</IonLabel>
                  <IonTextarea
                    className="inputs"
                    placeholder="(Disponible,NoDisponible)"
                    autoGrow={true}
                    maxlength={400}
                    value={presentation.status}
                    rows={6}
                    cols={20}
                    //onIonChange={(e) => setStatus(e.detail.value!)}
                  ></IonTextarea>
                </IonItem>
              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* Auxiliary toasts */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toasMessage}
          duration={500}
        />
        <IonToast
          isOpen={showDeleteToast}
          onDidDismiss={() => setShowDeleteToast(false)}
          message="Estas Seguro?"
          position="bottom"
          buttons={[
            {
              side: 'start',
              icon: 'closeOutline',
              text: 'Mejor No',
            },
            {
              text: 'Eliminar',
              role: 'Eliminar',
              handler: () => {
                /* If user confirms delete */
                DeleteProduct();
              }
            }
          ]}
        />
      
      </IonContent>
      <IonFooter>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonButton
                onClick={()=>setShowDeleteToast(true)}
                expand="block"
                color="danger"
              >
                Eliminar
              </IonButton>
              
            </IonCol>
            <IonCol>
              <IonButton
                onClick={UpdateProduct}
                expand="block"
              >
                Actualizar
              </IonButton>
              
            </IonCol>
          </IonRow>
          
        </IonGrid>
      </IonFooter>

    </>


  );
};

export default ProductModal;