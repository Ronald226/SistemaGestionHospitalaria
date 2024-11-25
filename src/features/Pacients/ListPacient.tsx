import './ListPacient.css'
import React,{ useState, useEffect } from "react";
import {list_pacient, } from "../../services/Pacients/Pacients"

const msm=()=>{
    console.log("mensaje");
}

const ListPacient: React.FC = ()=>{
    const [msg, setText] = useState<string>("Cargando datos...");
    const [pacients, setPacients] = useState<any[]>([]); // Almacena la lista de pacientes

    // Función para obtener la lista de pacientes
    const fetchPacients = async () => {
        const data = await list_pacient();
        if (data) {
            console.log("Datos obtenidos con éxito:", data);
            setPacients(data); // Almacena los pacientes en el estado
            setText(""); // Limpia cualquier mensaje
        } else {
            console.log("Error al obtener los datos.");
            setText("Error al cargar los datos.");
        }
    };

    // Llama a fetchPacients al montar el componente
    useEffect(() => {
        fetchPacients();
    }, []);


    return (
        <div className="main-container">
            {/* Header */}
            <header className="header">
                <div className="logo-container">
                <img
                    src="https://via.placeholder.com/80"
                    alt="Logo"
                    className="logo"
                />
                <h1>Listar Paciente</h1>
                </div>
                <div className="header-buttons">
                <button className="icon-button">👤</button>
                <button className="icon-button">🔔</button>
                </div>
            </header>

            {/* Sidebar */}
            <aside className="sidebar">
                <img src="https://via.placeholder.com/80" alt="Logo" className="logo" />
                <h2>Usuario</h2>
                <ul>
                <li>
                    <span>🖥️</span> <span>Dashboard</span>
                </li>
                <li>
                    <span>📋</span> <span>Pacientes</span>
                </li>
                <li>
                    <span>📝</span> <span>Historial</span>
                </li>
                <li>
                    <span>⚙️</span> <span>Configuración</span>
                </li>
                <li>
                    <span>🔌</span> <span>Salir</span>
                </li>
                </ul>
            </aside>

            {/* Formulario principal */}
            <main className="form-container">
                <form className='d-flex flex-column'>
                    <h1>Lista de Pacientes</h1>

                </form>
                
            </main>
        </div>
    )
}

export default ListPacient;