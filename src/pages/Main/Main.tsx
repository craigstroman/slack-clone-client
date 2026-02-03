import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Index } from '../Index/Index';
import { Register } from '../Register/Register';
import { Login } from '../Login/Login';
import { ChangePassword } from '../ChangePassword/ChangePassword';
import { ForgotPassword } from '../ForgotPassword/ForgotPassword';

export const Main: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/change-password">
          <Route path=":token" element={<ChangePassword />} />
        </Route>
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
};
