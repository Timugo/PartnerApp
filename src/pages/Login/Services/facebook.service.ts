import axios from 'axios'; 


export class FacebookServices {

    constructor(){}

    async getUserInfo( userId : string, token:string) {
        const response = await fetch(`https://graph.facebook.com/${userId}?fields=id,name,gender,link,picture&type=large&access_token=${token}`);
        const res = await response.json();
        console.log(res);
        return res;
    }
}