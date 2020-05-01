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
} from '@ionic/react';
import { add } from 'ionicons/icons';
import React from 'react';
import { RefresherEventDetail } from '@ionic/core';
//import ExploreContainer from '../components/ExploreContainer';
import './Home.scss';

//import {  useHistory } from 'react-router';
//Services
//import { LocalStorageService } from "../../services/localData-service";
//Interface
//import { User } from "../../interfaces/user.interface";

function doRefresh(event: CustomEvent<RefresherEventDetail>) {
  console.log('Begin async operation');

  setTimeout(() => {
    console.log('Async operation has ended');
    event.detail.complete();
  }, 2000);
}

const slideOpts = {
  speed: 400,
  centeredSlides:true,
  spaceBetween :10,
  slidesPerView : 1.6 
  
};

const data = [
  {
    ref : "Ref1",
    title  : "Title1",
    urlImg : "http://via.placeholder.com/300x300"
  },
  {
    ref : "Ref1",
    title  : "Title1",
    urlImg : "https://metrocolombiafood.vteximg.com.br/arquivos/ids/182931-1000-1000/7703616001531-1.jpg?v=636712344825470000"
  },
  {
    ref : "Ref1",
    title  : "Title1",
    urlImg : "https://metrocolombiafood.vteximg.com.br/arquivos/ids/182931-1000-1000/7703616001531-1.jpg?v=636712344825470000"
  },
  {
    ref : "Ref1",
    title  : "Title1",
    urlImg : "https://metrocolombiafood.vteximg.com.br/arquivos/ids/182931-1000-1000/7703616001531-1.jpg?v=636712344825470000"
  },
  {
    ref : "Ref1",
    title  : "Title1",
    urlImg : "https://metrocolombiafood.vteximg.com.br/arquivos/ids/182931-1000-1000/7703616001531-1.jpg?v=636712344825470000"
  },
  {
    ref : "Ref1",
    title  : "Title1",
    urlImg : "https://metrocolombiafood.vteximg.com.br/arquivos/ids/182931-1000-1000/7703616001531-1.jpg?v=636712344825470000"
  },
  {
    ref : "Ref1",
    title  : "Title1",
    urlImg : "https://metrocolombiafood.vteximg.com.br/arquivos/ids/182931-1000-1000/7703616001531-1.jpg?v=636712344825470000"
  },
  {
    ref : "Ref1",
    title  : "Title1",
    urlImg : "https://metrocolombiafood.vteximg.com.br/arquivos/ids/182931-1000-1000/7703616001531-1.jpg?v=636712344825470000"
  },

]

const Login: React.FC = () => {
  //const [user, setUser] = useState<string>("");
  //const [password, setPassword] = useState<string>("");
  //const history = useHistory();
  const Product = () =>{
    console.log("producto");
  }
  

  
  
  
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
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent
            pullingIcon="arrow-dropdown"
            pullingText="Desliza para refrescar"
            refreshingSpinner="circles"
            refreshingText="Refrescando...">
          </IonRefresherContent>
        </IonRefresher>

        <IonGrid>
          <IonRow className="ion-align-items-end ion-justify-content-between">
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
          <IonSlides pager={false} options={slideOpts}>
            {
              data.map(function(item,i) {
                return <IonSlide key={i} >
                        <IonCard onClick={Product}>
                          <IonImg src={item.urlImg}></IonImg>
                          <IonCardHeader>
                            <IonCardSubtitle>{item.ref}</IonCardSubtitle>
                            <IonCardTitle>{item.title}</IonCardTitle>
                          </IonCardHeader>
                        </IonCard>
                      </IonSlide>
              })
            }
          </IonSlides>
        </IonGrid>
       
      </IonContent>
    </IonPage>
  );
};

export default Login;