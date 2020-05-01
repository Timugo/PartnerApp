import { IonContent, IonPage,IonButton,IonFooter, IonGrid, IonRow, IonCol, IonLabel, IonText, IonIcon, IonList, IonItem, IonInput, IonTextarea, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonBackButton, IonImg, IonToast} from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
//import ExploreContainer from '../components/ExploreContainer';
import './create-product.scss';

const { Camera } = Plugins;


const CreateProduct: React.FC = () => {

  const [ description, setDescription ] = useState<string>("");
  const [ value, setValue ] = useState<number>(0);
  const [ name, setName ] = useState<string>("");
  const [ characteristics, setCharasteristics] = useState<string>("");
  const [ benefits, setBenefits ] = useState<string>("");
  const [ img,setImg ] = useState<string>("assets/img/post.svg");
  const [showToast1, setShowToast1] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("Agregaste un nuevo articulo");
  
  const PickPicture = async() =>{
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      height : 300,
      width : 300,
      resultType: CameraResultType.Uri
    });
    // image.webPath will contain a path that can be set as an image src. 
    // You can access the original file using image.path, which can be 
    // passed to the Filesystem API to read the raw data of the image, 
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    
    
    if(image.webPath){
      setMessage(image.webPath);
      setImg(image.webPath);
      setShowToast1(true);
    }
  }
  return (
    <IonPage id="homePage">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          
          
          <IonTitle>Nuevo Producto</IonTitle>
        </IonToolbar>
      </IonHeader> 
      <IonContent>
        <IonHeader className="ion-no-border" collapse="condense">
          <IonToolbar  >
            <IonButtons>
            </IonButtons>  
            
          </IonToolbar>
        </IonHeader>

        
        <IonToast
          isOpen={showToast1}
          onDidDismiss={() => setShowToast1(false)}
          message={message}
          duration={500}
        />
        <IonGrid>
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
          <IonRow >
            <IonCol offset="4" size="4">
              <IonImg src={img}></IonImg>
            </IonCol>
            <IonCol offset="3" size="6">
              <IonButton size="small" onClick={PickPicture}> Seleccionar fotografia</IonButton>
              
            </IonCol>
          </IonRow>
          <IonRow>
            
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Precio</IonLabel>
                <IonInput type="number" className="inputs" autofocus={true} value={value} placeholder="En pesos"> </IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="6">
              <IonItem>
                <IonLabel position="stacked">Precio</IonLabel>
                <IonInput type="number" className="inputs" autofocus={true} value={name} placeholder="En pesos"> </IonInput>
              </IonItem>
            </IonCol>
            <IonCol size="6">
              <IonItem>
                <IonLabel position="stacked">Tiempo de entrega</IonLabel>
                <IonInput type="number" className="inputs" autofocus={true} value={name} placeholder="Dias"> </IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonList>
                <IonItem>
                  <IonLabel position="stacked">Nombre</IonLabel>
                  <IonInput className="inputs" autofocus={true} value={name} placeholder="Nombre del producto"> </IonInput>
                </IonItem>
              
                <IonItem>
                  <IonLabel position="stacked">Descripcion</IonLabel>
                  <IonInput className="inputs" value={description} placeholder="Descripcion del Producto"> </IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Caracteriticas</IonLabel>
                  <IonTextarea 
                    className="inputs"
                    placeholder="Caracteristicas de tu producto (maximo 400 palabras)"
                    autoGrow={true}
                    maxlength={400}     
                    value={characteristics }
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
                    value={characteristics}
                    rows={6} cols={20}
                    onIonChange={e => setCharasteristics(e.detail.value!)}>
                  </IonTextarea>
                </IonItem>
              </IonList>
            </IonCol>
          </IonRow>
          
        </IonGrid>
        
      </IonContent>

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
              <IonButton expand="block" onClick={()=>{setShowToast1(true)}} >Crear</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonFooter>
    </IonPage>
  );
};

export default CreateProduct;
