import React from 'react';
import { 
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonButton,
  IonFooter,  
} from '@ionic/react';
import { LocalStorageService } from "../services/localStorage.service";
import { useHistory} from 'react-router';

export const SideMenu: React.FC = () => {
  const history = useHistory();
  const LogOut = () =>{
    LocalStorageService.clearStorage()
      .then((res)=>{
        history.push("/");
      })
    }  
    return (
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
    )
};

export default SideMenu;