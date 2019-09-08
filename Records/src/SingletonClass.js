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

    getRecords(){
      return this._records;
    }

    addFriend(uid, username){
      this._friends[uid] = username;
    }

    getFriends(){
      return this._friends;
    }

    getFriendUsername(uid){
      return this._friends[uid];
    }

}
