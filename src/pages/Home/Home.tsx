import { 
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonRefresher,
  IonRefresherContent,
  IonMenuButton,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonSlides,
  IonSlide,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonImg,
  IonIcon,
  IonButton,
  useIonViewDidEnter,
  IonModal,
  IonToast,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonBadge,
} from '@ionic/react';
import { add, calendar, personCircle, informationCircle, map} from 'ionicons/icons';
import React, { useState, useRef } from 'react';
import { RefresherEventDetail } from '@ionic/core';
/* Page Css Styles */
import './Home.scss';
/* Services */
import { ProductService } from "../../services/product.service";
/* Interfaces */
import { Product } from '../../interfaces/product.interface';


/* Components */
import ProductModal from '../../components/ProducModal';

interface CustomProps{
  
  fieldName : string
}


/* React Functional Component */
const Login: React.FC = () => {
  // let productTemp : Product = {
  //   benefits : "",
  //   characteristics : "",
  //   deliveryDays : 0,
  //   description : "",
  //   file : "",
  //   name : "",
  // } ;
  const [products, setProducts] = useState<Product[]>();
  const [product, setProduct] =useState<Product>();
  const [showProductModal, setShowProductModal] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [messageToast, setMessageToast] = useState<string>("");
  //const ionRefresherRef = useRef<HTMLIonRefresherElement>(null);
  const pageRef = useRef<HTMLElement>(null);
  /*
    This function loads every time 
    page are charged
  */
  useIonViewDidEnter(() => {
    ProductService.getProducts()
      .then((response) => {
        //const data: Product[] = products.data.content.products;
        /* Set the Products to variable */
        setProducts(response.data.content.products);
      });
  }); 
  /*
    Refresh Products
  */
  const doRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    ProductService.getProducts()
      .then((response) => {
        //const data: Product[] = products.data.content.products;
        /* Set the Products to variable */
        setProducts(response.data.content.products);
        //ionRefresherRef.current!.complete();
        event.detail.complete();
      })
      .catch((err)=>{
        setMessageToast("Ups ocurrio un error al cargar tus productos");
        setShowToast(true);
        event.detail.complete();
      });
  };
  /* Options to swiper carousell */
  const slideOpts = {
    speed: 400,
    centeredSlides:true,
    spaceBetween :10,
    slidesPerView : 1.6   
  };
  /*
    This function open a modal with the info
    of the clicked product
  */
  const GoProduct = (product : Product)=>{
    setProduct(product)
    setShowProductModal(true);
  }
  return (
    /* page ref is used to get the ios 13 modal cards in the background */
    <IonPage ref={pageRef}>
      <IonHeader className="ion-no-border" translucent={true}>
        <IonToolbar>
          <IonButtons>
            <IonMenuButton ></IonMenuButton>
          </IonButtons>
          <IonTitle>Pets</IonTitle>
        </IonToolbar>
      </IonHeader> 

      <IonContent fullscreen={true}>
        <IonHeader collapse="condense">
          <IonToolbar >
            <IonTitle size="large">Hola Terricola !</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent
            pullingIcon="arrow-dropdown"
            pullingText="Desliza para refrescar"
            refreshingSpinner="circles"
            refreshingText="Refrescando...">
          </IonRefresherContent>
        </IonRefresher>

        
        <IonGrid>
          <IonRow className="ion-margin ion-align-items-end ion-justify-content-between">
            <IonCol>
              <IonText>
                <h1>Tus Productos</h1>
              </IonText>
            </IonCol>
            <IonCol size="auto">
              <IonButton fill="clear" routerLink="/products/create">
                Agregar
                <IonIcon slot="start" icon={add} />
              </IonButton>
            </IonCol>
          </IonRow>
          {
            /* If exists products */
            (products) ?
              /* Returns the Slides with product */
              ( 
                <IonRow>
                  <IonSlides pager={false} options={slideOpts}>
                    {
                      products.map(function(item : Product,i :number) {
                    
                        return <IonSlide key={i} >
                                <IonCard onClick={()=> {GoProduct(item)}}>
                                  <IonImg src={item.img}></IonImg>
                                  <IonCardHeader>
                                    {/* <IonCardSubtitle>{item.price}</IonCardSubtitle> */}
                                    <IonCardTitle>{item.description}</IonCardTitle>
                                  </IonCardHeader>
                                </IonCard>
                              </IonSlide>
                      })
                    }
                  </IonSlides>
                </IonRow>
              ) : 
              /* If products arent define show a default message */
              (
                <IonRow className="ion-padding">
                  <IonCol>
                    <h2>Ups, Aun tienes productos</h2>

                  </IonCol>
                </IonRow>
              )
          }
        </IonGrid>
       
        <IonModal
          isOpen={showProductModal}
          onDidDismiss={() => setShowProductModal(false)}
          swipeToClose={true}
          presentingElement={pageRef.current!} //ios 13 cards modal style
          //cssClass="Product"
          >
            {/*
              To see wich properties need to pass to modal 
              see the properties in ProductModal component
            */}
          <ProductModal
            onDismissModal={() => setShowProductModal(false)}
            product={product!}
          /> 
        </IonModal>    
      </IonContent>
      <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={messageToast}
          duration={700}
        />
    </IonPage>
  );
};

export default Login;