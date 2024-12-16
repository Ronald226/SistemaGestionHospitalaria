import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from 'react-hook-form'
import {get_doctores,get_especialidades,register_atencion} from "./../../services/Atenciones/Atenciones"
import {list_pacient} from "../../services/Pacients/Pacients"

const NewAtenciones:React.FC=() => {
    return (
        <>
            <main className="main">
                <div className='list-content'>
                    <h2 className="titulos-seccion">Registro de Nueva Atencion</h2>
                    <section className="section no-scroll">
                        <FormularioNewAtencion></FormularioNewAtencion>
                    </section>
                </div>
            </main>
        </>
    )
}
interface RegisterAtencionForm{
    historia:string
    fecha:string
    doctorId:string
    especialidadId:string
    estado:string
}
interface simpleOption{
    iden:string
}
const FormularioNewAtencion:React.FC = () => {
    const [msgNew, setText] = useState<string>("");
    const navigate = useNavigate();
    const {register, handleSubmit, formState: { errors },clearErrors,setValue,watch} = useForm<RegisterAtencionForm>();

    const CancelNewAtencion=()=>{
        navigate(`/atenciones`);
    };

    const OptionEspecialidad:React.FC<simpleOption> =({iden}) =>{
        const [especialidades,setEspecialidades] = useState<any[]>([]);
        
        const fetchEspecialidades =async()=>{
            const data = await get_especialidades();
            setEspecialidades(data);
        }
        useEffect(() => {
            fetchEspecialidades();
        }, []);
        const selectedEspecialidadId = watch("especialidadId"); 
        const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            const value = e.target.value;
            setValue("especialidadId", value); // Actualiza el valor en react-hook-form
            if (value) clearErrors("especialidadId");
        };
        return (
            <>
                <select className="form-select" id={iden}
                    {...register("especialidadId",{
                        required:"Seleccione una especialidad"
                    })}
                    value={selectedEspecialidadId || ""}
                    onChange={handleSelectChange}
                >
                    <option value="">Seleccione una especialidad</option>
                    {
                        especialidades.map((especialidad:any) => (
                            <option value={especialidad.id}>{especialidad.nombre}</option>
                            
                        ))
                    }
                </select>
            </>
        )
    }
    const OptionDoctor:React.FC<simpleOption> =({iden})=>{
        const [doctores, setDoctores] = useState<any[]>([]);

        const fetchDoctores= async() =>{
            const data = await get_doctores();
            setDoctores(data);
        }
        useEffect(() => {
            fetchDoctores();
        }, []);
        const selectedDoctorId = watch("doctorId"); 
        const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            const value = e.target.value;
            setValue("doctorId", value); // Actualiza el valor en react-hook-form
            if (value) clearErrors("doctorId");
        };

        return (
            <>
            <select className="form-select" id={iden}
                {...register("doctorId",{
                    required:"Seleccione un doctor"
                })}
                value={selectedDoctorId || ""}
                onChange={handleSelectChange}
            >
                <option value="">Seleccione un Doctor</option>
                {
                    doctores.map((doctor:any) => (
                        <option value={doctor.id}>{doctor.nombre +" "+ doctor.apellido}</option>
                    ))
                }
            </select>
            </>
        )
    }
    const OptionHistoria:React.FC<simpleOption> =({iden})=>{
        const [historias, setHistorias] = useState<any[]>([]);

        const fetchHistoria= async() =>{
            const data = await list_pacient();
            setHistorias(data);
        }
        useEffect(() => {
            fetchHistoria();
        }, []);
        const selectedHistoria = watch("historia"); 
        const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            const value = e.target.value;
            setValue("historia", value); // Actualiza el valor en react-hook-form
            if (value) clearErrors("historia");
        };

        return (
            <>
            <select className={`form-select ${errors.historia ? "is-invalid" : ""}`} id={iden}
                {...register("historia",{
                    required:"Seleccione una historia"
                })}
                value={selectedHistoria || ""}
                onChange={handleSelectChange}
            >
                <option value="">Seleccione una Historia</option>
                
                {
                    historias.map((paciente:any) => (
                        <option key={paciente.historia} value={paciente.historia}>{paciente.historia+" - "+paciente.nombres +" "+ paciente.apellidos }</option>
                    ))
                }
            </select>
            </>
        )
    }

    const fetchRegisterAtencion: SubmitHandler<RegisterAtencionForm> = async (data) => {
        console.log(data)
        const historia:number = parseInt(data.historia)
        const fecha:string = data.fecha
        const doctorId:number = parseInt(data.doctorId)
        const especialidadId:number = parseInt(data.especialidadId)
        const estado:boolean = (data.estado=="pasado")?true:false
        
        const res= await register_atencion(historia,doctorId,especialidadId,fecha,estado);

        if(res){
            console.log("Paciente Registrado")
            setText("Atencion Registrada")
            setTimeout(() => {
                navigate("/atenciones");
            }, 3000);
        }else{
            console.log("Error en la Solicitud de Registrar Paciente")
            setText("Error en la Solicitud de Registrar Paciente")
        }
    }

    
    return (
        <>
            <form onSubmit={handleSubmit(fetchRegisterAtencion)}>
                <p className="text-success">{msgNew}</p>
                <div className="list-group">
                    <div className="row shadow-lg p-3 mb-2 mx-1 bg-body rounded">
                        <div className="col">
                            <label htmlFor={`atencionregisterhistoria`} className="form-label fw-bold text-dorian-light">N° Historia</label>
                            <OptionHistoria iden={`atencionregisterhistoria`}></OptionHistoria>
                            {errors.historia && <p className="text-danger">{errors.historia.message}</p>}
                            {/* <input readOnly defaultValue={atencion.paciente.nombres} id={`atencionupdatenombres${index}`} type="text" className="form-control"/> */}
                        </div>
                       
                    </div>
                    
                    <div className="row shadow-lg p-3 mb-2 mx-1 bg-body rounded">
                        <div className="col">
                            <label htmlFor={`atencionregisterdoctor`} className="form-label fw-bold text-dorian-light">Doctor@</label>
                            {/* <input defaultValue={atencion.doctor.nombre+" "+atencion.doctor.apellido} id={`atenciondoctor${index}`} type="text" className="form-control" /> */}
                            <OptionDoctor iden={`atencionregisterdoctor`}></OptionDoctor>
                            {errors.doctorId && <p>{errors.doctorId.message}</p>}
                        </div>
                    </div>
                    <div className="row shadow-lg p-3 mb-2 mx-1 bg-body rounded">
                        
                        <div className="col">
                            <label htmlFor={`atencionregisterfecha`} className="form-label fw-bold text-dorian-light">Fecha de Registro</label>
                            <input id={`atencionregisterfecha`} 
                            type="date" 
                            className="form-control"
                            {...register("fecha", {
                                required: "Campo es requerido",
                            })}
                            />
                            {errors.fecha && <p>{errors.fecha.message}</p>}
                        </div>
                        <div className="col">
                            <label htmlFor={`atencionregisterespecialidad`} className="form-label fw-bold text-dorian-light">Especialidad</label>
                            {/* <input defaultValue={atencion.especialidad} id={`atencionespecialidad${index}`} type="text" className="form-control" /> */}
                            <OptionEspecialidad iden={`atencionregisterespecialidad`}></OptionEspecialidad>
                            {errors.especialidadId && <p>{errors.especialidadId.message}</p>}
                        </div>
                    </div>
                    <div className="row shadow-lg p-3 mb-2 mx-1 bg-body rounded">
                        
                        <div className="col">
                            <label htmlFor={`atencionregisterestado`} className="form-label fw-bold text-dorian-light">Estado</label>
                            <select id={`atencionregisterestado`} className={`form-select ${errors.historia ? "is-invalid" : ""}`}
                            {...register("estado", {
                                
                            })}
                            >
                                <option selected value={"pendiente"}>Pendiente</option>
                                <option value={"pasado"}>Pasado</option>
                            </select>
                            {errors.doctorId && <p>{errors.doctorId.message}</p>}
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <button type="button" onClick={()=>{CancelNewAtencion()}} className="btn btn-secondary mx-2 w-25">Regresar</button>
                        <button type="submit" className="btn btn-warning mx-2 w-25">Registrar</button>
                    </div>
                </div>
            </form>
        </>
    )
}






export default NewAtenciones
