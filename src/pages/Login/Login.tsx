// Page Styles
import './Login.scss';
/* React libraries */
import { 
  IonContent,
  IonPage,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonText,
  IonToast
} from '@ionic/react';
import { chevronBackOutline,arrowForwardOutline} from 'ionicons/icons';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
//Services
import { LoginServices } from "./Services/auth.service";
import { LocalStorageService } from "../../services/localStorage.service";


const Login: React.FC = () => {
  // Properties to handle in the inputs
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");	
  // history is used to navigate netwen pages
  const history = useHistory();
  // Extra components
  const [showToast, setShowToast] = useState(false);
  /*
    Login Function
    React Functions must to have Capital leters 
  */
  const  HandleSubmit = async () =>{
    
    //Make Request to the static login service
    await LoginServices.login(user,password)
      .then(res=>{
        /* Save the JWT in the local storage*/
        LocalStorageService.saveItem("jwt",res.data.content.token)
          .then(response =>{
            /* Save the phone in the local storag */
            LocalStorageService.saveItem("phone",res.data.content.phone.toString())
              .then(()=>{
                LocalStorageService.saveItem("id",res.data.content.id)
                  .then(()=>{
                    //navigate to Home page
                    history.push('/tabs/products');
                  })
                  .catch(err=>{
                    setShowToast(true);
                    console.log(err);
                  });
              })
          })
          .catch(err =>{
            setShowToast(true);
            console.log(err);
          });
      }).catch(err=>{
        setShowToast(true);
        console.log(err);
      });
  }
  
  return (
    <IonPage>
      <IonContent>
        <div className="textWelcome">
          <IonText>
            <h1>Hola <br></br> De Nuevo</h1>
          </IonText>
        </div>
        
        <IonGrid>
          <IonRow>
            <IonCol>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonIcon color="primary" size="large" icon={chevronBackOutline} />
            </IonCol>
          </IonRow>
        </IonGrid>

        <div className="LoginForm">
            <IonGrid>

              <IonRow>
                <IonCol size="10" offset="1">
                  <IonItem>
                    <IonLabel color="medium" className="labelForm" position="floating">Celular</IonLabel>
                    <IonInput value={user} onIonChange={e=> setUser(e.detail.value!)} type="number" clearInput={true}>
                    </IonInput>
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="10" offset="1">
                  <IonItem>
                    <IonLabel color="medium" className="labelForm" position="floating">Constraseña</IonLabel>
                    <IonInput value={password} onIonChange={e=> setPassword(e.detail.value!)} type="password"
                      clearInput={true}></IonInput>
                  </IonItem>
                </IonCol>
              </IonRow>

            </IonGrid>
        </div>

        <div className="bottomButtons">
          <IonGrid>
            <IonRow class="ion-justify-content-around">
              <IonCol offset="1">
                <h1>Ingresar</h1>
              </IonCol>
              <IonCol offset="2" className="ion-align-self-end">
                <IonButton  size="large" className="customButton" onClick={HandleSubmit}>
                  <IonIcon id="signButton" color="white" size="medium" icon={arrowForwardOutline} />
                </IonButton>
              </IonCol>
            </IonRow>

          </IonGrid>
        </div>

      </IonContent>
      {/* Extra components */}
      <IonToast
      isOpen={showToast}
      onDidDismiss={() => setShowToast(false)}
      message="Error de conexion, por favor intenta mas tarde"
      duration={500}/>
    </IonPage>
  );
};

export default Login;

