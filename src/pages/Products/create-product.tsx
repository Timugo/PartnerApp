/* CSS style file */
import "./create-product.scss";
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
  IonToast,
  IonActionSheet,
  useIonViewWillEnter,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
/* Ionic icons from ionic library  */
import { closeOutline, image, imageOutline, checkbox, checkboxOutline, trash, share, caretForwardCircle, heart, cameraOutline, codeWorking } from "ionicons/icons";
/* Services */
import { ProductService } from "../../services/product.service";
/* Capacitor plugins libraries */
import {
  Plugins,
  CameraResultType,
  CameraOptions,
  DeviceInfo,
  CameraSource
} from "@capacitor/core";
import { useHistory} from "react-router";
import { CameraPhoto } from "../../interfaces/cameraPhoto.interface";
import { FileConverter } from "./Services/fileConverter.service";
//instance of camera capacitor plugin
const { Camera, Device } = Plugins;

const CreateProduct: React.FC = () => {
  const history = useHistory();
  /* variables used in the page */
  const [devicePlatform, setDevicePlatform] = useState<"web" | "mobile" | "">("");
  /* Product Info */
  const [description, setDescription] = useState<string>("");
  const [timeArrival, setTimeArrival] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [characteristics, setCharasteristics] = useState<string>("");
  const [benefits, setBenefits] = useState<string>("");
  const [img, setImg] = useState<string>(" ");
  const [imgData, setImgData] = useState<any>(null);
  
  /* Extra components */
  const [showToast1, setShowToast1] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [showActionSheet, setShowActionSheet] = useState<boolean>(false);

  useIonViewWillEnter(() => {
    Device.getInfo()
      .then(device=>{
        if(device.platform === "web" || device.platform === "electron"){
          setDevicePlatform("web")
        }else{
          setDevicePlatform("mobile")
        }
      })
  });
  /*
    This function selects a standard file
    from device (HTML)
  */
  const SelectImageSource = async() =>{
    const buttons =[
      {
        text: 'Tomar Foto',
        icon: cameraOutline,
        handler: () => {
          PickPicture(CameraSource.Camera);
        }
      }, 
      {
        text: 'Seleccionar de la Galeria',
        icon: imageOutline,
        handler: () => {
          PickPicture(CameraSource.Photos);
        }
      }
    ]
  }
  /*
    This function handle a submit
    of a new product
  */
  const SendProduct = async () => {
    /* If the image isnt upload yet */
    if(!imgData){
      /* SHow and toast with message */
      setMessage("Debes Cargar una imagen");
      setShowToast1(true);
    }else{
      /* If the img was uploaded */
      /* Build the product with info */
      let productFormData = new FormData();
      productFormData.append("description", description);
      productFormData.append("benefits", benefits);
      productFormData.append("characteristics", characteristics);
      productFormData.append("deliveryDays", timeArrival.toString());
      productFormData.append("name", name);
      productFormData.append("file", imgData, `product_${name}`);
      productFormData.append("phone", "123456121"); //need to save temporal fix phone in the phone
      /* Make the reuest to create a product */
      ProductService.createProduct(productFormData)
        .then((response) => {
          /* Request success */
          if (response.status === 200) {
            /* The product was created! */
            if (response.data.response === 2) {
              /* Show a message */
              setMessage("Genial!!, se creo el producto");
              setShowToast1(true);
              /* Send to Create presentation */
              //history.push(`/products/presentation/${response.data.content.product["id"]}`);
            } else {
              setMessage("Error al crear el producto, intenta mas tarde");
              setShowToast1(true);
              console.log(response);
            }
          }
        })
        .catch((err) => {
          console.log(err);
          setMessage("Error al crear el producto, intenta mas tarde");
          setShowToast1(true);
        });
    }

  };
  
  /*
    This function Use the capacitor camera plugin
    to make a photo or select from gallery 
  */
  const PickPicture = async (source : CameraSource) => {
    /* 
      Use de capacitor plugin options here
      https://capacitor.ionicframework.com/docs/apis/camera#api
    */
    let configCamera: CameraOptions = {
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
    };
    //const image: CameraPhoto = await Camera.getPhoto(configCamera);
    Camera.getPhoto(configCamera)
      .then((image: CameraPhoto)=>{
        // image.webPath will contain a path that can be set as an image src.
        // You can access the original file using image.path, which can be
        // passed to the Filesystem API to read the raw data of the image,
        // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)

        /* Web path works to display the image in a img src */
        // if (image.webPath) {
        //   setMessage(image.webPath);
        //   //to show Img path
        //   setImg(image.webPath);
        //   setImgData(image.webPath);
        // }
        if (image.base64String) {
          //let dat = await FileConverter.convertFile(image.base64String,`image/${image.format}`,512);
          FileConverter.convertFile(image.base64String,`image/${image.format}`,512)
            .then(data =>{
              console.log(data);
              setImgData(data);
            })
            .catch(err=>{
              setMessage("Intenta con otro tipo de archivo");
              setShowToast1(true);      
            });
        }

      })
      .catch(err=>{
        setMessage("No se detecto ninguna camara");
        setShowToast1(true);
      });
    
    
  };
  const UploadFile = (event : any) =>{
    console.log(event);
  }

  return (

    <form noValidate onSubmit={SendProduct}>
      <IonPage id="homePage">
        {/* Begin Page Header */}
        <IonHeader className="ion-no-border">
          <IonToolbar>
            <IonTitle>Nuevo Producto</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* End of Page Header */}
        {/* Page Content */}
        <IonContent>
          {/* define ionic grid */}
          <IonGrid>
            {/* First Row */}
            <IonRow>
              <IonCol offset="1">
                <div className="ion-characteristics-start">
                  <h4>Crear Producto</h4>
                  <IonText color="medium">
                    Añade la informacion
                  </IonText>
                </div>
              </IonCol>
            </IonRow>

            {/* Second row */}
            <IonRow>
              <IonCol size="6">
                {
                  devicePlatform === "web" ?
                    /* If tge platform is web, then display html input*/ 
                    <IonItem>
                      <IonLabel position="stacked">Imagen</IonLabel>
                      <input type="file" onChange={(e)=>{UploadFile(e)}}/>
                    </IonItem>
                  : 
                    /* If plarform is mobile */
                    <IonItem>
                      <IonLabel position="stacked">Imagen</IonLabel>
                      <IonButton fill="outline" className={!imgData ? "" : "ion-hide"} >
                        <IonIcon slot="start" icon={imageOutline} />
                        Cargar
                      </IonButton>
                        <IonText color="medium" className={imgData ? "" : "ion-hide"}>
                          <div>
                            {`Cargada  `}
                            <IonIcon color="primary" slot="end" icon={checkboxOutline} />
                          </div>
                        </IonText>
                    </IonItem>
                }
              </IonCol>
              <IonCol size="6">
                <IonItem>
                  <IonLabel position="stacked">Tiempo de entrega</IonLabel>
                  <IonInput
                    type="number"
                    className="inputs"
                    autofocus={true}
                    value={timeArrival}
                    required={true}
                    placeholder="Dias"
                    onIonChange={(e) => setTimeArrival(parseInt(e.detail.value!))}>
                  </IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            {/* Row 3  */}
            <IonRow>
             
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
                      required={true}
                      onIonChange={(e) => setName(e.detail.value!)}>
                    </IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="stacked">Descripcion</IonLabel>
                    <IonInput
                      className="inputs"
                      value={description}
                      placeholder="Descripcion del Producto"
                      required={true}
                      onIonChange={(e) => setDescription(e.detail.value!)}>
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
                      rows={6}
                      cols={20}
                      required={true}
                      onIonChange={(e) => setCharasteristics(e.detail.value!)}>
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
                      rows={6}
                      cols={20}
                      required={true}
                      onIonChange={(e) => setBenefits(e.detail.value!)}>
                    </IonTextarea>
                  </IonItem>
                </IonList>
              </IonCol>
            </IonRow>
          </IonGrid>

          {/* Auxiliar Components */}
          <IonToast
            isOpen={showToast1}
            onDidDismiss={() => setShowToast1(false)}
            message={message}
            color="primary"
            duration={600}/>
          {/* End Of auxiliary components */}
        </IonContent>
        {/* End of page content */}
        {/* Begin footer page */}
        <IonFooter className="ButtonFooter">
          <IonGrid>
            <IonRow className="ion-align-items-end ion-justify-content-between">
              <IonCol size="6">
                <IonButton
                  routerLink="/tabs"
                  className="cancelButton"
                  expand="block"
                  fill="clear">
                  <IonIcon icon={closeOutline} slot="start" />
                  Cancelar
                </IonButton>
              </IonCol>
              <IonCol size="6">
                <IonButton type="submit" expand="block">
                  Crear
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonFooter>
        {/* End of footer page */}

        {/*Begin extra components*/}
        <IonActionSheet
        isOpen={showActionSheet}
        onDidDismiss={() => setShowActionSheet(false)}
        cssClass='my-custom-class'
        buttons={[]}>
      </IonActionSheet>
        {/*End extra components  */}
      </IonPage>
    </form>
  );
};

export default CreateProduct;
