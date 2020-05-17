export interface CameraPhoto {
    // The base64 encoded string representation of the image, if using CameraResultType.Base64.
    base64String ?: string;
    // The url starting with 'data:image/jpeg;base64,' and the base64 encoded string representation of the image, if using CameraResultType.DataUrl.
    dataUrl ?: string;
    // Exif data, if any, retrieved from the image
    exif ?: any;
    // The format of the image. Currently, only "jpeg" is supported.
    format : string;
    // If using CameraResultType.Uri, the path will contain a full, platform-specific file URL that can be read later using the Filsystem API.
    path ?: string;
    // webPath returns a path that can be used to set the src attribute of an image for efficient loading and rendering.
    webPath ?: string;
}

export interface CameraOptions {
    // Whether to allow the user to crop or make small edits (platform specific)
    allowEditing ?: boolean;
    // Whether to automatically rotate the image "up" to correct for orientation in portrait mode Default: true
    correctOrientation ?: boolean;
    // iOS only: The default camera direction. By default the rear camera. Default: CameraDirection.Rear
    direction ?:string;//CameraDirection
    // The height of the saved image
    height ?: number;
    // iOS only: The presentation style of the Camera. Defaults to fullscreen.
    presentationStyle ?: any;
    promptLabelCancel ?: string;
    // If use CameraSource.Prompt only, can change Prompt label. default: promptLabelHeader : 'Photo' // iOS only promptLabelCancel : 'Cancel' // iOS only promptLabelPhoto : 'From Photos' promptLabelPicture : 'Take Picture'
    promptLabelHeader ?: string;
    promptLabelPhoto ?: string;
    promptLabelPicture ?: string;
    // The quality of image to return as JPEG, from 0-100
    quality ?: number;
    // How the data should be returned. Currently, only 'Base64', 'DataUrl' or 'Uri' is supported
    resultType : string; //CameraResultType object
    // Whether to save the photo to the gallery. If the photo was picked from the gallery, it will only be saved if edited. Default: false
    saveToGallery ?: boolean;
    // The source to get the photo from. By default this prompts the user to select either the photo album or take a photo. Default: CameraSource.Prompt
    source ?: string; //CameraSource
    // The width of the saved image
    width ?: number;
}


// CameraDirection
// enum CameraDirection {
// Front: "FRONT"
// Rear: "REAR"
// }
// CameraResultType
// enum CameraResultType {
// Base64: "base64"
// DataUrl: "dataUrl"
// Uri: "uri"
// }
// CameraSource
// enum CameraSource {
// Camera: "CAMERA"
// Photos: "PHOTOS"
// Prompt: "PROMPT"
// }