import { observer } from "mobx-react-lite";
import type { NextPage } from "next";
import React from "react";
import { MainPageStore } from "../stores/MainPageStore";

const store = new MainPageStore();

const Home: NextPage = function () {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-10">
        Приложение для расчета .lst файлов
      </h1>

      <input
        onChange={(e) => {
          if (e.target.files) {
            Array.from(e.target.files).forEach((file: File) =>
              store.addFile(file)
            );
          }
        }}
        type="file"
        multiple
      />

      <div>Всего загруженно файлов {store.files.length}</div>
      <div className="max-h-80 overflow-y-auto">
        <table className="table-auto w-full bg-gray-100">
          <thead className="sticky">
            <tr>
              <th className="text-left">№</th>
              <th className="text-left">Имя файла</th>
              <th className="text-left">Размер</th>
            </tr>
          </thead>

          <tbody className="">
            {store.files.map((f, idx) => (
              <tr
                className="p-2 border-b-2 border-gray-200  "
                key={f.id}
                title={f.tools
                  .map(
                    (t) =>
                      `id=${t.id}, название=${t.toolName}, количество=${t.count}`
                  )
                  .join("\n")}
              >
                <td>{idx + 1}</td>
                <td>{f.fileName}</td>
                <td>{`${(Number(f.size) / 1024).toFixed(1)} Кб`}</td>
                <td>
                  <button
                    className="p-2 rounded bg-grey-200 hover:bg-grey-300"
                    type="button"
                    onClick={() => store.removeFile(f.id)}
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-lg mt-10">Отчет по всем файлам</h2>
      <div>
        <table className="table-auto w-full bg-gray-100">
          <thead className="sticky">
            <tr>
              <th className="text-left">id</th>
              <th className="text-left">инструмент</th>
              <th className="text-left">количество</th>
            </tr>
          </thead>

          <tbody className="">
            {store.report.map((row) => (
              <tr className="p-2 border-b-2 border-gray-200  " key={row.id}>
                <td>{row.id}</td>
                <td>{row.toolName}</td>
                <td>{row.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default observer(Home);
