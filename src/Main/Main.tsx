import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Index } from '../Index/Index';

export const Main: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
    </BrowserRouter>
  );
};
