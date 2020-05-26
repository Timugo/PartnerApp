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
  IonAlert,
} from "@ionic/react";
import React, { useState } from "react";
/* Ionic icons from ionic library  */
import { closeOutline, image } from "ionicons/icons";
/* Services */
import { ProductService } from "../../services/product.service";
/* Interfaces */
import { Presentation } from "../../interfaces/product.interface";
/* Capacitor plugins libraries */
import {
  Plugins,
  CameraResultType,
  CameraOptions,
  CameraSource,
} from "@capacitor/core";
import { useHistory, RouteComponentProps } from "react-router";
import { CameraPhoto } from "../../interfaces/cameraPhoto.interface";
import { FileConverter } from "./Services/fileConverter.service";

//instance of camera capacitor plugin
const { Camera } = Plugins;
interface OwnProps {}
/* Variables props */
interface PageProps {
  idProduct?: string;
}
interface PageProps extends RouteComponentProps<{
  id: string;
}> {}
/* Union of all properties to inject into component */
type ProductModalProps = OwnProps & PageProps;
/* Match let to get info from url params and path */
const CreatePresentation: React.FC<PageProps> = ({ match }) => {
  /* Used to redirect pages */
  const history = useHistory();
  
  /* variables used in the page */
  const [idProduct, setIdProduct] = useState<string>(match.params.id);
  
  const [status, setStatus] = useState<string>("");
  const [stock, setStock] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [volume, setVolumen] = useState<string>("");
  const [volumex, setVolumex] = useState<string>("");
  const [volumey, setVolumey] = useState<string>("");
  const [volumez, setVolumez] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [reference, setReference] = useState<string>("");
  const [img, setImg] = useState<string>(" ");
  const [imgData, setImgData] = useState<any>();

  /* Ui Utils */
  const [showToast1, setShowToast1] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [showAlert1, setShowAlert1] = useState(false);

  /*
  This function handle a submit
  of a new product
  */
  const SendPresentation = async () => {
    let presentationFormData = new FormData();
    presentationFormData.append("reference", reference);
    presentationFormData.append("status", status);
    presentationFormData.append("description", description);
    presentationFormData.append("sizes",volumex + "x" + volumey + "x" + volumez);
    presentationFormData.append("volume", volume);
    presentationFormData.append("weigth", weight);
    presentationFormData.append("file", imgData, `product_${reference}`);
    presentationFormData.append("price", price.toString());
    presentationFormData.append("stock", stock.toString());

    ProductService.createPresentation(presentationFormData,idProduct)
      .then((response) => {
        if (response.status === 200) {
          if (response.data.response === 2) {
            setMessage("Genial!!, se creo la prsentación");
            setShowToast1(true);
           
            // history.push("/home");
          } else {
            setMessage("Error al crear la presentación , intenta mas tarde");
            setShowToast1(true);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        setMessage(
          "Error al crear al crear la presentación, intenta mas tarde"
        );
        setShowToast1(true);
      });
  };
  /*
    This function Use the capacitor camera plugin
    to make a photo or select from gallery 
  */
  const PickPicture = async () => {
    /* 
      Use de capacitor plugin options here
      https://capacitor.ionicframework.com/docs/apis/camera#api
    */
    let configCamera: CameraOptions = {
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
    };
    const image: CameraPhoto = await Camera.getPhoto(configCamera);
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    if (image.webPath) {
      setMessage(image.webPath);
      //to show Img path
      setImg(image.webPath);
      setImgData(image.webPath);
    }
    if (image.base64String) {
      let dat = await FileConverter.convertFile(image.base64String,`image/${image.format}`,512);
      console.log(dat);
      setImgData(dat);
    }
    console.log("informacion de la imgagen: ", image);
    //console.log(buffer);
  };

  return (
    <IonPage id="homePage">
      {/* Page Header */}
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle>Nueva Presentación</IonTitle>
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
              <div className="ion-description-start">
                <h4>Crear Producto</h4>
                <IonText color="medium">
                  Añade la informacion de la presentación que quieres crear
                </IonText>
              </div>
            </IonCol>
          </IonRow>
          {/* Second row */}
          <IonRow>
            <IonCol offset="4" size="4">
              <IonImg src={img}></IonImg>
            </IonCol>
            <IonCol offset="3" size="6">
              <IonButton size="small" onClick={PickPicture}>
                {" "}
                Seleccionar fotografia
              </IonButton>
            </IonCol>
          </IonRow>
          {/* Row 3  */}
          <IonRow>
            <IonCol size="4">
              <IonItem>
                <IonLabel position="stacked">Referencia</IonLabel>
                <IonInput
                  type="text"
                  className="inputs"
                  autofocus={true}
                  value={reference}
                  placeholder="referencia"
                  onIonChange={(e) => setReference(e.detail.value!)}
                ></IonInput>
              </IonItem>
            </IonCol>
            <IonCol size="4">
              <IonItem>
                <IonLabel position="stacked">Precio</IonLabel>
                <IonInput
                  type="number"
                  className="inputs"
                  autofocus={true}
                  value={price}
                  placeholder="pesos"
                  onIonChange={(e) => setPrice(parseInt(e.detail.value!))}
                ></IonInput>
              </IonItem>
            </IonCol>
            <IonCol size="4">
              <IonItem>
                <IonLabel position="stacked">Stock</IonLabel>
                <IonInput
                  type="number"
                  className="inputs"
                  autofocus={true}
                  value={stock}
                  placeholder="Cantidad"
                  onIonChange={(e) => setStock(parseInt(e.detail.value!))}
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          {/* Row 4  */}
          <IonRow>
            <IonCol>
              <IonList>
                <IonItem>
                  <IonLabel position="stacked">Peso</IonLabel>
                  <IonInput
                    className="inputs"
                    autofocus={true}
                    value={weight}
                    placeholder="Kg"
                    onIonChange={(e) => setWeight(e.detail.value!)}
                  ></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Volumen</IonLabel>
                  <IonInput
                    className="inputs"
                    autofocus={true}
                    value={volume}
                    placeholder="ejemplo(300ml)"
                    onIonChange={(e) => setVolumen(e.detail.value!)}
                  ></IonInput>
                </IonItem>

                <IonRow>
                  <IonCol>
                    <IonItem>
                      <IonLabel position="stacked">Ancho</IonLabel>
                      <IonInput
                        className="inputs"
                        value={volumex}
                        placeholder="cm"
                        onIonChange={(e) => setVolumex(e.detail.value!)}
                      ></IonInput>
                    </IonItem>
                  </IonCol>
                  
                  <IonCol>
                    <IonItem>
                      <IonLabel position="stacked">Alto</IonLabel>
                      <IonInput
                        className="inputs"
                        value={volumey}
                        placeholder="cm"
                        onIonChange={(e) => setVolumey(e.detail.value!)}
                      ></IonInput>
                    </IonItem>
                  </IonCol>
                  
                  <IonCol>
                    <IonItem>
                      <IonLabel position="stacked">Profundidad</IonLabel>
                      <IonInput
                        className="inputs"
                        value={volumez}
                        placeholder="cm"
                        onIonChange={(e) => setVolumez(e.detail.value!)}
                      ></IonInput>
                    </IonItem>
                  </IonCol>
                </IonRow>
                <IonItem>
                  <IonLabel position="stacked">Descripción</IonLabel>
                  <IonTextarea
                    className="inputs"
                    placeholder="Descripvión de la pressentación (maximo 400 palabras)"
                    autoGrow={true}
                    maxlength={400}
                    value={description}
                    rows={6}
                    cols={20}
                    onIonChange={(e) => setDescription(e.detail.value!)}
                  ></IonTextarea>
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Estado</IonLabel>
                  <IonTextarea
                    className="inputs"
                    placeholder="(Disponible,NoDisponible)"
                    autoGrow={true}
                    maxlength={400}
                    value={status}
                    rows={6}
                    cols={20}
                    onIonChange={(e) => setStatus(e.detail.value!)}
                  ></IonTextarea>
                </IonItem>
              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>

      {/* Define bottom of the page ionic footer */}
      <IonFooter className="ButtonFooter">
        <IonGrid>
          <IonRow className="ion-align-items-end ion-justify-content-between">
            <IonCol size="6">
              <IonButton
                href="tabs/"
                className="cancelButton"
                expand="block"
                fill="clear">
                <IonIcon icon={closeOutline} slot="start" />
                Cancelar
              </IonButton>
            </IonCol>
            <IonCol size="6">
              <IonButton expand="block" onClick={SendPresentation}>
                Agregar
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonFooter>
    </IonPage>
  );
};

export default CreatePresentation;
