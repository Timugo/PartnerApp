
import axios from 'axios'; 


const  endpoint  =  `https://sandbox.timugo.com`;

interface bodyLogin { 
    phone : string
}
export class LoginServices {
    constructor(){}

    async login(user : string , pass:string){
      //fetch the api
      try {
        const response  = await axios({
          url: endpoint + '/loginBarber',
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            phone: user
          }
        });
        return response.data;
      }
      catch (err) {
        return err;
      }};
}