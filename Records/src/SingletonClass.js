//shared instance to store global values
export default class SingletonClass {

    static sharedInstance = null;

    //Variables
    _userUID = "";
    _username = "";
    _records = [];
    _friends = {};

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

    setUsername(username){
      this._username = username;
    }

    getUsername(){
      return this._username;
    }

    addRecord(record){
      this._records.push(record);
    }

    //Gets called to add a new record to the SingletonClass
    //Update how much each friend in the record owes the user
    willAddNewRecord(record){
      return new Promise((resolve)=> {
        this._records.push(record);
        resolve('Sucess');
      });
    }

    getRecords(){
      return this._records;
    }

    addFriend(uid, username){
      this._friends[uid] = username;
    }

    getFriends(){
      return this._friends;
    }

    //Clears the Singleton when the user logs out
    clearSingleton(){
      this._userUID = "";
      this._username = "";
      this._records = [];
      this._friends = {};
    }
}
