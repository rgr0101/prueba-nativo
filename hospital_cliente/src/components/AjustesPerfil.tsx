import React, { useState } from 'react';
import axios from 'axios';

const AjustesPerfil: React.FC = () => {
  const [nombre, setNombre] = useState<string>('Usuario');

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:8000/api/ajustes-perfil', { nombre }, {
        headers: {
          Authorization: `Bearer ${token}`  // Enviar el token Bearer
        }
      });
      alert('Perfil actualizado');
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
    }
  };

  return (
    <div>
      <h2>Ajustes de Perfil</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleSave}>
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default AjustesPerfil;
