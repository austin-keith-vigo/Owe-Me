//Record Object the stores data of a single Record
export default class Record{
  _data = {};
  _title = "";

  //If given a dictionary, for instance given it from firebase
  constructor(title, data){
    this._data = data;
    this._title = title;
  }

  getAmountForPerson(person){
      return(this._data[person]);
  }

  setData(data){
    this._data = data;
  }
  
  getData(){
    return this._data;
  }

  getTitle(){
    return this._title;
  }
}
