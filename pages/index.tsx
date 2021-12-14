import React from 'react';
import type { NextPage } from 'next';
import { observer } from 'mobx-react-lite';
import MainLayout from '../layouts/MainLayout';
import { MainPageStore } from '../stores/MainPageStore';

const store = new MainPageStore()

const Home: NextPage = function () {
  return (
    <MainLayout>
      <input type="file" accept='.lst' multiple onChange={(e) => {
        console.log(e.target.files);

      }} />
      <div>{store.name}</div>
      <button type='button' onClick={() => store.changeName()}> click</button>
    </MainLayout >
  );
};

export default observer(Home);
