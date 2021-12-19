import { makeAutoObservable, runInAction } from "mobx";
import { v4 } from "uuid";

interface IFile {
  id: string;
  size: number;
  fileName: string;
  tools: ITool[];
}

interface ITool {
  id: string;
  count: number;
  toolName: string;
}

export class MainPageStore {
  files: IFile[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addFile = async (file: File) => {
    runInAction(() => {
      const reader = new FileReader();
      reader.onload = () => {
        runInAction(() => {
          const { result } = reader;
          const text = String(result);
          const rows = text.split(/\r?\n/);
          // TOOLS
          const startRow = "BEGIN_PUNCHING_TOOL_USAGE";
          const finishRow = "ENDE_PUNCHING_TOOL_USAGE";
          const startIndex = rows.findIndex((row) => row.includes(startRow));
          const finishIndex = rows.findIndex((row) => row.includes(finishRow));
          const f2 = rows.slice(startIndex, finishIndex);
          const f3 = f2.filter((row) => !!String(row).match(/^DA/));
          const f4 = f3.map((row) => row.split(","));

          // descroption tools
          const tools = f4.map((row) => {
            const id = String(row[1]).replace(/\'/g, "");
            const count = Number(row[2]);
            const toolNameRow = String(
              rows.find((row) => row.includes(`*  '${id}'`))
            ).split(",")[1];
            const toolName = String(toolNameRow).replace(/\'/g, "");
            return { id, count, toolName };
          });

          const newFile: IFile = {
            id: v4(),
            size: file.size,
            fileName: file.name,
            tools,
          };
          this.files.push(newFile);
        });
      };
      reader.readAsText(file);
    });
  };

  removeFile = (id: string) => {
    this.files = this.files.filter((f) => f.id !== id);
  };

  get report(): { id: string; toolName: string; count: number }[] {
    const result: { id: string; toolName: string; count: number }[] = [];
    this.files.forEach((file) => {
      file.tools.forEach((tool) => {
        if (result.find((row) => row.id === tool.id)) {
          // если уже есть в списке
          const rowIndex = result.findIndex((row) => row.id === tool.id);
          result[rowIndex] = {
            ...result[rowIndex],
            count: result[rowIndex].count + tool.count,
          };
        } else {
          result.push({
            id: tool.id,
            toolName: tool.toolName,
            count: tool.count,
          });
        }
      });
    });
    return result;
  }
}

export default new MainPageStore();
