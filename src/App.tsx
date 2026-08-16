// TODO: Figure out why I am still getting errors with module.exports and also require, I have installed @types/node?

import React from 'react';
import { createRoot } from 'react-dom/client';

const element = document.getElementById('app');
const root = createRoot(element as HTMLDivElement);

export const App = () => {
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
};

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
