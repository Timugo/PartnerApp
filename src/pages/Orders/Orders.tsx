import React, { useRef, useState }  from 'react';
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel, IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonSegment, IonSegmentButton, IonTitle, IonSearchbar, IonButton, IonContent } from '@ionic/react';
import { Route, Redirect } from 'react-router';
import { calendar, location, informationCircle, people, clipboardOutline, listOutline, search } from 'ionicons/icons';



interface MainTabsProps { }

const OrdersPage: React.FC<MainTabsProps> = () => {
  const pageRef = useRef<HTMLElement>(null);
  const [segment, setSegment] = useState<'all' | 'favorites'>('all');
  const [showSearchbar, setShowSearchbar] = useState<boolean>(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  
  return (
    <IonPage ref={pageRef} id="schedule-page">
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonSegment value={segment} onIonChange={(e) => setSegment(e.detail.value as any)}>
              <IonSegmentButton value="all">
                Nuevas
              </IonSegmentButton>
              <IonSegmentButton value="favorites">
                Tomadas
              </IonSegmentButton>
              
            </IonSegment>

            <IonTitle>Ordenes</IonTitle>
            {/* <IonSearchbar showCancelButton="always" placeholder="Search" onIonChange={(e: CustomEvent) => setSearchText(e.detail.value)} onIonCancel={() => setShowSearchbar(false)}></IonSearchbar> */}
            <IonButtons slot="end">
              <IonButton onClick={() => setShowFilterModal(true)}>
                Filtrar
              </IonButton>
            
          </IonButtons>
        </IonToolbar>

      </IonHeader>
      <IonContent fullscreen={true}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Ordenes</IonTitle>
          </IonToolbar>
          {/* <IonToolbar>
            <IonSearchbar placeholder="Search" onIonChange={(e: CustomEvent) => setSearchText(e.detail.value)}></IonSearchbar>
          </IonToolbar> */}
        </IonHeader>
      </IonContent>
    </IonPage>
  );
};

export default OrdersPage;