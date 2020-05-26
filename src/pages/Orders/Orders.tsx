import React, { useRef, useState, useEffect }  from 'react';
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel, IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonSegment, IonSegmentButton, IonTitle, IonSearchbar, IonButton, IonContent, IonItemSliding, IonItem, IonNote, IonItemOptions, IonItemOption, useIonViewWillEnter, useIonViewDidEnter, IonRow, IonText, IonModal } from '@ionic/react';
import { Route, Redirect } from 'react-router';
import { calendar, location, informationCircle, people, clipboardOutline, listOutline, search, heart, trash, star, checkmarkCircleOutline } from 'ionicons/icons';
import { OrderRespository } from './interfaces/order.interface';
import { OrderServices } from "./Services/orders.service";
/* Libraries */
import { default as NumberFormat } from 'react-number-format';
import OrderModal from './components/OrderModal';


interface MainTabsProps { }

const OrdersPage: React.FC<MainTabsProps> = () => {
  /* Page properties */
  const pageRef = useRef<HTMLElement>(null);
  const [segment, setSegment] = useState<string>('Actives');
  const [showOrderModal, setShowOrderModal] = useState<boolean>(false);
  const [activeOrders, setActiveOrders]= useState<OrderRespository[]>();
  const [ selectedOrder , setSelectedOrder ]= useState<OrderRespository>();
  const [takenOrders, setTakenOrders]= useState<OrderRespository[]>();
  
  useIonViewDidEnter(() => {
    
    OrderServices.getActiveOrders()
      .then(response=>{
        console.log(`Active Orders`,response.data);
        setActiveOrders(response.data.content.orders);
      })
      .catch(err=>{
        console.log(err);
      });
    OrderServices.getTakenOrders()
      .then(response=>{
        console.log(`Taken Orders`,response.data);
        setTakenOrders(response.data.content.orders);

      })
      .catch(err=>{
        console.log(err);
      });
  });
  return (
    <IonPage ref={pageRef} id="schedule-page">
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          {/* <IonSegment value={segment} onIonChange={(e) =>{console.log(e.detail.value); ;setSegment(e.detail.value!)}}>
              <IonSegmentButton value="active">
                Nuevas
              </IonSegmentButton>
              <IonSegmentButton value="taken">
                Tomadas
              </IonSegmentButton>
              
            </IonSegment> */}

            <IonTitle>Ordenes</IonTitle>
            {/* <IonSearchbar showCancelButton="always" placeholder="Search" onIonChange={(e: CustomEvent) => setSearchText(e.detail.value)} onIonCancel={() => setShowSearchbar(false)}></IonSearchbar> */}
            <IonButtons slot="end">
              <IonButton onClick={() => console.log("proximamente filtro")}>
                Filtrar
              </IonButton>
            
          </IonButtons>
        </IonToolbar>

      </IonHeader>

      <IonContent fullscreen={true}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Ordenes</IonTitle>
          </IonToolbar>
          {/* <IonToolbar>
            <IonSearchbar placeholder="Search" onIonChange={(e: CustomEvent) => setSearchText(e.detail.value)}></IonSearchbar>
          </IonToolbar> */}
        </IonHeader>

        <IonSegment onIonChange={(e) => {setSegment(e.detail.value!)}}>
          <IonSegmentButton value="Actives">
            <IonLabel>Activas</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="Taken">
            <IonLabel>Tomadas</IonLabel>
          </IonSegmentButton>
        </IonSegment>
        {/* Active Orders Section */}
        <div className={segment === 'Actives' ? '' : 'ion-hide'}>
          {
            /* If exists products */
            (activeOrders) ?
              /* Put de Orders in a list with product */
              ( 
                activeOrders.map((order,index)=>{
                  return(
                      <IonItemSliding key={index}>
                        {/* If the item oforder is clicked then, make the current order and open de order modal */}
                        <IonItem onClick={()=>{setSelectedOrder(order); setShowOrderModal(true)}} >
                          <IonLabel>
                            {/* NUmber format library to display currencies */}
                            <NumberFormat value={order.totalAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                            <p>{order.nameClient}</p>
                            <IonText color="primary">
                              <h2>Productos</h2>
                            </IonText>
                            {
                              order.products.map((product,index)=>{
                                return(
                                  <p key={index}>{product.name}</p>
                                )
                              })
                            }
                          </IonLabel>
                          <IonNote slot="end">
                            {`${order.dateBeginOrder} ${order.hourStart}`}
                          </IonNote>
                        </IonItem>
                        <IonItemOptions side="end">                      
                          <IonItemOption>
                            <IonIcon slot="start" icon={checkmarkCircleOutline} />
                            Tomarla
                          </IonItemOption>
                        </IonItemOptions>
                      </IonItemSliding>
                      );
                    })
              ) : 
              /* If products arent define show a default message */
              (
                ''
              )
          }
          
        </div>
        {/* End of Active Orders Section  */}
            
        {/* Taken Order Section  */}
        <div className={segment === 'Taken' ? '' : 'ion-hide'}>
        {
          /* If exists products */
          (takenOrders) ?
            /* Put de Orders in a list with product */
            ( 
              takenOrders.map((order,index)=>{
                return(
                    <IonItemSliding key={index}>
                      <IonItem href="#" >
                        <IonLabel>
                          {/* NUmber format library to display currencies */}
                          <NumberFormat value={order.totalAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                          
                          <p>{order.nameClient}</p>
                          Estado: {order.status}
                          <IonText color="primary">
                            <h2>Productos</h2>
                          </IonText>
                          {
                            order.products.map((product,index)=>{
                              return(
                                <p key={index}>{product.name}</p>
                              )
                            })
                          }
                        </IonLabel>
                        <IonNote slot="end">
                          {`${order.dateBeginOrder} ${order.hourStart}`}
                        </IonNote>
                      </IonItem>
                      <IonItemOptions side="end">                      
                        <IonItemOption>
                          <IonIcon slot="start" icon={checkmarkCircleOutline} />
                          Cambiar Estado
                        </IonItemOption>
                      </IonItemOptions>
                    </IonItemSliding>
                );    
              })
                
            ) : 
            /* If products arent define show a default message */
            (
              ''
            )
          }
        </div>
        {/* End Of Taken Order Section */}

        {/* Extra components */}
        <IonModal
          isOpen={showOrderModal}
          onDidDismiss={() => setShowOrderModal(false)}
          //cssClass="Product"
          presentingElement={pageRef.current!} //ios 13 cards modal style
          swipeToClose={true}>
          
          {/*
            To see wich properties need to pass to modal 
            see the properties in ProductModal component
          */}
          <OrderModal
            onDismissModal={() => setShowOrderModal(false)}
            order={selectedOrder!}
          /> 
        </IonModal> 
        {/* End of extra components */}
         
        
      </IonContent>
    </IonPage>
  );
};

export default OrdersPage;