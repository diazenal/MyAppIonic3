export interface IData {
    id: number;
    name?: string;
    //สามารถมี function/method ก็ได้
}

export class Person {

      fname: string;
      lname: string;

      constructor() {

      }

      setFullname(fname: string, lname: string) {
        this.fname = fname;
        this.lname = lname;
      }

      getFullname() {
        let fullname = `${this.fname} ${this.lname}`;
        alert(fullname);
      }
    }