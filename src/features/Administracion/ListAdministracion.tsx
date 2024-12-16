import React,{ useState, useEffect } from "react";
import {list_usuarios} from "./../../services/Administracion/Usuarios/Usuarios";
import {ControlsModulsAdministracion} from '../layaout/ControlsModuls';
import useStoreSesion from "./../../services/Auth/UserStore";

export const ListAdministracion:React.FC=() => {
    const [msg, setText] = useState<string>("Cargando datos...");
    const [usuarios, setUsuarios] = useState<any[]>([]); // Almacena la lista de pacientes
    const [RefreshList,setRefreshList] = useState<number>(0);
    const {getTok} = useStoreSesion();

    const fetchUsuarios = async () => {
            
            let tok=getTok();
            console.log(tok)
            const data = await list_usuarios(tok);
            if (data) {
                console.log("Datos obtenidos con éxito:", data);
                setUsuarios(data); // Almacena los pacientes en el estado
                setText(""); // Limpia cualquier mensaje
            } else {
                console.log("Error al obtener los datos.");
                setText("Error al cargar los datos.");
            }
        };

        // Llama a fetchPacients al montar el componente
        useEffect(() => {
            fetchUsuarios();
        }, [RefreshList]);

    return (
        <>
            <ControlsModulsAdministracion></ControlsModulsAdministracion>
            <main className='main'>
                <Tabla_list_usuarios usuarios={usuarios} msg={msg} setRefreshList={setRefreshList}></Tabla_list_usuarios>
            </main>
        </>
    )
}
interface Usuario{
    email: string,
    password: string,
    name: string,
    role: string
}
interface Tabla_list_usuarios_props{
    usuarios:Usuario[]|Usuario
    msg:String,
    setRefreshList: React.Dispatch<React.SetStateAction<number>>
}
export const Tabla_list_usuarios:React.FC<Tabla_list_usuarios_props>=({usuarios,msg,setRefreshList})=>{
    
    console.log(usuarios)
    return (
        <>
            <div className='list-content'>
                        <h2 className="titulos-seccion ">Lista de Usuarios</h2>
                        {msg && <p>{msg}</p>} {/* Muestra mensajes si existen */}
                        <section className='section'>
                        <table className='table text-center tabla mt-2'>
                            <thead className="table-light" >
                                <tr>
                                    <th className="text-black-50 fw-light" scope="col">Nombre</th>
                                    <th className="text-black-50 fw-light" scope="col">Email</th>
                                    <th className="text-black-50 fw-light" scope="col">Rol</th>
                                </tr>
                            </thead>
                            <tbody>
                            
                                {
                                    (usuarios!=undefined )?(
                                    ( Array.isArray(usuarios))?(
                                        usuarios.map((usuario:any, index:number) => (
                                            <tr key={index}>
                                                <td >
                                                    {usuario.name}
                                                </td>
                                                <td>
                                                    {usuario.email}
                                                </td>
                                                <td>
                                                    {usuario.role}
                                                </td>
                                               
                                                
                                                <td>
                                                    
                                                    {/* <UpdateAtenciones atencion={atencion} index={index} setRefreshList={setRefreshList}></UpdateAtenciones> */}
                                                    {/* <ViewAtencion atencion={atencion} index={index}></ViewAtencion>    */}
                                                    {/* <DeleteAtenciones atencion={atencion} index={index} setRefreshList={setRefreshList}></DeleteAtenciones> */}
                                                
                                                </td>
                                            </tr>
                                        ))
                                    ):(
                                        <tr >
                                            <td >
                                                {usuarios.name}
                                            </td>
                                            <td>
                                                {usuarios.email}
                                            </td>
                                            <td>
                                                {usuarios.role}
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