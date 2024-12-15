import './ListPacient.css'
import React,{ useState, useEffect } from "react";
import {list_pacient } from "../../services/Pacients/Pacients"
import { useNavigate } from 'react-router-dom';
import ControlsModuls from '../layaout/ControlsModuls';
import DeletePacient from './DeletePacient';
import ViewPacient from './ViewPacient';
import UpadatePacientModal from './UpdatePacientModal';
import { pacientsProps } from './InterfacePacients';

export const ListPacient: React.FC = () => {
    const [msg, setText] = useState<string>("Cargando datos...");
    const [pacients, setPacients] = useState<any[]>([]); // Almacena la lista de pacientes
    const [RefreshList,setRefreshList] = useState<number>(0);

   
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
    }, [RefreshList]);

    return (
       <>
            <ControlsModuls></ControlsModuls>
            {/* Formulario principal */}
            <main className='main'>
                
                <Tabla_list_pacients pacients={pacients} msg={msg} setRefreshList={setRefreshList} from={'/patients'}></Tabla_list_pacients>
            </main>
        </>
    )
}
interface Tabla_list_pacient_props{
    pacients:pacientsProps|pacientsProps[],
    msg:string,
    setRefreshList: React.Dispatch<React.SetStateAction<number>>; // Mejora en el tipo
    from:string|null
}

export const Tabla_list_pacients:React.FC<Tabla_list_pacient_props>=({pacients,msg,setRefreshList,from})=>{
    const navigate = useNavigate();
    const updatePacient=(dni:number)=>{
        navigate(`/patients/update/${dni}`,{ state: { from: from } });
    }
    console.log(pacients)
    return (
        <>
            <div className='list-content'>
                        <h2 className='titulos-seccion '>Lista de Pacientes</h2>
                        {msg && <p>{msg}</p>} {/* Muestra mensajes si existen */}
                        <section className='section'>
                        <table className='table text-center tabla  mt-2'>
                            <thead className='table-light'>
                                <tr>
                                    <th className="text-black-50 fw-light" scope="col">Nombres</th>
                                    <th className="text-black-50 fw-light" scope="col">Apellidos</th>
                                    <th className="text-black-50 fw-light" scope="col">DNI</th>
                                    <th className="text-black-50 fw-light" scope="col">N° Historia</th>
                                    <th className="text-black-50 fw-light" scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                            
                                {
                                    (pacients!=undefined )?(
                                    (Array.isArray(pacients))?(
                                        pacients.map((pacient:any, index:number) => (
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
                                                    <DeletePacient pacient={pacient} index={index} setRefreshList={setRefreshList}></DeletePacient> 
                                                
                                                </td>
                                            </tr>
                                        ))
                                    ):(
                                        <tr >
                                            <td >
                                                {pacients.nombres}
                                            </td>
                                            <td>
                                                {pacients.apellidos}
                                            </td>
                                            <td>
                                                {pacients.dni}
                                            </td>
                                            <td>
                                                {pacients.historia}
                                            </td>
                                            <td>
                                                <img className='my-btn' onClick={()=>updatePacient(pacients.dni)} src="/img/btn-update.png" alt="" />
                                                <ViewPacient pacient={pacients} index={1}></ViewPacient>   
                                                <DeletePacient pacient={pacients} index={1} setRefreshList={setRefreshList}></DeletePacient> 
                                            
                                            </td>
                                        </tr>
                                    )):(
                                        <p>No hay datos</p>
                                    )
                                }
                            </tbody>
                        </table>
                        
                        </section>
                        <div className='content-paginacion-s'>
                                {/* <ul>
                                    <li>&#60;</li>
                                    <li>1</li>
                                    <li>2</li>
                                    <li>3</li>
                                    <li>&#62;</li>
                                </ul> */}
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination justify-content-center">
                                        <li className="page-item disabled">
                                        <a className="page-link" href="#" tabIndex={-1}>Previous</a>
                                        </li>
                                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                                        <li className="page-item">
                                        <a className="page-link" href="#">Next</a>
                                        </li>
                                    </ul>
                                </nav> 
                        </div>
            </div>
        </>
    )
}

interface Tabla_list_pacient_modal_props{
    pacients: pacientsProps|pacientsProps[]|[],
    msg:String,
    setRefreshList: React.Dispatch<React.SetStateAction<number>>, // Mejora en el tipo
    from:string|null
}
export const Tabla_list_pacients_all_modal:React.FC<Tabla_list_pacient_modal_props>=({pacients,msg,setRefreshList,from})=>{
    const navigate = useNavigate();
    
    console.log(pacients)
    return (
        <>
            <div className='list-content'>
                        <h2 className='titulos-seccion'>Lista de Pacientes</h2>
                        {msg && <p>{msg}</p>} {/* Muestra mensajes si existen */}
                        <section className='section'>
                        <table className='table text-center tabla  mt-2'>
                            <thead className='table-light'>
                                <tr>
                                    <th className="text-black-50 fw-light" scope="col">Nombres</th>
                                    <th className="text-black-50 fw-light" scope="col">Apellidos</th>
                                    <th className="text-black-50 fw-light" scope="col">DNI</th>
                                    <th className="text-black-50 fw-light" scope="col">N° Historia</th>
                                    <th className="text-black-50 fw-light" scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                            
                                {
                                    (pacients!=undefined )?(
                                    ( Array.isArray(pacients))?(
                                        pacients.map((pacient:any, index:number) => (
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
                                                    
                                                    <UpadatePacientModal pacients={pacient} index={index} setRefreshList={setRefreshList}></UpadatePacientModal>
                                                    <ViewPacient pacient={pacient} index={index}></ViewPacient>   
                                                    <DeletePacient pacient={pacient} index={index} setRefreshList={setRefreshList}></DeletePacient> 
                                                
                                                </td>
                                            </tr>
                                        ))
                                    ):(
                                        <tr >
                                            <td >
                                                {pacients.nombres}
                                            </td>
                                            <td>
                                                {pacients.apellidos}
                                            </td>
                                            <td>
                                                {pacients.dni}
                                            </td>
                                            <td>
                                                {pacients.historia}
                                            </td>
                                            <td>
                                                <UpadatePacientModal pacients={pacients} index={1} setRefreshList={setRefreshList} ></UpadatePacientModal>
                                                <ViewPacient pacient={pacients} index={1}></ViewPacient>   
                                                
                                                <DeletePacient pacient={pacients} index={1} setRefreshList={setRefreshList}></DeletePacient> 
                                            </td>
                                        </tr>
                                    )):(
                                        <p>No hay datos</p>
                                    )
                                }
                            </tbody>
                        </table>
                        
                        </section>
                        <div className='content-paginacion-s'>
                                {/* <ul>
                                    <li>&#60;</li>
                                    <li>1</li>
                                    <li>2</li>
                                    <li>3</li>
                                    <li>&#62;</li>
                                </ul> */}
                            <nav aria-label="Page navigation example">
                                <ul className="pagination justify-content-center">
                                    <li className="page-item disabled">
                                    <a className="page-link" href="#" tabIndex={-1}>Previous</a>
                                    </li>
                                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                    <li className="page-item">
                                    <a className="page-link" href="#">Next</a>
                                    </li>
                                </ul>
                            </nav>  
                        </div>
            </div>
        </>
    )
}