//shared instance to store global values
export default class SingletonClass {

    static sharedInstance = null;

    //Variables
    _userUID = "";
    _records = [];

    //Gets called whenever the Singleton is being written or read from
    static getInstance() {
        if (SingletonClass.sharedInstance == null) {
            SingletonClass.sharedInstance = new SingletonClass();
        }

        return this.sharedInstance;
    }

    //Getters and Setters
    getUserUID() {
        return this._userUID;
    }

    setUserUID(uid) {
        this._userUID = uid;
    }

    addRecord(record){
      this._records.push(record);
    }

    getRecords(){
      return this._records;
    }

}
