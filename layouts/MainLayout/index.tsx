import React from 'react';

interface Props {
  children: React.ReactNode
}

const MainLayout: React.FC<Props> = function ({ children }) {
  return <div className="container mx-auto">
    <h1 className="text-2xl mb-2" >Приложение для расчета .lst файлов</h1>
    <div>{children}</div>
  </div>;
};

export default MainLayout;
