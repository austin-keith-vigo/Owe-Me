//Record Object the stores data of a single Record
export default class Record{
  _data = {};
  _title = "";

  constructor(title, data){
    this._data = data;
    this._title = title;
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
