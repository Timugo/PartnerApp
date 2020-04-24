import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

export class LocalStorageService { 
   
    constructor(){}
		//save an object in the local storage
    	async saveObject(key :string ,object : any) {
			await Storage.set({
				key,
				value: JSON.stringify(object)
			}).then(res=>{
				return true;
			}).catch(err=>{
				return err;
			});
		}
		// Get an saved object and return it
		async getObject(key:string) {
			const ret:any = await Storage.get({ key });
			const object = JSON.parse(ret.value);
			return object;
		}
		//Save an key->value item in the local storage
		async saveItem(key:string,value:string) {
			await Storage.set({
				key,
				value
			});
		}
		//get an specifil imtem (key->value) 
		async getItem(key:string) {
			await Storage.get({ key }).then((res)=>{
				//if success
				return res.value;
			}).catch((err)=>{
				//if an error ocurrs
				return err;
			});
		}
		//delete an item from the local storage and return true of error
		async removeItem(key:string) {
			await Storage.remove({ key }).then((res)=>{
				return true;
			}).catch((err)=>{
				return err;
			});
		}
		//Get all keys from items that are saved in the device
		async getkeys() {
			const { keys } = await Storage.keys();
			return keys;
		}
		//Clear all the keys from items that are saved in the local storage
		async clearStorage() {
			await Storage.clear().then((res)=>{
				return true;
			}).catch((err)=>{
				return err;
			});
}
      
}