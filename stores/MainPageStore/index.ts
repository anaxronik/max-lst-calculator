import { makeAutoObservable } from "mobx";
import { v4 } from "uuid";

interface IFile {
  id: string;
  file: File;
}
export class MainPageStore {
  files: IFile[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addFile = async (file: File) => {
    const newFile = { id: v4(), file };
    this.files.push(newFile);
    console.log(newFile);
  };

  removeFile = (id: string) => {
    this.files = this.files.filter((f) => f.id !== id);
  };
}

export default new MainPageStore();
