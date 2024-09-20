import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'
import * as Icon from 'react-bootstrap-icons';


const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
        email,
        password,
      });

      const token = response.data.access_token;
      const msg = response.data.message;
      localStorage.setItem('token', token);
      localStorage.setItem('msg', msg);
      navigate('/dashboard');
    } catch (error) {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className="contenedor-login">
      <div className="login">
        <h2 className="sidebar-title">Hospital RP</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Icon.EyeSlash /> : <Icon.EyeFill />}
              </button>
            </div>
          </div>
          {error && <p className="text-danger">{error}</p>}
          <button type="button" className="btn login-btn" onClick={handleLogin}>
            INGRESAR
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
