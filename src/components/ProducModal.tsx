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
  IonToggle,
  IonText,
  IonToast,
  IonFooter,
  IonListHeader,
  IonSelect,
  IonSelectOption,
  IonTextarea,
} from '@ionic/react';

/* Css component styles */
import './ProductModal.scss'
import { Product } from '../interfaces/product.interface';
/* Capacitor Plugins */
import { Plugins } from '@capacitor/core';

const { Clipboard } = Plugins;

/*  Function Properties */
interface OwnProps {
  onDismissModal: () => void;
}
/* Variables props */
interface PageProps {
  
  product : Product
}
/* Union of all properties to inject into component */
type ProductModalProps = OwnProps & PageProps;

/* React Functional Component */
const ProductModal: React.FC<ProductModalProps> = ({ onDismissModal,product }) => {
  const [ showToast , setShowToast] = useState<boolean>(false);
  const [ showDeleteToast , setShowDeleteToast] = useState<boolean>(false);
  const [ toasMessage , setToastMessage] = useState<string>("");
  /* Product characteristics */
  const [ description, setDescription ]  = useState<string>(product.description!)
  const [ price, setPrice ] = useState<number>(product.price!)
  const [ benefits, setBenefits ]  = useState<string>(product.benefits!)
  const [ characteristics, setCharacteristics ] = useState<string>(product.characteristics!)
  const [ img, setImg ] = useState<string>(product.img!)
  const [ deliveryDays, setDeliveryDays ] = useState<number>(product.deliveryDays!)
  const [ name, setName ] = useState<string>(product.name!)
  const [ status, setStatus ] = useState<string>(product.status!)
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
    console.log(product);
  }
  
  return (
    /* Used the <> because only can return a hole component  */
    <>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={onDismissModal}>Cerrar</IonButton>
          </IonButtons>
          <IonTitle>
            {product.name}
          </IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onDismissModal} strong>Aceptar</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol size="6" offset="3">
              <img src="https://metrocolombiafood.vteximg.com.br/arquivos/ids/182931-1000-1000/7703616001531-1.jpg?v=636712344825470000" alt={product.description}/>
            </IonCol>
          </IonRow>
        
        </IonGrid>
        <IonList>
          <IonListHeader>
            <IonLabel>
              Editar la Informacion
            </IonLabel>
          </IonListHeader>
          <IonItem>
              ID: 
              <IonText onClick={()=>CopyText(product._id!)} color="primary">
                <u>{product._id}</u>
              </IonText>
          </IonItem>
          <IonItem>
            <IonLabel>Precio</IonLabel>
            <IonInput value={product.price}   placeholder={product.price?.toString()}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>Nombre</IonLabel>
            <IonInput value={name} placeholder={product.name}></IonInput>
          </IonItem>
          
          <IonItem>
            <IonLabel>Descripcion</IonLabel>
            <IonInput value={description} placeholder={product.description}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>Dias para entrega</IonLabel>
            <IonInput  value={deliveryDays} placeholder={product.deliveryDays?.toString()}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Caracteriticas</IonLabel>
            <IonTextarea 
              className="inputs"
              placeholder={characteristics}
              autoGrow={true}
              maxlength={400}     
              value={characteristics}
              rows={6} cols={20}
              onIonChange={e => setCharacteristics(e.detail.value!)}>
            </IonTextarea>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Beneficios</IonLabel>
            <IonTextarea 
              className="inputs"
              placeholder={benefits}
              autoGrow={true}
              maxlength={400}     
              value={benefits}
              rows={6} cols={20}
              onIonChange={e => setBenefits(e.detail.value!)}>
            </IonTextarea>
          </IonItem>
        </IonList>

        <IonList>
          

          <IonItem>
            <IonLabel>Estado</IonLabel>
            <IonSelect value={status} placeholder="Select One" onIonChange={e => setStatus(e.detail.value)}>
              <IonSelectOption value="Active">Activo</IonSelectOption>
              <IonSelectOption value="Inactive">Inactivo</IonSelectOption>
              <IonSelectOption value="OutStock">Sin Stock</IonSelectOption>
            </IonSelect>
          </IonItem>

          
        </IonList>
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
              icon: 'star',
              text: 'Mejor No',
            },
            {
              text: 'Eliminar',
              role: 'Eliminar',
              handler: () => {
                console.log('Cancel clicked');
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