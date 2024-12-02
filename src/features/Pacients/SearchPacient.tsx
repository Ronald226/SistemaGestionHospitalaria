import './ListPacient.css'
import React,{ useState, useEffect } from "react";

import {pacient_search_dni } from "../../services/Pacients/Pacients"
import { useForm, SubmitHandler } from 'react-hook-form'


interface ILoginForm {
    dni: number;
}
interface pacientsProps{
    
    dni:number,
    nombres:string,
    apellidos:string,
    historia:number,
    
    
    
}
const SearchPacient: React.FC = ()=>{
    const [msg, setText] = useState<string>("");
    const [pacients, setPacients] = useState<pacientsProps|undefined>(undefined); // Almacena la lista de pacientes

    const {register, handleSubmit, formState: { errors } } = useForm<ILoginForm>();


    // Función para obtener la lista de pacientes
    const fetchPacients: SubmitHandler<ILoginForm> = async (data) => {
        const respon:any = await pacient_search_dni(data.dni);
        if (respon) {
            console.log("Datos obtenidos con éxito:", data);
            setPacients(respon); // Almacena los pacientes en el estado
            setText(""); // Limpia cualquier mensaje
            console.log(respon);
            console.log("Tamaño del array"+respon.length);
        } else {
            console.log("Error al obtener los datos.");
            setText("Error al cargar los datos.");
        }
    };
    
    const tabla_datos=()=>{
        if(pacients!=undefined){
            console.log("estoy en pacientes"+ pacients)
            return (
            <tr>
                <td >
                    { pacients.dni}
                </td>
                <td>
                    { pacients.apellidos }
                </td>
                <td>
                    {pacients.dni}
                </td>
                <td>
                    {pacients.historia}
                </td>
                <td>

                </td>
            </tr>
            );
        }
        
    }
    
    return (
        <div className="main-container">
           

            {/* Formulario principal */}
            
            <main className="form-container flex-column">
                <form className="form-inline my-2 my-lg-0 d-flex flex-row h-25 justify-content-around" onSubmit={handleSubmit(fetchPacients)}>
                    <input className="flex-fill w-50 form-control mr-sm-2" type="search" placeholder="Search-DNI" aria-label="Search"
                        {...register("dni", {
                            required: "Campo es requerido",
                            minLength: {
                                value: 8,
                                message: "No es un dni valido."
                                },
                            validate: {
                                onlyNumbers: (value:any) =>
                                    /^\d+$/.test(value) || "El dni debe contener solo números."
                            }
                        })}
                    />
                    <button className="flex-fill w-25 btn btn-success my-2 my-sm-0" type="submit">Buscar por DNI</button>
                </form>
                {errors.dni && <p>{errors.dni.message}</p>}
                <form className='d-flex flex-column' >
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
                        {
                        
                            pacients!=undefined?(
                            pacients.length > 0 ? (
                            pacients.map((pacient, index) => (
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

                                    </td>
                                </tr>
                            ))
                            ):(
                                tabla_datos()
                            )
                            ):(
                                <p>No hay datos</p>
                            )
                        }
                        
                    </tbody>
                    </table>
                </form>
                
            </main>
        </div>
    )
}

export default SearchPacient;