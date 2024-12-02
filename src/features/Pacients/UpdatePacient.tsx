import { useParams,useNavigate } from "react-router-dom";
import React,{ useState,useEffect} from "react";
import {update_pacient } from "../../services/Pacients/Pacients"
import { useForm, SubmitHandler } from 'react-hook-form'
import {pacient_search_dni} from "../../services/Pacients/Pacients"

const UpdatePacient=()=>{
    const { dni } = useParams();
    const [msgUpdate, setText] = useState<string>("");

    const [pacient, setPacient] = useState<any[]>([]); // Almacena la lista de pacientes
    
   
    // Función para obtener paciente por Id
    const fetchPacientId = async (dni:number) => {
        const data = await pacient_search_dni(dni);
        if (data) {
            console.log("Datos obtenidos con éxito:", data);
            setPacient(data); // Almacena los pacientes en el estado
            setText(""); // Limpia cualquier mensaje
        } else {
            console.log("Error al obtener los datos.");
            setText("Error al cargar los datos.");
        }
    };
    
    

    // Llama a fetchPacients al montar el componente
    useEffect(() => {
        
        const dniNumber = parseInt(String(dni), 10);
        if (!isNaN(dniNumber)) { 
            fetchPacientId(dniNumber);
        }
    }, []);

    return (

        <main className="main">
            <div className='list-content'>
                <h2>Actualizar informacion del Paciente</h2>
                <section className="section no-scroll">
                    <Formulario_update_pacients msg={msgUpdate} pacient={pacient}></Formulario_update_pacients>
                </section>
            </div>
        </main>
    )
}


interface ILoginForm {
    dni: number;
    nombres: String;
    apellidos: String;
    historia: number
}
interface Formulario_update_pacients_props{
    msg:string,
    pacient: {
        dni:number,
        nombres:string,
        apellidos:string,
        historia:number,
    }|any
}
const Formulario_update_pacients:React.FC<Formulario_update_pacients_props>=({msg, pacient})=>{
    const navigate = useNavigate();
    const fetchUpadatePacient: SubmitHandler<ILoginForm> = async (data) => {
        console.log(data)
        const dni:number =pacient.dni
        const nombres:String =data.nombres
        const apellidos:String =data.apellidos
        const historia:number = pacient.historia
        const res= await update_pacient(dni,nombres,apellidos,historia);

        if(res){
            console.log("Paciente Actualizado "+pacient)
            navigate(`/patients`)
        }else{
            console.log("Error en la Solicitud de Actualizar Paciente")
        }
    };  
    const CancelUpdatePacient=()=>{
        navigate(`/patients`);
    };
    const {register, handleSubmit, formState: { errors } } = useForm<ILoginForm>();
    


    return (
        <>
                    <form onSubmit={handleSubmit(fetchUpadatePacient)} className="formulario">
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInputUpdate1" className="form-label">DNI*</label>
                            <input type="number" 
                                className="form-control bg-light"
                                id="exampleFormControlInputUpdate1" 
                                placeholder="*Obligatorio"
                                defaultValue={pacient.dni}
                                readOnly
                                {...register("dni", {
                                    
                                })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInputUpdate2" className="form-label">Nombres</label>
                            <input type="text" 
                                className="form-control" 
                                id="exampleFormControlInputUpdate2" 
                                placeholder="*Obligatorio"
                                defaultValue={pacient.nombres}
                                {...register("nombres", {
                                    required: "Campo es requerido",
                                })}
                            />
                            
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInputUpdate3" className="form-label">Apellidos</label>
                            <input type="text" 
                                className="form-control" 
                                id="exampleFormControlInputUpdate3" 
                                placeholder="*Obligatorio"
                                defaultValue={pacient.apellidos}
                                {...register("apellidos", {
                                    required: "Campo es requerido",
                                })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInputUpdate4" className="form-label">N° Historia</label>
                            <input type="number" 
                                className="form-control bg-light" 
                                id="exampleFormControlInputUpdate4" 
                                placeholder="*Obligatorio"
                                defaultValue={pacient.historia}
                                readOnly
                                {...register("historia", {
                                    
                                })}
                            />
                        </div>
                        <div className="d-flex justify-content-center">
                        <button onClick={CancelUpdatePacient} className="btn btn-danger mx-1" type="button">Cancelar</button>
                        <button className="btn btn-primary mx-1" type="submit">Actualizar</button>
                        </div>
                        {errors.dni && <p>{errors.dni.message}</p>}
                        
                    </form>
                
        </>
    )
}
export default UpdatePacient;