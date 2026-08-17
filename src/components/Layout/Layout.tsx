import React from 'react';
import { Navbar } from '../Navbar/Navbar';
import { BaseLayoutProps } from '../../shared/Interfaces';

export const Layout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <div className="container">
      <Navbar />
      {children}
    </div>
  );
};
