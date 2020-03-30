import React from 'react';

import { Redirect } from 'react-router';



const HomeOrTutorial: React.FC= () => {
    /*If User is logged then, redirect to home, if not redirect to slides tutorial*/ 
    return <Redirect to="/slides" /> 
    // return isLoggin ? <Redirect to="/tabs/schedule" /> : <Redirect to="/tutorial" />
};

export default HomeOrTutorial;