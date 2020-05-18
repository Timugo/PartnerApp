/*
  This class wil be used to handle all enviroment
  variables like API TOkens or URLS
*/
export class Enviroment {
  
  /*
    This function detects if the envoriment is production
    or development and returns the properly API_URL 
  */
  async getUrl(){
    /*read de node Env variable https://create-react-app.dev/docs/adding-custom-environment-variables/#expanding-environment-variables-in-env */
    if(process.env.NODE_ENV==='production'){
      //Production mode
      return 'https://sandboxv2.timugo.com'
    }else{
      // local and test url
      //return 'http://localhost:3001'
      return 'https://sandboxv2.timugo.com'
    }
  }
}