import React from 'react';
import type { NextPage } from 'next';
import MainLayout from '../layouts/MainLayout';

const Home: NextPage = function () {


  return (
    <MainLayout>
      <input type="file" accept='.lst' multiple onChange={(e) => {
        console.log(e.target.files);

      }} />
    </MainLayout>
  );
};

export default Home;
