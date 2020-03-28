import { IonContent, IonPage,IonButton,IonSlides, IonSlide,IonFooter, IonGrid, IonRow, IonCol,} from '@ionic/react';
import React from 'react';
//import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const Home: React.FC = () => {
  
  // Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
  const slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  let slides = [
    {
      img: 'assets/img/img1.svg',
      title : "Primer <br> slider"
    },
    {
      img: 'assets/img/img2.svg',
      title : "Segundo <br> slider"
    },
    {
      img: 'assets/img/img3.svg',
      title : "tercer <br> slider"
    }
  ]
  
  return (
    <IonPage id="homePage">
      <IonContent fullscreen>
        
        <IonSlides pager={true} >
          <IonSlide>
            <div className="slide-img-padding">
              <img  className="slide-image" src="assets/img/slide1.jpg" alt=""/>
            </div>
            <div>
              <h3 className="slide-title">
                Bienvenido a <b>TimuAliados</b>
              </h3>
            </div>
            <p>
              La app de <b>Timugo Aliados</b> te permite gestionar y potenciar las ventas de tu negocio de una manera <b>rapida, facil y segura</b>
            </p>
          </IonSlide>
          <IonSlide>
            <img className="slide-image" src="assets/img/1.jpg" alt=""/>
            <h2>Por que Elegirnos?</h2>
            <p>
              <b>Lorem Ispum</b> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            </p>
          </IonSlide>
          <IonSlide>
            <img className="slide-image" src="assets/img/3.png" alt=""/>
            <h2 >Lorem Ipsum</h2>
            <p>
              <b>Ionic Appflow</b> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            </p>
          </IonSlide>
        </IonSlides>
        {/* <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Timugo Partners</IonTitle>
          </IonToolbar>
        </IonHeader>
      
        <ExploreContainer />
      /> */}
      
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
              <IonButton expand="block" fill="clear" >Iniciar Sesion</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonFooter>
    </IonPage>
  );
};

export default Home;
