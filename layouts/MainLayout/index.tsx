import React from 'react';

interface Props {
  children: React.ReactNode
}

const MainLayout: React.FC<Props> = function ({ children }) {
  return <div className="container mx-auto">
    <h1 className="text-3xl font-bold" >Приложение для расчета .lst файлов</h1>
    <div className="mt-10">{children}</div>
  </div>;
};

export default MainLayout;
