/* React Libraries */
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
/* Services */
import { LocalStorageService } from "../services/localData-service";

/*
	This functions checks in the local storage for a 
	propertie "jwt" that means the user is logged in
	if propertie exists then redirect user to home
	if not exits redirect to slides page
*/
const HomeOrLogin : React.FC = () => {
	/* Var used to handle the page route to redirect */
	const [ redirect, setRedirect ] = useState<string>("");
	/*If User is logged then, redirect to home, if not redirect to slides tutorial*/ 
	useEffect(() => {
		/* Initialize the local storage serice */
		const storageService = new LocalStorageService();
		// Check if exits jwt in the phone
		storageService.getItem("jwt")
			.then((token )=>{
			/* If exists the jwt in the phone the user is logged */ 
				if(token.value != null){
					setRedirect('/home');
				}else{
					setRedirect('/slides')
				}
			})
			.catch((err)=>{
					console.log(err);
			});
	}, []);
	return (
			/* Finally need to redirect to redirect variable key */
			<Redirect to={redirect} />
	)
};
export default HomeOrLogin;