import React,{ useState} from "react";
import {register_pacient } from "../../services/Pacients/Pacients"
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from "react-router-dom"
import "./NewPaciente.css";

interface ILoginForm {
    pacient_dni: number;
    pacient_nombres: String;
    pacient_apellidos: String;
    pacient_historia: number
}

const NewPacient: React.FC = ()=>{
    const [msgNew, setText] = useState<string>("");
    // Función para obtener la lista de pacientes


    return (
            
        <main className="main">
            <div className='list-content'>
                <h2 className="titulos-seccion">Registro de Nuevo Paciente</h2>
                <section className="section no-scroll">
                    <Formulario_new_pacients msg={msgNew} ></Formulario_new_pacients>
                </section>
            </div>
        </main>
    )
}



interface Formulario_new_pacients_props{
    msg:string
}
const Formulario_new_pacients:React.FC<Formulario_new_pacients_props>=({msg})=>{
    const navigate = useNavigate();
    const fetchNewPacients: SubmitHandler<ILoginForm> = async (data) => {
        const dni:number =data.pacient_dni
        const nombres:String =data.pacient_nombres
        const apellidos:String =data.pacient_apellidos
        const historia:number = data.pacient_historia
        const res= await register_pacient(dni,nombres,apellidos,historia);

        if(res){
            console.log("Paciente Registrado")
            navigate(`/patients`)
        }else{
            console.log("Error en la Solicitud del Nuevo Paciente")
        }
    };  
    const CancelNewPacient=()=>{
        navigate(`/patients`);
    };
    const {register, handleSubmit, formState: { errors } } = useForm<ILoginForm>();
    return (
        <>
                    <form onSubmit={handleSubmit(fetchNewPacients)} className="formulario">
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInputNew1" className="form-label">DNI*</label>
                            <input type="number" 
                                className="form-control" 
                                id="exampleFormControlInputNew1" 
                                placeholder="*Obligatorio"
                                {...register("pacient_dni", {
                                    required: "Campo es requerido",
                                })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInputNew2" className="form-label">Nombres</label>
                            <input type="text" 
                                className="form-control" 
                                id="exampleFormControlInputNew2" 
                                placeholder="*Obligatorio"
                                {...register("pacient_nombres", {
                                    required: "Campo es requerido",
                                })}
                            />
                            
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInputNew3" className="form-label">Apellidos</label>
                            <input type="text" 
                                className="form-control" 
                                id="exampleFormControlInputNew3" 
                                placeholder="*Obligatorio"
                                {...register("pacient_apellidos", {
                                    required: "Campo es requerido",
                                })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInputNew4" className="form-label">N° Historia</label>
                            <input type="number" 
                                className="form-control" 
                                id="exampleFormControlInputNew4" 
                                placeholder="*Obligatorio"
                                {...register("pacient_historia", {
                                    required: "Campo es requerido",
                                })}
                            />
                        </div>
                        <div className="d-flex justify-content-center">
                        <button onClick={CancelNewPacient} className="btn btn-danger mx-1" type="button">Cancelar</button>
                        <button className="btn btn-primary mx-1" type="submit">Guardar</button>
                        </div>
                        {errors.pacient_dni && <p>{errors.pacient_dni.message}</p>}
                        
                    </form>
                
        </>
    )
}

export default NewPacient;