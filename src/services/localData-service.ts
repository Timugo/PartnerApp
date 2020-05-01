/* Import Plugin from  capacitor */
import { Plugins } from '@capacitor/core';
/* Use storage plugin */
const { Storage } = Plugins;

/*
	This class provides a local storage handler
	You can save objects in device, save key -> value
	delete all keys etc
*/
export class LocalStorageService { 
   
	//save an object in the local storage
	static async saveObject(key :string ,object : any) {
			await Storage.set({
				key,
				value: JSON.stringify(object)
			}).then(res=>{
				return res;
			}).catch(err=>{
				return err;
			});
	}
	// Get an saved object and return it
	static async getObject(key:string) {
		const ret:any = await Storage.get({ key });
		const object = JSON.parse(ret.value);
		return object;
	}
	//Save an key->value item in the local storage
	static async saveItem(key:string,value:string) {
		await Storage.set({
			key,
			value
		});
	}
	//get an specifil imtem (key->value) 
	static async getItem(key:string) {
		return await Storage.get({ key })
	}
	//delete an item from the local storage and return true of error
	static async removeItem(key:string) {
		await Storage.remove({ key })
	}
	//Get all keys from items that are saved in the device
	static async getkeys() {
		const { keys } = await Storage.keys();
		return keys;
	}
	//Clear all the keys from items that are saved in the local storage
	static async clearStorage() {
		await Storage.clear();
}
      
}