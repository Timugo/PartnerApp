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
    IonText
} from '@ionic/react';
import { chevronBackOutline,arrowForwardOutline} from 'ionicons/icons';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
//Services
import { LoginServices } from "../../services/auth-service";
import { LocalStorageService } from "../../services/localData-service";
/* PLugins */
import { Plugins } from '@capacitor/core';


const { Browser } = Plugins
const Login: React.FC = () => {
		// Properties to handle in the inputs
		const [user, setUser] = useState<string>("");
		const [password, setPassword] = useState<string>("");	
		// history is used to navigate netwen pages
		const history = useHistory();
		/*
			Login Function 
		*/
		const  HandleSubmit = async () =>{
			/* React Functions must to have Capital leters */
			let loginService  = new LoginServices();
			let localDataService = new LocalStorageService();
			//Make Request to the login service
			await loginService.login(user,password)
				.then(res=>{
						/* Save the JWT in the local storage*/
						localDataService.saveItem("jwt",res.data.token)
							.then(res =>{
								//navigate to Home page
								
								history.push('home');
							})
							.catch(err => console.log(err));
				}).catch(err=>{
					console.log(err);
				});
		}
		const register = async () => {
			/* Open a link that redirect user to whatsapp api  */
			await Browser.open({ url: 'https://wa.me/573162452663?text=Hola%2C%20me%20gustaria%20recuperar%20mi%20contrasena%20' });
		}
		
    return (
			<IonPage>
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
      						<IonButton  size="large" className="customButton" onClick={HandleSubmit}>
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
						
						{/* <IonButton className="login-button" onClick={() => signIn()} expand="full" fill="solid" color="primary">
            	Login with Facebook
       			</IonButton> */}
      		</div>
  
      	</IonContent>
      </IonPage>
    );
};

export default Login;

