//Given a new record will update the user's records data
//And how much their friends owe them
const willUpdateWithNewRecord = (record) => {
  return new Promise((resolve, reject) => {
    record.getData().forEach((friend)=>{
      console.log(friend);
      resolve('Success');
    })
  });
}

export {
  willUpdateWithNewRecord
}
