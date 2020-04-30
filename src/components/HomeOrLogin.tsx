import React from 'react';

import { Redirect } from 'react-router';
import { LocalStorageService } from "../services/localData-service";
import { withIonLifeCycle } from '@ionic/react';


class HomeOrTutorial extends React.Component {

	constructor(props : any){
		super(props)
	}
	ionViewWillEnter() {
		if(true){
			return <Redirect to="/login" />;
		}
    console.log('ionViewWillEnter event fired')
	}
	
	render(){
 		return <Redirect to="/slides" />;
	}
	// /*If User is logged then, redirect to home, if not redirect to slides tutorial*/ 
	// const storageService = new LocalStorageService();
	// // Check if exits jwt in the phone
	// storageService.getItem("jwt")
	// 	.then((token )=>{
	// 		/* If exists the jwt in the phone the user is logged */	
	// 		if(token){
	// 			return <Redirect to="/Home" /> 

	// 		}
				
	// 	})
	// 	.catch((err)=>{
	// 			console.log(err);
	// 	})
	// 	return <Redirect to="/slides" />
};

export default withIonLifeCycle(HomeOrTutorial);