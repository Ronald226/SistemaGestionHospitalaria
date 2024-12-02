import React,{ useState, useEffect } from "react";
import {register_pacient } from "../../services/Pacients/Pacients"
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from "react-router-dom"
import "./NewPaciente.css";

interface ILoginForm {
    dni: number;
    nombres: String;
    apellidos: String;
    historia: number
}






const NewPacient: React.FC = ()=>{
    const [msg, setText] = useState<string>("");
    // Función para obtener la lista de pacientes


    return (
            
        <main className="main">
            <div className='list-content'>
                <h2>Registro de Nuevo Paciente</h2>
                <section className="section no-scroll">
                    <Formulario_new_pacients msg={msg} ></Formulario_new_pacients>
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
        const dni:number =data.dni
        const nombres:String =data.nombres
        const apellidos:String =data.apellidos
        const historia:number = data.historia
        const res= await register_pacient(dni,nombres,apellidos,historia);

        if(res){
            console.log("Paciente Registrado")
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
                            <label htmlFor="exampleFormControlInput1" className="form-label">DNI*</label>
                            <input type="number" 
                                className="form-control" 
                                id="exampleFormControlInput1" 
                                placeholder="*Obligatorio"
                                {...register("dni", {
                                    required: "Campo es requerido",
                                })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput2" className="form-label">Nombres</label>
                            <input type="text" 
                                className="form-control" 
                                id="exampleFormControlInput2" 
                                placeholder="*Obligatorio"
                                {...register("nombres", {
                                    required: "Campo es requerido",
                                })}
                            />
                            
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput3" className="form-label">Apellidos</label>
                            <input type="text" 
                                className="form-control" 
                                id="exampleFormControlInput3" 
                                placeholder="*Obligatorio"
                                {...register("apellidos", {
                                    required: "Campo es requerido",
                                })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput4" className="form-label">N° Historia</label>
                            <input type="number" 
                                className="form-control" 
                                id="exampleFormControlInput4" 
                                placeholder="*Obligatorio"
                                {...register("historia", {
                                    required: "Campo es requerido",
                                })}
                            />
                        </div>
                        <div className="d-flex justify-content-center">
                        <button onClick={CancelNewPacient} className="btn btn-danger mx-1" type="button">Cancelar</button>
                        <button className="btn btn-primary mx-1" type="submit">Guardar</button>
                        </div>
                        {errors.dni && <p>{errors.dni.message}</p>}
                        
                    </form>
                
        </>
    )
}

export default NewPacient;