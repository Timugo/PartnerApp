import React from 'react';
import { Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
//Pages or components
import Slides from './pages/Login/Slides';
import HomeOrTutorial from './components/HomeOrTutorial';
import Login from './pages/Login/Login';
import SideMenu from './components/SideMenu';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.scss';




const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      {/* This is the side Menu that push the contend with the id="main" */}
      <SideMenu />
      {/* Content page of the all entire app */}
      <IonRouterOutlet id="main">
        <Route path="/slides" component={Slides} exact={true} />
        {/* Principal Page with tabs */}
        <Route path="/login" component={Login} exact={true} />
        {/*If User is logged then, redirect to home, if not redirect to slides tutorial*/  }
        <Route exact path="/" component={HomeOrTutorial}/>
        {/* <Route exact path="/" render={() => <Redirect to="/home" />} /> */}
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
