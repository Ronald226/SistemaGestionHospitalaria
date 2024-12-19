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
    
    // Función para obtener la lista de pacientes


    return (
            
        <main className="main">
            <div className='list-content'>
                <h2 className="titulos-seccion">Registro de Nuevo Paciente</h2>
                <section className="section no-scroll">
                    <Formulario_new_pacients ></Formulario_new_pacients>
                </section>
            </div>
        </main>
    )
}



interface Formulario_new_pacients_props{
    
}
const Formulario_new_pacients:React.FC<Formulario_new_pacients_props>=()=>{
    const [msgNew, setText] = useState<string>("");
    const navigate = useNavigate();
    const fetchNewPacients: SubmitHandler<ILoginForm> = async (data) => {
        const dni:number =data.pacient_dni
        const nombres:String =data.pacient_nombres
        const apellidos:String =data.pacient_apellidos
        const historia:number = data.pacient_historia
        const res= await register_pacient(dni,nombres,apellidos,historia);

        if(res){
            console.log("Paciente Registrado")
            setText("El paciente se ha registrado con exito")
            navigate(`/patients`)
        }else{
            setText("Hubo un error en la solicitud")
            console.log("Error en la Solicitud del Nuevo Paciente")
        }
    };  
    const CancelNewPacient=()=>{
        navigate(`/patients`);
    };
    const {register, handleSubmit, formState: { errors } } = useForm<ILoginForm>();
    return (
        <>
                    <p>{msgNew}</p>
                    <form onSubmit={handleSubmit(fetchNewPacients)} className="formulario my-4">
                    <div className="list-group">
                        <div className="row shadow-lg p-3 mb-2 mx-1 bg-body rounded">
                            <div className="col">
                                <label htmlFor="exampleFormControlInputNew1" className="form-label fw-bold text-dorian-light">DNI*</label>
                                <input type="number" 
                                    className={`form-control ${errors.pacient_dni ? "is-invalid" : ""}`} 
                                    id="exampleFormControlInputNew1" 
                                    placeholder="*Obligatorio"
                                    {...register("pacient_dni", {
                                        required: "Campo es requerido",
                                        pattern: {
                                            value: /^[0-9]{8}$/, // Expresión regular para exactamente 8 dígitos
                                            message: "El DNI debe tener exactamente 8 dígitos",
                                        },
                                    })}
                                />
                                {errors.pacient_dni && <p className="text-danger">{errors.pacient_dni.message}</p>}
                            </div>
                            <div className="col">
                                <label htmlFor="exampleFormControlInputNew4" className="form-label fw-bold text-dorian-light">N° Historia</label>
                                <input type="number" 
                                    className={`form-control ${errors.pacient_historia ? "is-invalid" : ""}`} 
                                    id="exampleFormControlInputNew4" 
                                    placeholder="*Obligatorio"
                                    {...register("pacient_historia", {
                                        required: "Campo es requerido",
                                    })}
                                />
                                {errors.pacient_historia && <p className="text-danger">{errors.pacient_historia.message}</p>}
                            </div>
                        </div>
                        <div className="row shadow-lg p-3 mb-2 mx-1 bg-body rounded">
                            <div className="col">
                                <label htmlFor="exampleFormControlInputNew2" className="form-label fw-bold text-dorian-light">Nombres</label>
                                <input type="text" 
                                    className={`form-control ${errors.pacient_nombres ? "is-invalid" : ""}`}  
                                    id="exampleFormControlInputNew2" 
                                    placeholder="*Obligatorio"
                                    {...register("pacient_nombres", {
                                        required: "Campo es requerido",
                                        pattern: {
                                            value: /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/, // Permite solo letras y espacios
                                            message: "Solo se permiten letras y espacios",
                                        },
                                    })}
                                />
                                {errors.pacient_nombres && <p className="text-danger">{errors.pacient_nombres.message}</p>}
                            </div>
                        </div>
                        <div className="row shadow-lg p-3 mb-2 mx-1 bg-body rounded">
                            <div className="col">
                                <label htmlFor="exampleFormControlInputNew3" className="form-label fw-bold text-dorian-light">Apellidos</label>
                                <input type="text" 
                                    className={`form-control ${errors.pacient_apellidos ? "is-invalid" : ""}`} 
                                    id="exampleFormControlInputNew3" 
                                    placeholder="*Obligatorio"
                                    {...register("pacient_apellidos", {
                                        required: "Campo es requerido",
                                        pattern: {
                                            value: /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/, // Permite solo letras y espacios
                                            message: "Solo se permiten letras y espacios",
                                        },
                                    })}
                                />
                                {errors.pacient_apellidos && <p className="text-danger">{errors.pacient_apellidos.message}</p>}
                            </div>
                        </div>
                        <div className="row justify-content-center mt-3 mb-2">
                            <button onClick={CancelNewPacient} className="btn btn-secondary mx-2 w-25" type="button">Cancelar</button>
                            <button className="btn btn-warning mx-2 w-25" type="submit">Guardar</button>
                        </div>
                    </div> 
                    </form>
                
        </>
    )
}

export default NewPacient;