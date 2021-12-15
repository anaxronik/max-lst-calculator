import React from "react";
import type { NextPage } from "next";
import { observer } from "mobx-react-lite";
import MainLayout from "../layouts/MainLayout";
import { MainPageStore } from "../stores/MainPageStore";

const store = new MainPageStore();

const Home: NextPage = function () {
  return (
    <MainLayout>
      <input
        type="file"
        accept=".lst"
        multiple
        onChange={(e) => {
          const { files } = e.target;
          if (files) {
            Array.from(files).forEach((file) => {
              store.addFile(file);
            });
          }
        }}
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
              >
                <td>{idx + 1}</td>
                <td>{f.file.name}</td>
                <td>{`${(Number(f.file.size) / 1024).toFixed(1)} Кб`}</td>
                <td>
                  <button className="p-2 rounded bg-grey-200 hover:bg-grey-300" type="button" onClick={() => store.removeFile(f.id)}>Удалить</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-lg mt-10">Отчет</h2>
      <div>asdsd</div>
    </MainLayout>
  );
};

export default observer(Home);
