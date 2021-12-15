import { makeAutoObservable } from "mobx";
import { v4 } from "uuid";

interface IFile {
  id: string;
  result: string | ArrayBuffer | null;
  file: File;
  size: number;
}
export class MainPageStore {
  files: IFile[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const { result } = reader;
      const newFile: IFile = {
        id: v4(),
        file,
        result,
        size: file.size,
      };
      this.files.push(newFile);
    };
    reader.readAsText(file);
  };

  removeFile = (id: string) => {
    this.files = this.files.filter((f) => f.id !== id);
  };
}

export default new MainPageStore();
