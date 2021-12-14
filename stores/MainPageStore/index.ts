import { makeAutoObservable } from "mobx";
import { v4 } from "uuid";

export class MainPageStore {
  name: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  changeName = () => {
    this.name = v4();
  };
}

export default new MainPageStore();
