import axios from 'axios';
import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './SidebarLayout.css';
import * as Icon from 'react-bootstrap-icons';

const SidebarLayout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(`${import.meta.env.VITE_API_URL}/logout`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            localStorage.removeItem('token');
            navigate('/');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const msg = localStorage.getItem('msg');


    return (
        <div className="d-flex flex-column flex-md-row">
            <button className="toggle-sidebar btn btn-secondary" onClick={toggleSidebar}>
                {isSidebarOpen ? 'Cerrar' : 'Abrir'} Menú
            </button>
            <nav className={`sidebar p-3 ${isSidebarOpen ? 'active' : ''}`}>
                <h2 className="sidebar-title">Hospital RP</h2>
                <ul className="list-unstyled">
                    <li className='welcome'>
                        <p>¡{msg}!</p>
                    </li>

                    <li>
                        <Icon.PeopleFill />
                        <Link to="/dashboard/pacientes">Pacientes</Link>
                    </li>
                    <li>
                        <Icon.BoxArrowDownLeft />
                        <a className="" onClick={handleLogout}>
                            Cerrar Sesión
                        </a>
                    </li>
                </ul>
            </nav>
            <div className="content p-3">
                <Outlet />
            </div>
        </div>
    );
};

export default SidebarLayout;
