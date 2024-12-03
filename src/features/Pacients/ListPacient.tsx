import './ListPacient.css'
import React,{ useState, useEffect } from "react";
import {list_pacient } from "../../services/Pacients/Pacients"
import { useNavigate } from 'react-router-dom';
import ControlsModuls from '../layaout/ControlsModuls';
import DeletePacient from './DeletePacient';
import ViewPacient from './ViewPacient';

// const [
// RefreshList,setRefreshList] = useState<number>(0);

const ListPacient: React.FC = () => {
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
       <>
            <ControlsModuls></ControlsModuls>
            {/* Formulario principal */}
            <main className='main'>
                
                <Tabla_list_pacients pacients={pacients} msg={msg} ></Tabla_list_pacients>
            </main>
        </>
    )
}
interface Tabla_list_pacient_props{
    pacients:any,
    msg:string,
   
}

const Tabla_list_pacients:React.FC<Tabla_list_pacient_props>=({pacients,msg})=>{
    const navigate = useNavigate();
    const updatePacient=(dni:number)=>{
        navigate(`/patients/update/${dni}`);
    }
    console.log("Datos de la Vista"+pacients)
    return (
        <>
            <div className='list-content'>
                        <h2>Lista de Pacientes</h2>
                        {msg && <p>{msg}</p>} {/* Muestra mensajes si existen */}
                        <section className='section'>
                        <table className='table  text-center tabla'>
                            <thead className='table-dark mt-2'>
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
                                            <img className='my-btn' onClick={()=>updatePacient(pacient.dni)} src="/img/btn-update.png" alt="" />
                                            <ViewPacient pacient={pacient} index={index}></ViewPacient>   
                                            {/* <DeletePacient pacient={pacient} index={index} RefreshList={RefreshList} setRefreshList={setRefreshList}></DeletePacient> */}
                                        
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        
                        </section>
                        <nav className='content-paginacion'>
                                <ul>
                                    <li>&#60;</li>
                                    <li>1</li>
                                    <li>2</li>
                                    <li>3</li>
                                    <li>&#62;</li>
                                </ul>
                        </nav>
            </div>
        </>
    )
}

export default ListPacient;