import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import SidebarLayout from './components/SidebarLayout';
import Pacientes from './components/Pacientes';
//import AjustesPerfil from './components/AjustesPerfil';
import PrivateRoute from './components/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute><SidebarLayout /></PrivateRoute>}
        >
          <Route path="pacientes" element={<Pacientes />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;