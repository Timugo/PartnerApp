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
  IonModal,
} from '@ionic/react';
import { useHistory } from 'react-router';
/* Css component styles */
import './ProductModal.scss'
/* Interfaces */
import { Product, Presentation } from '../interfaces/product.interface';
/* Capacitor Plugins */
import { Plugins } from '@capacitor/core';
import { ProductService } from '../Services/product.service';
/* Components */
import PresentationModal from "./PresentationModal";
/* Plugins  */
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
  const history = useHistory();

  const [ showToast , setShowToast] = useState<boolean>(false);
  const [ showDeleteToast , setShowDeleteToast] = useState<boolean>(false);
  const [ toasMessage , setToastMessage] = useState<string>("");
  /* Product characteristics */
  const [ description, setDescription ]  = useState<string>(product.description!)
  //const [ price, setPrice ] = useState<number>(product.price!)
  const [ idProduct, setIdProduct ]  = useState<string>(product._id!)
  const [ benefits, setBenefits ]  = useState<string>(product.benefits!)
  const [ characteristics, setCharacteristics ] = useState<string>(product.characteristics!)
  const [ img, setImg ] = useState<string>(product.img!)
  const [ deliveryDays, setDeliveryDays ] = useState<number>(product.deliveryDays!)
  const [ name, setName ] = useState<string>(product.name!)
  const [ status, setStatus ] = useState<string>(product.status!)
  const [ currenProduct, setCurrentProduct ] = useState<Product>(product);

  const [ selectPresentation, setSelectPresentation] = useState<Presentation>(product.presentations[0]);
  const [ showPresentationModal, setShowPresentationModal] = useState<boolean>(false);
  const [ showCreatePresentation, setShowCreatePresentation] = useState<boolean>(false);

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
    let productUpdated : Product = currenProduct;
    /* Fetch the api to update the product */
    ProductService.updateProduct(productUpdated)
      .then(response =>{
        setToastMessage("El producto se actualizo correctamente");
        setShowToast(true);
      })
      .catch(err=>{
        console.log(err);
        setToastMessage("Ups, ocurrio un error, intenta mas tarde");
        setShowToast(true);
      });
  }
  /*
    This function make a request to server
    to delete a current product in the modal
  */
  const DeleteProduct =() =>{
    /* Fetch the server to delete a product */
    ProductService.deleteProduct(product._id!)
      .then(response =>{
        /* reponse = 2 its a good request */
        if(response.data.response === 2){
          setToastMessage("El producto se elimino");
          setShowToast(true);
        }else{
          setToastMessage("El producto no se elimino, intenta mas tarde");
          setShowToast(true);
        }
      })
      .catch(err=>{
        setToastMessage("Ups, ocurrio un error, intenta mas tarde");
        setShowToast(true);
      });
  }
  const OpenModalPresentation = ()=>{
   
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
              <img src={product.img} alt={product.description}/>
            </IonCol>
          </IonRow>
        

          <IonRow>
            <IonCol>
              <IonText color="medium">
                <h3>Toca una presentacion para editarla o verla</h3>
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow>
          {
            product.presentations.map((presentation,index)=>{
              return (
                <IonCol size="3" key={index}>
                  <img
                    src={presentation.urlImg}
                    onClick={() => {
                      /* If click on the presentation then redirect to prsentation modal */
                      setSelectPresentation(presentation);
                      setShowPresentationModal(true);
                    }}
                  ></img>
                </IonCol>
              );
            })
          }
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton 
                size="small"
                color="secondary"
                fill="outline"
                onClick={()=>{
                  history.push(`/products/Presentation/${product._id}`);
                  onDismissModal();
                }} 
                expand="block">
                Agregar Presentacion
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>  
        
          
        <IonList>
          <IonListHeader>
            <IonLabel>
              Editar la Informacion del Producto
            </IonLabel>
          </IonListHeader>
          <IonItem>
              ID: 
              <IonText onClick={()=>CopyText(product._id)} color="primary">
                <u>{product._id}</u>
              </IonText>
          </IonItem>
          <IonItem>
            <IonLabel>Nombre</IonLabel>
            <IonInput value={name} onIonChange={(e )=>{ product.name = e.detail.value! /*setName(e.detail.value!)*/}} placeholder={product.name}></IonInput>
          </IonItem>
          
          <IonItem>
            <IonLabel>Descripcion</IonLabel>
            <IonInput value={description} onIonChange={e => setDescription(e.detail.value!)} placeholder={product.description}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>Dias para entrega</IonLabel>
            <IonInput  value={deliveryDays} onIonChange={e => setDeliveryDays(parseInt(e.detail.value!))} placeholder={product.deliveryDays?.toString()}></IonInput>
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
          <IonItem>
            <IonLabel>Estado</IonLabel>
            <IonSelect value={status} placeholder="Select One" onIonChange={e => setStatus(e.detail.value)}>
              <IonSelectOption value="Active">Activo</IonSelectOption>
              <IonSelectOption value="Inactive">Inactivo</IonSelectOption>
              <IonSelectOption value="OutStock">Sin Stock</IonSelectOption>
            </IonSelect>
          </IonItem>

        </IonList>

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
        <IonModal
          isOpen={showPresentationModal}
          onDidDismiss={() => setShowPresentationModal(false)}
          swipeToClose={true}
          //presentingElement={pageRef.current!} //ios 13 cards modal style
          //cssClass="Product"
          >
            {/*
              To see wich properties need to pass to modal 
              see the properties in ProductModal component
            */}
          <PresentationModal
            onDismissModal={() => setShowPresentationModal(false)}
            presentation={selectPresentation!}
            idProduct={product._id}
          /> 
        </IonModal>    
        
      </IonContent>
      <IonFooter>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonButton
                onClick={()=>setShowDeleteToast(true)}
                expand="block"
                fill="clear"
                color="medium">
                Eliminar
              </IonButton>
              
            </IonCol>
            <IonCol>
              <IonButton
                onClick={UpdateProduct}
                expand="block">
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