//shared instance to store global values
export default class SingletonClass {

    static sharedInstance = null;

    //Variables
    _userUID = "";
    _username = "";
    _records = [];
    _friends = {};
    _notifications = [];

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
    addNewRecord(record){
      this._records.push(record);

      recordData = record.getData();
      for(key in recordData){
        this._friends[key] += record.getAmountForPerson(key);
        this._friends[key] = Number(this._friends[key].toFixed(2));
      }
    }

    getRecords(){
      return this._records;
    }

    copyRecords(){

    }

    setRecords(records){
      this._records = records;
    }

    addFriend(username, amount){
      this._friends[username] = amount;
    }

    getFriends(){

      return {...this._friends};
    }

    getNotifications(){
      return [...this._notifications];
    }

    setNotifications(notifications){
      this._notifications = notifications;
    }

    addNotification(key, notification){
      this._notifications.push({id: key, data: notification});
    }

    removeNotification(notification){
      console.log(this._notifications);
      var newNotificationsData = []
      for(index = 0; index < this._notifications.length; ++index){
        if(this._notifications[index]['id'] != notification['id']){
          newNotificationsData.push(this._notifications[index]);
        }
      }
      this._notifications = newNotificationsData;
    }

    //Gets all the records for the friend
    getRecordsForFriend(friendName) {
      var records = [];

      for(index = 0; index < this._records.length; ++index){
        for(friend in this._records[index]._data){
          if(friendName == friend) {
            records.push({
              title: this._records[index].getTitle(),
              amountOwed: this._records[index]._data[friend]
            });
          }
        };
      };

      return records;
    }

    //Clears the Singleton when the user logs out
    clearSingleton(){
      this._userUID = "";
      this._username = "";
      this._records = [];
      this._friends = {};
      this._notifications = [];
    }




}
