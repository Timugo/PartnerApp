import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { setupConfig } from '@ionic/react';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
//Force App to user ios mode ever
setupConfig({
    mode:"ios"
});
/* PLugins PWA or electron */
defineCustomElements(window);
/* IOnic react start the app */
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
