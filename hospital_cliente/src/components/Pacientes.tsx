import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { Modal } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import Swal from 'sweetalert2'
import './Pacientes.css'
import ReportePaciente from './ReportePaciente';

interface Paciente {
    id: number;
    nombre_completo: string;
    edad: number;
    sexo: string;
    fecha_nacimiento: string;
    ciudad_origen: string;
    fecha_inscripcion: string;
    hospital: string;
    nombre_tutor: string;
    telefono_tutor: string;
}

const Pacientes: React.FC = () => {
    const [pacientes, setPacientes] = useState<Paciente[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [modalShow, setModalShow] = useState(false);
    const [modalDeleteShow, setModalDeleteShow] = useState(false);
    const [modalEditShow, setModalEditShow] = useState(false);
    const [selectedPaciente, setSelectedPaciente] = useState<Paciente | null>(null);
    const [newPaciente, setNewPaciente] = useState<Paciente>({
        id: 0,
        nombre_completo: '',
        edad: 0,
        sexo: '',
        fecha_nacimiento: '',
        ciudad_origen: '',
        fecha_inscripcion: '',
        hospital: '',
        nombre_tutor: '',
        telefono_tutor: '',
    });

    useEffect(() => {
        const fetchPacientes = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/pacientes`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setPacientes(response.data);
            } catch (error) {
                setError('Error al obtener los pacientes');
                console.error('Error al obtener los pacientes:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPacientes();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${import.meta.env.VITE_API_URL}/pacientes/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPacientes(pacientes.filter(paciente => paciente.id !== id));
            setModalDeleteShow(false);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "El paciente ha sido eliminado con éxito.",
                showConfirmButton: false,
                timer: 2500
            });
        } catch (error) {
            console.error('Error al eliminar el paciente:', error);
        }
    };

    const handleAddPaciente = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/pacientes`, newPaciente, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPacientes([...pacientes, response.data]);
            setModalShow(false);
            setNewPaciente({ id: 0, nombre_completo: '', edad: 0, sexo: '', fecha_nacimiento: '', ciudad_origen: '', fecha_inscripcion: '', hospital: '', nombre_tutor: '', telefono_tutor: '' });
            Swal.fire({
                position: "center",
                icon: "success",
                title: "El paciente ha sido agregado con éxito.",
                showConfirmButton: false,
                timer: 2500
            });
        } catch (error) {
            console.error('Error al agregar el paciente:', error);
        }
    };

    const handleEditPaciente = async () => {
        if (selectedPaciente) {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.put(`${import.meta.env.VITE_API_URL}/pacientes/${selectedPaciente.id}`, selectedPaciente, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                //console.log(response.data);
                setPacientes(pacientes.map(paciente => paciente.id === response.data.id ? response.data : paciente));
                setModalEditShow(false);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "El paciente ha sido editado con éxito.",
                    showConfirmButton: false,
                    timer: 2500
                });
            } catch (error) {
                console.error('Error al editar el paciente:', error);
            }
        }
    };

    const columns = [
        {
            name: 'ID',
            selector: (row: Paciente) => row.id,
            sortable: true,
        },
        {
            name: 'Nombre Completo',
            selector: (row: Paciente) => row.nombre_completo,
            sortable: true,
        },
        {
            name: 'Edad',
            selector: (row: Paciente) => row.edad,
            sortable: true,
        },
        {
            name: 'Sexo',
            selector: (row: Paciente) => row.sexo,
            sortable: true,
        },
        {
            name: 'Ciudad de Origen',
            selector: (row: Paciente) => row.ciudad_origen,
            sortable: true,
        },
        {
            name: 'Hospital',
            selector: (row: Paciente) => row.hospital,
            sortable: true,
        },
        {
            name: 'Tutor',
            selector: (row: Paciente) => row.nombre_tutor,
            sortable: true,
        },
        {
            name: 'Acciones',
            cell: (row: Paciente) => (
                <div className='tabla-actions'>
                    <ReportePaciente paciente={row} />
                    <button className="btn btn-warning btn-sm" onClick={() => {
                        setSelectedPaciente(row);
                        setModalEditShow(true);
                    }}>
                        <Icon.PenFill />
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => {
                        setSelectedPaciente(row);
                        setModalDeleteShow(true);
                    }}>
                        <Icon.Trash2Fill />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className='mt-4 seccion-pacientes'>
            <h2 className='titulo'>Pacientes</h2>
            <div className="contenedor-btn">
                <button className="btn agregar" onClick={() => setModalShow(true)}>
                    Añadir
                </button>
            </div>
            {loading ? (
                <div className="contenedor-loader">
                    <div className="loader"></div>
                </div>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className="data-table-container">
                    <DataTable
                        className="data-table"
                        columns={columns}
                        data={pacientes}
                        pagination
                        highlightOnHover
                        striped
                        noDataComponent="No se encontraron pacientes"
                        paginationComponentOptions={{
                            rowsPerPageText: 'Filas por página',
                            rangeSeparatorText: 'de',
                            selectAllRowsItem: true,
                            selectAllRowsItemText: 'Todo'
                        }}
                    />
                </div>
            )}

            {/* Modal eliminar */}
            <Modal show={modalDeleteShow} onHide={() => setModalDeleteShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que deseas eliminar al paciente {selectedPaciente?.nombre_completo}?
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={() => setModalDeleteShow(false)}>Cancelar</button>
                    <button className="btn btn-danger" onClick={() => {
                        if (selectedPaciente) {
                            handleDelete(selectedPaciente.id);
                            setModalDeleteShow(false);
                        }
                    }}>
                        Eliminar
                    </button>
                </Modal.Footer>
            </Modal>

            {/* Modal agregar */}
            <Modal show={modalShow} onHide={() => setModalShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Paciente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className='row'>
                        <div className="mb-3 col-md-6">
                            <label htmlFor="nombre_completo" className="form-label">Nombre Completo</label>
                            <input type="text" className="form-control" id="nombre_completo" value={newPaciente.nombre_completo} onChange={(e) => setNewPaciente({ ...newPaciente, nombre_completo: e.target.value })} required />
                        </div>
                        <div className="mb-3 col-md-6">
                            <label htmlFor="edad" className="form-label">Edad</label>
                            <input type="number" className="form-control" id="edad" value={newPaciente.edad} onChange={(e) => setNewPaciente({ ...newPaciente, edad: +e.target.value })} required />
                        </div>
                        <div className="mb-3 col-md-6">
                            <label htmlFor="sexo" className="form-label">Sexo</label>
                            <select className="form-control" id="sexo" value={newPaciente.sexo} onChange={(e) => setNewPaciente({ ...newPaciente, sexo: e.target.value })} required>
                                <option value="">Seleccionar</option>
                                <option value="M">Masculino</option>
                                <option value="F">Femenino</option>
                            </select>
                        </div>
                        <div className="mb-3 col-md-6">
                            <label htmlFor="fecha_nacimiento" className="form-label">Fecha de Nacimiento</label>
                            <input type="date" className="form-control" id="fecha_nacimiento" value={newPaciente.fecha_nacimiento} onChange={(e) => setNewPaciente({ ...newPaciente, fecha_nacimiento: e.target.value })} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="ciudad_origen" className="form-label">Ciudad de Origen</label>
                            <input type="text" className="form-control" id="ciudad_origen" value={newPaciente.ciudad_origen} onChange={(e) => setNewPaciente({ ...newPaciente, ciudad_origen: e.target.value })} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="hospital" className="form-label">Hospital</label>
                            <input type="text" className="form-control" id="hospital" value={newPaciente.hospital} onChange={(e) => setNewPaciente({ ...newPaciente, hospital: e.target.value })} required />
                        </div>
                        <div className="mb-3 col-md-6">
                            <label htmlFor="nombre_tutor" className="form-label">Nombre del Tutor</label>
                            <input type="text" className="form-control" id="nombre_tutor" value={newPaciente.nombre_tutor} onChange={(e) => setNewPaciente({ ...newPaciente, nombre_tutor: e.target.value })} required />
                        </div>
                        <div className="mb-3 col-md-6">
                            <label htmlFor="telefono_tutor" className="form-label">Teléfono del Tutor</label>
                            <input type="text" className="form-control" id="telefono_tutor" value={newPaciente.telefono_tutor} onChange={(e) => setNewPaciente({ ...newPaciente, telefono_tutor: e.target.value })} required />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={() => setModalShow(false)}>Cancelar</button>
                    <button className="btn btn-primary" onClick={handleAddPaciente}>Agregar</button>
                </Modal.Footer>
            </Modal>

            {/* Modal editar */}
            <Modal show={modalEditShow} onHide={() => setModalEditShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Paciente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedPaciente && (
                        <form className='row'>
                            <div className="mb-3 col-md-6">
                                <label htmlFor="nombre_completo" className="form-label">Nombre Completo</label>
                                <input type="text" className="form-control" id="nombre_completo" value={selectedPaciente.nombre_completo} onChange={(e) => setSelectedPaciente({ ...selectedPaciente, nombre_completo: e.target.value })} required />
                            </div>
                            <div className="mb-3 col-md-6">
                                <label htmlFor="edad" className="form-label">Edad</label>
                                <input type="number" className="form-control" id="edad" value={selectedPaciente.edad} onChange={(e) => setSelectedPaciente({ ...selectedPaciente, edad: +e.target.value })} required />
                            </div>
                            <div className="mb-3 col-md-6">
                                <label htmlFor="sexo" className="form-label">Sexo</label>
                                <select className="form-control" id="sexo" value={selectedPaciente.sexo} onChange={(e) => setSelectedPaciente({ ...selectedPaciente, sexo: e.target.value })} required>
                                    <option value="">Seleccionar</option>
                                    <option value="M">Masculino</option>
                                    <option value="F">Femenino</option>
                                </select>
                            </div>
                            <div className="mb-3 col-md-6">
                                <label htmlFor="fecha_nacimiento" className="form-label">Fecha de Nacimiento</label>
                                <input type="date" className="form-control" id="fecha_nacimiento" value={selectedPaciente.fecha_nacimiento} onChange={(e) => setSelectedPaciente({ ...selectedPaciente, fecha_nacimiento: e.target.value })} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="ciudad_origen" className="form-label">Ciudad de Origen</label>
                                <input type="text" className="form-control" id="ciudad_origen" value={selectedPaciente.ciudad_origen} onChange={(e) => setSelectedPaciente({ ...selectedPaciente, ciudad_origen: e.target.value })} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="hospital" className="form-label">Hospital</label>
                                <input type="text" className="form-control" id="hospital" value={selectedPaciente.hospital} onChange={(e) => setSelectedPaciente({ ...selectedPaciente, hospital: e.target.value })} required />
                            </div>
                            <div className="mb-3 col-md-6">
                                <label htmlFor="nombre_tutor" className="form-label">Nombre del Tutor</label>
                                <input type="text" className="form-control" id="nombre_tutor" value={selectedPaciente.nombre_tutor} onChange={(e) => setSelectedPaciente({ ...selectedPaciente, nombre_tutor: e.target.value })} required />
                            </div>
                            <div className="mb-3 col-md-6">
                                <label htmlFor="telefono_tutor" className="form-label">Teléfono del Tutor</label>
                                <input type="text" className="form-control" id="telefono_tutor" value={selectedPaciente.telefono_tutor} onChange={(e) => setSelectedPaciente({ ...selectedPaciente, telefono_tutor: e.target.value })} required />
                            </div>
                        </form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={() => setModalEditShow(false)}>Cancelar</button>
                    <button className="btn btn-primary" onClick={handleEditPaciente}>Guardar Cambios</button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Pacientes;
