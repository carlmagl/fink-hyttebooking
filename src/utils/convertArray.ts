import moment from "moment";
export interface Event {
  title: string;
  id: number;
  uid: String;
  creator: String;
  start: any;
  end: any;
  photoURL: String;
  createdAt: any;
}

export const convertArray = (array: any): Event[] => {
  var newArray = array;
  console.log(newArray);
  newArray.forEach((event: any) => {
    event.start = moment.unix(event.start.seconds).toDate();
    event.end = moment.unix(event.end.seconds).toDate();
  });
  return newArray;
};
