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
import { chevronBackOutline,arrowForwardOutline, codeWorking} from 'ionicons/icons';
import React, { useState } from 'react';
//import ExploreContainer from '../components/ExploreContainer';
import './Login.scss';

import { Plugins } from '@capacitor/core';
import { Redirect } from 'react-router';
//Services
import { LoginServices } from "../../services/auth-service";
import { LocalStorageService } from "../../services/localData-service";
//Interface
import { User } from "../../interfaces/user.interface";
import { LoginResponse } from "../../interfaces/responses.interface";
const { Browser } = Plugins;

const Login: React.FC = () => {
    const [user, setUser] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    async function register(){
        await Browser.open({ url: 'https://wa.me/573162452663?text=Hola%2C%20me%20gustaria%20recuperar%20mi%20contrasena%20' });
		}
		const handleSubmit =() =>{
			let loginService  = new LoginServices();
			let localDataService = new LocalStorageService();
			
			let userLogin : User = {
				user : user,
				pass : password
			};
			//Make Request to the login service
			loginService.login(user,password).then(res=>{
				if(res)

			}).catch(err=>{
				console.log(err);
			})

			// loginService.login().then((res)=>{
			// 	console.log(res);
			// });
		}
    return (
			<IonPage>
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

      			<IonGrid>
      				<IonRow class="ion-justify-content-start">
      					<IonCol size="3">
      						<div>
      							1 of 2
      						</div>
      					</IonCol>
      					<IonCol size="3">
      						<div>
      							2 of 2
      						</div>
      					</IonCol>
      				</IonRow>
      				<IonRow class="ion-justify-content-center">
      					<IonCol size="3">
      						<div>
      							1 of 2
      						</div>
      					</IonCol>
      					<IonCol size="3">
      						<div>
      							2 of 2
      						</div>
      					</IonCol>
      				</IonRow>
      				<IonRow class="ion-justify-content-end">
      					<IonCol size="3">
      						<div>
      							1 of 2
      						</div>
      					</IonCol>
      					<IonCol size="3">
      						<div>
      							2 of 2
      						</div>
      					</IonCol>
      				</IonRow>
      				<IonRow class="ion-justify-content-around">
      					<IonCol size="3">
      						<div>
      							1 of 2
      						</div>
      					</IonCol>
      					<IonCol size="3">
      						<div>
      							2 of 2
      						</div>
      					</IonCol>
      				</IonRow>
      				<IonRow class="ion-justify-content-between">
      					<IonCol size="3">
      						<div>
      							1 of 2
      						</div>
      					</IonCol>
      					<IonCol size="3">
      						<div>
      							2 of 2
      						</div>
      					</IonCol>
      				</IonRow>
      			</IonGrid>
      			{/* <IonRow className="ion-justify-content-end">
      				<IonCol size="3">
      					<div>
      						1 of 2
      					</div>
      				</IonCol>
      				<IonCol size="3">
      					<div>
      						2 of 2
      					</div>
      				</IonCol>
      			</IonRow> */}
      		</div>
      		{/* <IonHeader collapse="condense" className="ion-no-border">
      			<IonToolbar>
      				<IonButtons slot="start">
      					<IonBackButton text="" color="primary" />
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
      					<IonIcon color="primary" size="large" icon={chevronBackOutline} />
      				</IonCol>
      			</IonRow>
      		</IonGrid>
      		<div className="LoginForm">
							<IonGrid>
								<IonRow>
									<IonCol size="10" offset="1">

										<IonItem>
											<IonLabel color="medium" className="labelForm" position="floating">Telefono</IonLabel>
											<IonInput value={user} onIonChange={e=> setUser(e.detail.value!)} type="number" clearInput={true}>
											</IonInput>
										</IonItem>
									</IonCol>
								</IonRow>
								<IonRow>
									<IonCol size="10" offset="1">
										<IonItem>
											<IonLabel color="medium" className="labelForm" position="floating">Constrasenia</IonLabel>
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
      						<IonButton  size="large" className="customButton" onClick={handleSubmit}>
      							<IonIcon id="signButton" color="white" size="medium" icon={arrowForwardOutline} />
      						</IonButton>
      						{/*
      						<IonIcon id="signButton" color="secondary" size="large" icon={arrowForwardCircleSharp} /> */}
      					</IonCol>
      				</IonRow>

      			</IonGrid>
      		</div>
      		<div className="bottomText">
      			<IonGrid>
      				<IonRow class="ion-justify-content-around">
      					<IonCol offset="1">
      						<div onClick={register}><b><u>Registrarse</u></b></div>
      					</IonCol>
      					<IonCol offset="1">
      						<div><b><u>Olvide la Contraseña</u></b></div>
      					</IonCol>
      				</IonRow>
      			</IonGrid>

      		</div>
  
      	</IonContent>
      </IonPage>
    );
};

export default Login;

