/* CSS style file */
import './create-product.scss';
/* React importations */
import { 
  IonContent,
  IonPage,
  IonButton,
  IonFooter,
  IonGrid,
  IonRow,
  IonCol,
  IonLabel,
  IonText,
  IonIcon,
  IonList,
  IonItem,
  IonInput,
  IonTextarea,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonImg,
  IonToast
} from '@ionic/react';
import React, { useState } from 'react';
/* Ionic icons from ionic library  */
import { closeOutline} from 'ionicons/icons';
/* Services */
import { ProductService } from "../../services/product-service";
/* Interfaces */
import { Product } from "../../interfaces/product.interface";
/* Capacitor plugins libraries */
import { Plugins, CameraResultType} from '@capacitor/core';
import { useHistory } from 'react-router';
//instance of camera capacitor plugin
const { Camera } = Plugins;



const CreateProduct: React.FC = () => {
  const history = useHistory();
  /* variables used in the page */
  const [ description, setDescription ] = useState<string>("");
  const [ value, setValue ] = useState<number>(1000);
  const [ timeArrival, setTimeArrival ] = useState<number>(0);
  const [ name, setName ] = useState<string>("");
  const [ characteristics, setCharasteristics] = useState<string>("");
  const [ benefits, setBenefits ] = useState<string>("");
  const [ img,setImg ] = useState<string>(" ");
  const [showToast1, setShowToast1] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("Agregaste un nuevo articulo");
  
  /*
  This function handle a submit
  of a new product
  */
  const SendProduct = async () =>{
    let product : Product = {
      description : description,
      price : value,
      benefits : benefits,
      characteristics : characteristics,
      deliveryDays : timeArrival,
      img : img,
      name : name
    };

    ProductService.createProduct(product)
      .then((response )=>{
        if(response.status === 200){
          setShowToast1(true);
          history.push("/home");
        }
      })
      .catch(err =>{
        console.log(err);
      });


  }
  /*
    This function Use the capacitor camera plugin
    to make a photo or select from gallery 
  */
  const PickPicture = async() =>{
    /* 
      Use de capacitor plugin options here
      https://capacitor.ionicframework.com/docs/apis/camera#api
    */
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });
    // image.webPath will contain a path that can be set as an image src. 
    // You can access the original file using image.path, which can be 
    // passed to the Filesystem API to read the raw data of the image, 
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    if(image.webPath){
      setMessage(image.webPath);
      //to show Img path
      setImg(image.webPath);
    }
  }
  return (
    <IonPage id="homePage">
      {/* Page Header */}
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle>Nuevo Producto</IonTitle>
        </IonToolbar>
      </IonHeader> 

      {/* Page Content */}
      <IonContent>
        
        {/* Auxiliar toast */}
        <IonToast
          isOpen={showToast1}
          onDidDismiss={() => setShowToast1(false)}
          message={message}
          duration={500}
        />
        
        {/* define ionic grid */}
        <IonGrid>
          {/* First Row */}
          <IonRow>
            <IonCol offset="1">
              <div className="ion-characteristics-start">
                <h4>Crear Producto</h4>
                <IonText color="medium">
                 Añade la informacion del producto que quieres crear
                </IonText>
              </div>
            </IonCol>
          </IonRow>
          {/* Second row */}
          <IonRow >
            <IonCol offset="4" size="4">
              <IonImg src={img}></IonImg>
            </IonCol>
            <IonCol offset="3" size="6">
              <IonButton size="small" onClick={PickPicture}> Seleccionar fotografia</IonButton>
            </IonCol>
          </IonRow>
          {/* Row 3  */}
          <IonRow>
            <IonCol size="6">
              <IonItem>
                <IonLabel position="stacked">Precio</IonLabel>
                <IonInput 
                  min="1000"
                  type="number"
                  className="inputs"
                  autofocus={true}
                  value={value}
                  placeholder="En pesos"
                  onIonChange={e => setValue(parseInt(e.detail.value!))}>
                </IonInput>
              </IonItem>
            </IonCol>
            <IonCol size="6">
              <IonItem>
                <IonLabel position="stacked">Tiempo de entrega</IonLabel>
                <IonInput
                  type="number"
                  className="inputs"
                  autofocus={true}
                  value={timeArrival}
                  placeholder="Dias"
                  onIonChange={e => setTimeArrival(parseInt(e.detail.value!))}>
                </IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          {/* Row 4  */}
          <IonRow>
            <IonCol>
              <IonList>
                <IonItem>
                  <IonLabel position="stacked">Nombre</IonLabel>
                  <IonInput
                    className="inputs"
                    autofocus={true}
                    value={name}
                    placeholder="Nombre del producto"
                    onIonChange={e => setName(e.detail.value!)}>
                  </IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Descripcion</IonLabel>
                  <IonInput
                    className="inputs"
                    value={description}
                    placeholder="Descripcion del Producto"
                    onIonChange={e => setDescription(e.detail.value!)}>
                  </IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Caracteriticas</IonLabel>
                  <IonTextarea 
                    className="inputs"
                    placeholder="Caracteristicas de tu producto (maximo 400 palabras)"
                    autoGrow={true}
                    maxlength={400}     
                    value={characteristics}
                    rows={6} cols={20}
                    onIonChange={e => setCharasteristics(e.detail.value!)}>
                  </IonTextarea>
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Beneficios</IonLabel>
                  <IonTextarea 
                    className="inputs"
                    placeholder="Ejemplo : Aporta nutrientes escenciales ....... (opcional)"
                    autoGrow={true}
                    maxlength={400}     
                    value={benefits}
                    rows={6} cols={20}
                    onIonChange={e => setBenefits(e.detail.value!)}>
                  </IonTextarea>
                </IonItem>
              </IonList>
            </IonCol>
          </IonRow>

        </IonGrid> 

      </IonContent>

      {/* Define bottom of the page ionic footer */}
      <IonFooter>
        <IonGrid>
          <IonRow className="ion-align-items-end ion-justify-content-between">
            <IonCol  size="6">
              <IonButton href="/home" className="cancelButton"  expand="block" fill="clear">
                <IonIcon icon={closeOutline} slot="start"/>
                 Cancelar
              </IonButton>
            </IonCol>
            <IonCol size="6" >
              <IonButton expand="block" onClick={SendProduct} >Crear</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonFooter>
    </IonPage>
  );
};

export default CreateProduct;
