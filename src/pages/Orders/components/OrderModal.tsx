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
  IonIcon,
} from '@ionic/react';
/* Css component styles */
import './OrderModal.scss';
/* Capacitor Plugins */
import { Plugins } from '@capacitor/core';
/* Components */
import { Redirect, useHistory } from 'react-router';
/* Interfaces */
import { OrderRespository } from '../interfaces/order.interface';
import { atCircle, star, phoneLandscape, call } from 'ionicons/icons';
import NumberFormat from 'react-number-format';

const { Clipboard } = Plugins;

/*  Function Properties */
interface OwnProps {
  onDismissModal: () => void;
}
/* Variables props */
interface PageProps {
  order : OrderRespository
}
/* Union of all properties to inject into component */
type ProductModalProps = OwnProps & PageProps;

/* React Functional Component */
const OrderModal: React.FC<ProductModalProps> = ({ onDismissModal,order }) => {
  /* Used to push other views */
  const history = useHistory();
  const [ showToast , setShowToast] = useState<boolean>(false);
  const [ toasMessage , setToastMessage] = useState<string>("");

  const [ currentOrder , setCurrentOrder ] = useState<OrderRespository>();
  
  console.log(order);
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
  

  return (
    /* Used the <> because only can return a hole component  */
    <>
      {/* Bengin modal header */}
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={onDismissModal}>Cerrar</IonButton>
          </IonButtons>
          <IonTitle>
            Detalle
          </IonTitle>
          <IonButtons slot="end">
            <IonButton href={`tel:${order.phoneClient}`}>
              <IonIcon slot="start" icon={call} />
              Llamar
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      {/* End Modal header */}
      
      <IonContent>
        {/* Begin Order Details */}
        <IonGrid>
          <IonRow>
            <IonCol push="0.3" className="ion-no-padding">
              <h2  className="detailTitle">Detalle de la Orden</h2>
            </IonCol>
          </IonRow>
        </IonGrid>  
        <IonList>
          <IonItem>
            <IonLabel> Nro: <u><a onClick={()=>CopyText(order._id)}>{order._id}</a></u>  </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              Valor: 
              <NumberFormat value={order.totalAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              Estado: 
              <IonText color={order.status==='ACTIVE'?'primary':'danger'}>
                {order.status ==='ACTIVE'?'Activa':order.status}
              </IonText>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Cliente: <b>{order.nameClient} </b></IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Fecha: <b>{order.dateBeginOrder +' '+ order.hourStart}</b></IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Metodo de pago: <b>{order.paymentMethod.type}</b></IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Direccion: <b>{order.address}</b></IonLabel>
          </IonItem>
        </IonList>
        <IonGrid>
          <IonRow>
            <IonCol push="0.3" className="ion-no-padding">
              <h3>Productos</h3>
            </IonCol>
          </IonRow>
          
          {
            
            order.products.map((product,index)=>{
              
              return(
                <IonRow key={index}>
                  <IonCol push="0.3">
                    {product.name}
                    <ul>
                      {
                        product.presentations.map((presentation,index)=>{
                          return(
                            <li key={index}>{`${presentation.reference} x ${presentation.units}` }</li>
                          )
                        })
                      }
                    </ul>
                    

                      
                  
                  </IonCol>
                </IonRow>
              )
            })
          }
        </IonGrid>  
        {/* End Order Details */}

        {/* Auxiliary toasts */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toasMessage}
          duration={500}
        />
        
       
      </IonContent>
      {/* Begin Of footer Area of modal */}
      <IonFooter>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonButton
                expand="block"
                size="large"
                color="primary">
                Tomar Orden
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonFooter>
      {/* End footer of modal area */}

    </>
  );
};

export default OrderModal;