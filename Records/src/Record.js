//Record Object the stores data of a single Record
export default class Record{
  _data = {};
  _title = "";

  constructor(dataSnapshot){
    this._data = dataSnapshot.val();
    this._title = dataSnapshot.key;
  }

  getAmountForPerson(person){
      return(this._data[person]);
  }

  getData(){
    return this._data;
  }

  getTitle(){
    return this._title;
  }
}
