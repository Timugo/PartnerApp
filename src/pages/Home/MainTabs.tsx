/* React dependencies */
import React  from 'react';
import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel
} from '@ionic/react';
import {
  location,
  clipboardOutline,
  listOutline 
} from 'ionicons/icons';
import { Route, Redirect } from 'react-router';
/* Pages */
import ProductsPage from "./Products";
import OrdersPage from "../Orders/Orders";


interface MainTabsProps { }

const MainTabs: React.FC<MainTabsProps> = () => {

  return (
    <IonTabs>
      <IonRouterOutlet>  
        <Redirect exact path="/tabs" to="/tabs/orders" />
        {/*
          Using the render method prop cuts down the number of renders your components will have due to route changes.
          Use the component prop when your component depends on the RouterComponentProps passed in automatically.
        */}
        <Route path="/tabs/orders" render={() => <OrdersPage />} exact={true} />
        <Route path="/tabs/products" render={() => <ProductsPage />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="orders" href="/tabs/orders">
          <IonIcon icon={clipboardOutline} />
          <IonLabel>Ordenes</IonLabel>
        </IonTabButton>
        <IonTabButton tab="products" href="/tabs/products">
          <IonIcon icon={listOutline} />
          <IonLabel>Products</IonLabel>
        </IonTabButton>
        {/* <IonTabButton tab="Perfil" href="/map">
          <IonIcon icon={location} />
          <IonLabel>Perfil</IonLabel>
        </IonTabButton> */}
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;