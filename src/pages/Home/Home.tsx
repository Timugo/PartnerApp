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
} from '@ionic/react';
import { add} from 'ionicons/icons';
import React, { useState } from 'react';
import { RefresherEventDetail } from '@ionic/core';
/* Page Css Styles */
import './Home.scss';
/* Services */
import { ProductService } from "../../services/product-service";
/* Interfaces */
import { Product } from "../../interfaces/responses.interface";




const Login: React.FC = () => {
  const [products, setProducts] = useState<Product[]>();
  /* Options to swiper carousell */
  const slideOpts = {
    speed: 400,
    centeredSlides:true,
    spaceBetween :10,
    slidesPerView : 1.6   
  };
  /*
    This function loads every time 
    page are charged
  */
  useIonViewDidEnter(() => {
    fetchProducts();
  });  
  /*
    This function refresh the products
    to active need to swipe off the page
  */
  const Refresh = (event: CustomEvent<RefresherEventDetail>) =>{
    fetchProducts();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.detail.complete();
    }, 2000);
  }
  /*
    This function fetch the api to bring
    the array of products to show
  */
  const fetchProducts = () => {
    ProductService.getProducts()
      .then((response) => {
        //const data: Product[] = products.data.content.products;
        /* Set the Products to variable */
        setProducts(response.data.content.products);
      });
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons>
            <IonMenuButton menu="sideMenu" ></IonMenuButton>
          </IonButtons>
          <IonTitle>Pets</IonTitle>
        </IonToolbar>
      </IonHeader> 

      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar >
            <IonTitle size="large">Hola Terricola !</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonRefresher slot="fixed" onIonRefresh={Refresh}>
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
                                <IonCard >
                                  <IonImg src={"https://metrocolombiafood.vteximg.com.br/arquivos/ids/182931-1000-1000/7703616001531-1.jpg?v=636712344825470000"}></IonImg>
                                  <IonCardHeader>
                                    <IonCardSubtitle>{item.price}</IonCardSubtitle>
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
       
      </IonContent>
    </IonPage>
  );
};

export default Login;