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
            Array.from(e.target.files).forEach((file: File) => store.addFile(file));
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
              <tr className="p-2 border-b-2 border-gray-200  " key={f.id}>
                <td>{idx + 1}</td>
                <td>{f.file.name}</td>
                <td>{`${(Number(f.size) / 1024).toFixed(1)} Кб`}</td>
                <td>{f.result} </td>
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

      <h2 className="text-lg mt-10">Отчет</h2>
      <div>asdsd</div>
    </div>
  );
};

export default observer(Home);
