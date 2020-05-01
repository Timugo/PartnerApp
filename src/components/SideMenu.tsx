import React from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonButtons, IonButton, IonFooter,  } from '@ionic/react';
import { LocalStorageService } from "../services/localData-service";
import { useHistory, Redirect } from 'react-router';
const LogOut = () =>{
 
  let storageService = new LocalStorageService();
  storageService.clearStorage()
    .then((res)=>{
      //window.navigator("/")
    })
} 
export const SideMenu: React.FC = () => (
    <IonMenu menuId="sideMenu" type="overlay" side="start" contentId="main">
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Hola Aliado</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent >
        <IonList>
          <IonItem>Menu Item</IonItem>
          <IonItem>Menu Item</IonItem>
          <IonItem>Menu Item</IonItem>
          <IonItem>Menu Item</IonItem>
          <IonItem><IonButton onClick={LogOut}>Cerrar sesion</IonButton></IonItem>
        </IonList>
      </IonContent>
      <IonFooter>
        Holi
      </IonFooter>
    </IonMenu>
);

export default SideMenu;