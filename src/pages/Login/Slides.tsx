import { IonContent, IonPage,IonButton,IonSlides, IonSlide,IonFooter, IonGrid, IonRow, IonCol,} from '@ionic/react';
import React from 'react';
//import ExploreContainer from '../components/ExploreContainer';
import './Slides.scss';

const Slides: React.FC = () => {
  
  // Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
  const slideOpts = {
    speed: 1000
  };
  return (
    <IonPage id="homePage">
      <IonContent>
        
        <IonSlides pager={true} options={slideOpts}>
          <IonSlide>
            <div >
              <img src="assets/img/slide1.svg" alt=""/>
            </div>
            <div className="title">
              <h3>
                Bienvenido a <b>TimuAliados</b>
              </h3>
            </div>
            <p>
              <b>Nuestra App</b> te permite gestionar y potenciar las ventas de tu negocio pet de una manera <b>rapida, facil y segura</b>
            </p>
          </IonSlide>

          <IonSlide>
            <div >
              <img src="assets/img/slide2.svg" alt=""/>
            </div>
            <div className="title">
              <h3>Por que <b>Elegirnos</b></h3>
            </div>
            <p>
             Aun usando <b>Whatsapp</b> para gestionar <br></br> tus pedidos?. Los <b>TimuAliados</b> gestionan los <b>chats y pedidos</b> con sus clientes directamente en nuestra app 
            </p>
          </IonSlide>

          <IonSlide>
            <div>
              <img src="assets/img/wallet.svg" alt=""/>
            </div>
            <div className="title">
              <h3>Gana <b>Dinero</b></h3>
            </div>
            <p>
              Recibe las <b>Ganancias</b> de todos tus productos, directamente en tu <b>cuenta de ahorros </b>. Que esperas para unirte al mundo  <b>PET?</b>
            </p>
          </IonSlide>
        </IonSlides>
      </IonContent>

      <IonFooter>
        <IonGrid>
          <IonRow>
            <IonCol size="10" offset="1">
              <IonButton className="btn-primary" expand="full" shape="round"  color="primary" href="https://wa.me/573162452663?text=Hola%2C%20me%20gustaria%20ser%20Aliado%20de%20la%20app%20timugo">
                Quiero ser TimuAliado
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton expand="block" fill="clear" routerLink={"/login"} >Iniciar Sesion</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonFooter>
    </IonPage>
  );
};

export default Slides;
