import React,{ useState, useEffect } from "react";
import {list_farmacos} from "./../../services/Farmacia/Farmacos"
import {ControlsModulsFarmacia} from '../layaout/ControlsModuls';

export const ListFarmacia:React.FC=() => {
    const [msg, setText] = useState<string>("Cargando datos...");
    const [farmacos, setFarmacos] = useState<any[]>([]); // Almacena la lista de pacientes
    const [RefreshList,setRefreshList] = useState<number>(0);

    const fetchFarmacos = async () => {
            const data = await list_farmacos();
            if (data) {
                console.log("Datos obtenidos con éxito:", data);
                setFarmacos(data); // Almacena los pacientes en el estado
                setText(""); // Limpia cualquier mensaje
            } else {
                console.log("Error al obtener los datos.");
                setText("Error al cargar los datos.");
            }
        };
        // Llama a fetchPacients al montar el componente
        useEffect(() => {
            fetchFarmacos();
        }, [RefreshList]);

    return (
        <>
            <ControlsModulsFarmacia></ControlsModulsFarmacia>
            <main className='main'>
                <Tabla_list_atenciones farmacos={farmacos} msg={msg} setRefreshList={setRefreshList}></Tabla_list_atenciones>
            </main>
        </>
    )
}
interface Farmaco{
    codigo: string,
    nombre_articulo: string,
    descripcion: string,
    stock: number,
    precio: number
}
interface Tabla_list_farmacia_props{
    farmacos:Farmaco[]|Farmaco
    msg:String,
    setRefreshList: React.Dispatch<React.SetStateAction<number>>
}
export const Tabla_list_atenciones:React.FC<Tabla_list_farmacia_props>=({farmacos,msg,setRefreshList})=>{
    
    console.log(farmacos)
    return (
        <>
            <div className='list-content'>
                        <h2 className="titulos-seccion ">Lista de Farmacos</h2>
                        {msg && <p>{msg}</p>} {/* Muestra mensajes si existen */}
                        <section className='section'>
                        <table className='table text-center tabla mt-2'>
                            <thead className="table-light" >
                                <tr>
                                    <th className="text-black-50 fw-light" scope="col">Codigo</th>
                                    <th className="text-black-50 fw-light" scope="col">Nombre del Articulo</th>
                                    <th className="text-black-50 fw-light" scope="col">Descripcion</th>
                                    <th className="text-black-50 fw-light" scope="col">Stock</th>
                                    <th className="text-black-50 fw-light" scope="col">Precio</th>
                                </tr>
                            </thead>
                            <tbody>
                            
                                {
                                    (farmacos!=undefined )?(
                                    ( Array.isArray(farmacos))?(
                                        farmacos.map((farmaco:any, index:number) => (
                                            <tr key={index}>
                                                <td >
                                                    {farmaco.codigo}
                                                </td>
                                                <td>
                                                    {farmaco.nombre_articulo}
                                                </td>
                                                <td>
                                                    {farmaco.descripcion}
                                                </td>
                                                <td>
                                                    {farmaco.stock}
                                                </td>
                                                <td>
                                                    {farmaco.precio}
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
                                                {farmacos.codigo}
                                            </td>
                                            <td>
                                                {farmacos.nombre_articulo}
                                            </td>
                                            <td>
                                                {farmacos.descripcion}
                                            </td>
                                            <td>
                                                {farmacos.stock}
                                            </td>
                                            <td>
                                                {farmacos.precio}
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