import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { getToken } from '../service/AuthService';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const navigate = React.useNavigate();

  return (
    <Routes>
      <Route
        {...rest}
        element={getToken() ? <Element /> : <Navigate to="/login" replace />}
      />
    </Routes>
  );
};

export default PrivateRoute;
