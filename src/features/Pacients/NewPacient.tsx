import React,{ useState, useEffect } from "react";
import {pacient_search_dni } from "../../services/Pacients/Pacients"
import { useForm, SubmitHandler } from 'react-hook-form'
import "./NewPaciente.css";

interface ILoginForm {
    dni: number;
    nombres: string;
    apellidos: string;
    historia: number
}

const NewPacient: React.FC = ()=>{
    const [msg, setText] = useState<string>("");
    const [pacients, setPacients] = useState<any[]>([]); // Almacena la lista de pacientes

    const {register, handleSubmit, formState: { errors } } = useForm<ILoginForm>();


    // Función para obtener la lista de pacientes
    const fetchPacients: SubmitHandler<ILoginForm> = async (data) => {
        const respon:any = await pacient_search_dni(data.dni);
        if (respon) {
            console.log("Datos obtenidos con éxito:", data);
            setPacients(respon); // Almacena los pacientes en el estado
            setText(""); // Limpia cualquier mensaje
        } else {
            console.log("Error al obtener los datos.");
            setText("Error al cargar los datos.");
        }
    };
    
    
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
                <h1>Registrar Paciente</h1>
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
            
            <main className="form-container flex-column">
             
                 {/* Formulario principal */}
     
                <form>
                <h2>Añadir informacion del paciente</h2>
                <div className="form-row">
                    <div className="form-group">
                    <label htmlFor="nombre">Nombre *</label>
                    <input type="text" id="nombre" placeholder="Nombre" />
                    </div>
                    <div className="form-group">
                    <label htmlFor="apellido">Apellido *</label>
                    <input type="text" id="apellido" placeholder="Apellido" />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                    <label htmlFor="dni">DNI *</label>
                    <input type="text" id="dni" placeholder="DNI" />
                    </div>
                    <div className="form-group">
                    <label htmlFor="telefono">Número de Historia*</label>
                    <input type="tel" id="telefono" placeholder="Teléfono" />
                    </div>
                </div>
                
                
                <div className="form-actions d-flex flex-row">
                    <button type="button" className="btn-danger w-25">
                    Cancelar
                    </button>
                    <button type="submit" className="btn-primary w-25">
                    Crear
                    </button>
                </div>
                </form>

                {errors.dni && <p>{errors.dni.message}</p>}
                        
            </main>
        </div>
    )
}


export default NewPacient;