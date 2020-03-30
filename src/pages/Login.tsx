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
    IonText
} from '@ionic/react';
import { chevronBackOutline,arrowForwardOutline} from 'ionicons/icons';
import React, { useState } from 'react';
//import ExploreContainer from '../components/ExploreContainer';
import './Login.scss';

import { Plugins } from '@capacitor/core';
import { Redirect } from 'react-router';
const { Browser } = Plugins;

const Login: React.FC = () => {
    
    const [phone, setPhone] = useState<string>();
    const [password, setPassword] = useState<string>();
    function login(){
        return <Redirect to='/slides' />
    }
    async function register(){
        await Browser.open({ url: 'https://wa.me/573162452663?text=Hola%2C%20me%20gustaria%20recuperar%20mi%20contrasena%20' });
    }
    return (
        <IonPage >
            {/* <IonHeader className="ion-no-border">
                <IonToolbar>
                    <IonButtons slot="start" className="backButton">
                        <IonBackButton text="" color="primary" />
                    </IonButtons>
                    
                </IonToolbar>
            </IonHeader> */}

            <IonContent>
                <div className="textWelcome">
                    <IonText>
                        <h1>Hola <br></br> De Nuevo</h1>
                    </IonText>
                    
                </div>

            
                
                {/* <IonHeader collapse="condense" className="ion-no-border">
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton text=""  color="primary" />
                        </IonButtons>
                        
                    </IonToolbar>
                </IonHeader> */}
                <IonGrid>
                    <IonRow>
                        <IonCol>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonIcon color="primary" size="large"  icon={chevronBackOutline}/>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                <div className="LoginForm">
                    <IonItem>
                        <IonLabel color="medium" className="labelForm" position="floating">Telefono</IonLabel>
                        <IonInput value={phone} onIonChange={e => setPhone(e.detail.value!)} type="number" clearInput={true}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel color="medium" className="labelForm" position="floating">Constrasenia</IonLabel>
                        <IonInput value={password} onIonChange={e => setPassword(e.detail.value!)} type="password" clearInput={true}></IonInput>
                    </IonItem>
                </div>

                <div className="bottomButtons">
                    <IonGrid>
                        <IonRow>
                            <IonCol offset="1">
                                <h1>Ingresar</h1>
                            </IonCol>
                            <IonCol offset="2">
                                <IonButton className="customButton" onClick={login}>
                                    <IonIcon id="signButton" color="white" size="large" icon={arrowForwardOutline}/>
                                </IonButton>
                                {/* <IonIcon id="signButton" color="secondary" size="large" icon={arrowForwardCircleSharp}/> */}
                            </IonCol>
                        </IonRow>
                    
                    </IonGrid>
                </div>
                <div className="bottomText">
                    <IonGrid>
                        <IonRow>
                            <IonCol offset="1">
                                <div onClick={register}><b><u>Registrarse</u></b></div>
                            </IonCol>
                            <IonCol offset="1">
                                <div ><b><u>Olvide la Contrasenia</u></b></div>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Login;

