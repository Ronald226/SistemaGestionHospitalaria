import React,{ useState, useEffect } from "react";
import {ControlsModuls} from '../layaout/ControlsModuls';
import { Atenciones } from "./InterfaceAtenciones";
import {list_atenciones} from "./../../services/Atenciones/Atenciones";
import { formatDate } from "./FormatAtencion";
import {ViewAtencion} from "./ViewAtenciones";
import {UpdateAtenciones} from "./UpdateAtenciones";
import {DeleteAtenciones} from "./DeleteAtenciones";
export const ListAtenciones:React.FC=() => {
    const [msg, setText] = useState<string>("Cargando datos...");
    const [atenciones, setAtenciones] = useState<any[]>([]); // Almacena la lista de pacientes
    const [RefreshList,setRefreshList] = useState<number>(0);

    const fetchAtenciones = async () => {
        const data = await list_atenciones();
        if (data) {
            console.log("Datos obtenidos con éxito:", data);
            setAtenciones(data); // Almacena los pacientes en el estado
            setText(""); // Limpia cualquier mensaje
        } else {
            console.log("Error al obtener los datos.");
            setText("Error al cargar los datos.");
        }
    };
    // Llama a fetchPacients al montar el componente
    useEffect(() => {
        fetchAtenciones();
    }, [RefreshList]);
   
    return (
        <>
            <ControlsModuls></ControlsModuls>
            <main className='main'>
            <Tabla_list_atenciones  atenciones={atenciones} msg={msg} setRefreshList={setRefreshList} from={"atenciones/"}></Tabla_list_atenciones>
            </main>
        </>
    )
}

interface Tabla_list_atenciones_props{
    atenciones: Atenciones|Atenciones[],
    msg:String,
    setRefreshList: React.Dispatch<React.SetStateAction<number>>, // Mejora en el tipo
    from:string|null
   
}

export const Tabla_list_atenciones:React.FC<Tabla_list_atenciones_props>=({atenciones,msg,setRefreshList,from}) =>{
   
    console.log(atenciones)
    return (
        <>
            <div className='list-content'>
                        <h2 className="titulos-seccion ">Lista de Atenciones</h2>
                        {msg && <p>{msg}</p>} {/* Muestra mensajes si existen */}
                        <section className='section'>
                        <table className='table text-center tabla mt-2'>
                            <thead className="table-light" >
                                <tr>
                                    <th className="text-black-50 fw-light" scope="col">DNI</th>
                                    <th className="text-black-50 fw-light" scope="col">Nombres</th>
                                    <th className="text-black-50 fw-light" scope="col">Apellidos</th>
                                    <th className="text-black-50 fw-light" scope="col">Doctor</th>
                                    <th className="text-black-50 fw-light" scope="col">Especialidad</th>
                                    <th className="text-black-50 fw-light" scope="col">Fecha de Registro</th>
                                    <th className="text-black-50 fw-light" scope="col">N° Historia</th>
                                    <th className="text-black-50 fw-light" scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                            
                                {
                                    (atenciones!=undefined )?(
                                    ( Array.isArray(atenciones))?(
                                        atenciones.map((atencion:any, index:number) => (
                                            <tr key={index}>
                                                <td >
                                                    {atencion.paciente.dni}
                                                </td>
                                                <td>
                                                    {atencion.paciente.nombres}
                                                </td>
                                                <td>
                                                    {atencion.paciente.apellidos}
                                                </td>
                                                <td>
                                                    {atencion.doctor.nombre+" "+atencion.doctor.apellido}
                                                </td>
                                                <td>
                                                    {atencion.doctor.especialidad.id}
                                                </td>
                                                <td>
                                                    {formatDate(atencion.fecha)}
                                                </td>
                                                <td>
                                                    {atencion.paciente.historia}
                                                </td>
                                                <td>
                                                    
                                                <UpdateAtenciones atencion={atencion} index={index} setRefreshList={setRefreshList}></UpdateAtenciones>
                                                <ViewAtencion atencion={atencion} index={index}></ViewAtencion>   
                                                <DeleteAtenciones atencion={atencion} index={index} setRefreshList={setRefreshList}></DeleteAtenciones>
          
                                                
                                                </td>
                                            </tr>
                                        ))
                                    ):(
                                        <tr >
                                            <td >
                                                {atenciones.paciente.dni}
                                            </td>
                                            <td>
                                                {atenciones.paciente.nombres}
                                            </td>
                                            <td>
                                                {atenciones.paciente.apellidos}
                                            </td>
                                            <td>
                                                {atenciones.doctor.nombre+" "+atenciones.doctor.apellido}
                                            </td>
                                            <td>
                                                {atenciones.doctor.especialidad.id}
                                            </td>
                                            <td>
                                                {formatDate(atenciones.fecha)}
                                            </td>
                                            <td>
                                                {atenciones.paciente.historia}
                                            </td>
                                            <td>
                                                {/* <UpadatePacientModal pacients={pacients} index={1} setRefreshList={setRefreshList} ></UpadatePacientModal> */}
                                                {/* <ViewPacient pacient={pacients} index={1}></ViewPacient>    */}
                                                {/* <DeletePacient pacient={pacients} index={1} setRefreshList={setRefreshList}></DeletePacient>  */}
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