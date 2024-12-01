import './ListPacient.css'
import React,{ useState, useEffect } from "react";
import {list_pacient } from "../../services/Pacients/Pacients"
import useStoreSesion from '../../services/Auth/UserStore';
import { useNavigate } from 'react-router-dom';
import ControlsModuls from '../layaout/ControlsModuls';

const ListPacient: React.FC = ()=>{
    const [msg, setText] = useState<string>("Cargando datos...");
    const [pacients, setPacients] = useState<any[]>([]); // Almacena la lista de pacientes
    const {destroyToken}=useStoreSesion();
    const navigate = useNavigate();
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
       <>
            <ControlsModuls></ControlsModuls>
            {/* Formulario principal */}
            <main className='main'>
                
                <Tabla_list_pacients pacients={pacients} msg={msg}></Tabla_list_pacients>
            </main>
        </>
    )
}
interface Tabla_list_pacient_props{
    pacients:any,
    msg:string
}

const Tabla_list_pacients:React.FC<Tabla_list_pacient_props>=({pacients,msg})=>{
    const navigate = useNavigate();
    const updatePacient=()=>{
        navigate("/patients/update")
    }
    return (
        <>
            <form className='d-flex flex-column'>
                        <h2>Lista de Pacientes</h2>
                        {msg && <p>{msg}</p>} {/* Muestra mensajes si existen */}
                        <table className='table text-center'>
                        <thead>
                            <tr>
                                <th scope="col">Nombres</th>
                                <th scope="col">Apellidos</th>
                                <th scope="col">DNI</th>
                                <th scope="col">N° Historia</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pacients.map((pacient:any, index:number) => (
                                <tr key={index}>
                                    <td >
                                        {pacient.nombres}
                                    </td>
                                    <td>
                                        {pacient.apellidos}
                                    </td>
                                    <td>
                                        {pacient.dni}
                                    </td>
                                    <td>
                                        {pacient.historia}
                                    </td>
                                    <td>
                                        <img onClick={updatePacient} src="/img/btn-update.png" alt="" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        </table>
            </form>
        </>
    )
}

export default ListPacient;