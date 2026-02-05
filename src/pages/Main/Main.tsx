import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Register } from '../Register/Register';
import { Login } from '../Login/Login';
import { ChangePassword } from '../ChangePassword/ChangePassword';
import { ForgotPassword } from '../ForgotPassword/ForgotPassword';

export const Main: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
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
