
class StorageService{
    storage = localStorage;

    setItem(key:string,value:string):void{
        this.storage.setItem(key,value);
    }
    getItem(key:string):string|null{
        return this.storage.getItem(key);
    }

    removeItem(key:string){
        this.storage.removeItem(key);
    }

    clearStorage(){
        this.storage.clear();
    }

}


export const storageService = new StorageService();