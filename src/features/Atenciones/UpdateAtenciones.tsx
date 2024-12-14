import { Atenciones } from "./InterfaceAtenciones";
import { formatDate } from "./FormatAtencion";
import React,{ useState,useEffect} from "react";
import { useForm, SubmitHandler } from 'react-hook-form'
import {update_atenciones,get_doctores,get_especialidades} from "./../../services/Atenciones/Atenciones"


export interface UpdateAtencionesForm{
    id: number
    historia: number
    fecha: string
    doctorId: number,
    especialidadId: number,
    estado: string
}
export interface UpdateAtencionesProps{
    atencion: Atenciones
    index: number
    setRefreshList:React.Dispatch<React.SetStateAction<number>>
}
interface simpleOption{
    id:any
    iden:string
}

export const UpdateAtenciones:React.FC<UpdateAtencionesProps> =({atencion,index,setRefreshList})=>{
    const {register, handleSubmit, formState: { errors },setValue } = useForm<UpdateAtencionesForm>();
    // const [especialidadinicial,setEspecialidadinicial]=useState<number>(0);
    const [estado, setEstado] = useState(atencion.estado ? "Pasado" : "Pendiente");
    const [msgUpdate, setText] = useState<string>("");

    const inicialEstado=(index:number)=>{
        const btn:any=document.getElementById(`updateestado${index}`)
        btn.classList.replace(btn.className,atencion.estado ? "pasado" : "pendiente")
        setEstado(atencion.estado ? "Pasado" : "Pendiente")
    }
    const changeEstado=(id:string)=>{
        const btn:any=document.getElementById(id);
        btn.classList.replace(btn.className,(btn.className=="pendiente")?"pasado":"pendiente");
        btn.textContent=btn.className;
        console.log(btn.className)
        setValue("estado",String(btn.className))
        setEstado(btn.className);
    }

    const fetchUpadateAtenciones: SubmitHandler<UpdateAtencionesForm> = async (data) => {
        console.log(data)
        const historia:number = data.historia
        const fecha:string = data.fecha
        const doctorId:number = data.doctorId
        const especialidadId:number = data.especialidadId
        const estado:boolean = (data.estado=="pasado")?true:false
        const id:number = data.id
        const res= await update_atenciones(historia,fecha,doctorId,especialidadId,estado,id);

        if(res){
            setRefreshList((prev) => prev + 1);
            console.log("Paciente Actualizado "+atencion)
        }else{
            console.log("Error en la Solicitud de Actualizar Paciente")
        }
    };
    const OptionEspecialidad:React.FC<simpleOption> =({id,iden}) =>{
        const [especialidades,setEspecialidades] = useState<any[]>([]);
        const [valorinicial,setValorinicial] = useState<string>("");
        const fetchEspecialidades =async()=>{
            const data = await get_especialidades();
            setEspecialidades(data);

            // Encontrar la especialidad inicial según el ID recibido
            const especialidadInicial = data.find((especialidad: any) => especialidad.nombre === id);
            if (especialidadInicial) {
                setValorinicial(especialidadInicial.id);
                setValue("especialidadId",especialidadInicial.id)
            }
        }
        useEffect(() => {
            fetchEspecialidades();
        }, []);
       
        return (
            <>
                <select className="form-select" id={iden} defaultValue={valorinicial}
                    {...register("especialidadId",{})}
                >
                    {
                        especialidades.map((especialidad:any) => (
                            <option selected={especialidad.nombre==id} value={especialidad.id}>{especialidad.nombre}</option>
                            
                        ))
                    }
                </select>
            </>
        )
    }
    const OptionDoctor:React.FC<simpleOption> =({id,iden})=>{
        const [doctores, setDoctores] = useState<any[]>([]);
        const [valorinicial,setValorinicial] = useState<string>("");
        
        const fetchDoctores= async() =>{
            const data = await get_doctores();
            setDoctores(data);

            // Encontrar la especialidad inicial según el ID recibido
            
            setValorinicial(id);
            setValue("doctorId",id)
            
        }
        useEffect(() => {
            fetchDoctores();
        }, []);
        console.log(id)
        return (
            <>
            <select className="form-select" id={iden} defaultValue={valorinicial}
            {...register("doctorId",{})}
            >
                {
                    doctores.map((doctor:any) => (
                        <option selected={doctor.id==id} value={doctor.id}>{doctor.nombre +" "+ doctor.apellido}</option>
                    ))
                }
            </select>
            </>
        )
    }
    return (
        <>
            <img className='my-btn' data-bs-toggle="modal" data-bs-target={`#staticBackdroUpdateAtencion${index}`} src="/img/btn-update.png" alt="" />
            <div className="modal fade" id={`staticBackdroUpdateAtencion${index}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby={`staticBackdropUpdateAtencionLabel${index}`} >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 text-dorian fw-bold" id={`staticBackdropUpdateAtencionLabel${index}`}>Editar informacion de la Atencion</h1>
                            <button type="button" onClick={()=>{setRefreshList((prev) => prev + 1);inicialEstado(index)}} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSubmit(fetchUpadateAtenciones)}>
                        <div className="modal-body">
                            <div className="list-group">
                                <div className="row shadow-lg p-3 mb-2 mx-1 bg-body rounded">
                                    <div className="col">
                                        <label htmlFor={`atencionupdatenombres${index}`} className="form-label fw-bold text-dorian-light">Nombres</label>
                                        <input readOnly defaultValue={atencion.paciente.nombres} id={`atencionupdatenombres${index}`} type="text" className="form-control"/>
                                    </div>
                                    <div className="col">
                                    <label htmlFor={`atencionupdateapellidos${index}`} className="form-label fw-bold text-dorian-light">Apellidos</label>
                                        <input readOnly defaultValue={atencion.paciente.apellidos} id={`atencionupdateapellidos${index}`} type="text" className="form-control"/>
                                    </div>
                                </div>
                                <div className="row shadow-lg p-3 mb-2 mx-1 bg-body rounded">
                                    <div className="col">
                                        <label htmlFor={`atencionupdatedni${index}`} className="form-label fw-bold text-dorian-light">DNI</label>
                                        <input readOnly defaultValue={atencion.paciente.dni} id={`atencionupdatedni${index}`} type="text" className="form-control"/>
                                    </div>
                                    <div className="col">
                                        <label htmlFor={`atencionupdatehistoria${index}`} className="form-label fw-bold text-dorian-light">N° Historia</label>
                                        <input readOnly defaultValue={atencion.paciente.historia} id={`atencionupdatehistoria${index}`} 
                                        type="text" 
                                        className="form-control"
                                        {...register("historia", {
                                    
                                        })}
                                        />
                                    </div>
                                    <div className="col">
                                        <label htmlFor={`atencionupdateestado${index}`} className="form-label fw-bold text-dorian-light">Estado</label>
                                        <div className={atencion.estado?"pasado":"pendiente"} id={`updateestado${index}`} onClick={()=>changeEstado(`updateestado${index}`)} >{estado}</div>
                                        <input hidden value={estado} id={`atencionupdateestado${index}`} 
                                        type="text" 
                                        className="form-control"
                                        {...register("estado", {
                                    
                                        })}
                                        />
                                    </div>
                                </div>
                                <div className="row shadow-lg p-3 mb-2 mx-1 bg-body rounded">
                                    <div className="col">
                                        <label htmlFor={`atencionupdatedoctor${index}`} className="form-label fw-bold text-dorian-light">Doctor@</label>
                                        {/* <input defaultValue={atencion.doctor.nombre+" "+atencion.doctor.apellido} id={`atenciondoctor${index}`} type="text" className="form-control" /> */}
                                        
                                        <OptionDoctor  id={atencion.doctor.id} iden={`atencionupdatedoctor${index}`}></OptionDoctor>
                                        
                                    </div>
                                </div>
                                <div className="row shadow-lg p-3 mb-2 mx-1 bg-body rounded">
                                    <div className="col">
                                        <label htmlFor={`atencionupdateespecialidad${index}`} className="form-label fw-bold text-dorian-light">Especialidad</label>
                                        {/* <input defaultValue={atencion.especialidad} id={`atencionespecialidad${index}`} type="text" className="form-control" /> */}
                                        
                                        <OptionEspecialidad id={atencion.especialidad} iden={`atencionupdateespecialidad${index}`}></OptionEspecialidad>
                                        
                                    </div>
                                    <div className="col">
                                        <label htmlFor={`atencionupdatefecha${index}`} className="form-label fw-bold text-dorian-light">Fecha de Registro</label>
                                        <input readOnly defaultValue={formatDate(atencion.fecha)} id={`atencionupdatefecha${index}`} 
                                        type="text" 
                                        className="form-control"
                                        {...register("fecha", {
                                    
                                        })}
                                        />
                                        <input readOnly defaultValue={atencion.id} hidden
                                        type="text"
                                        className="form-control"
                                        {...register("id", {
                                    
                                        })}
                                        />
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary mx-2" onClick={()=>{setRefreshList((prev) => prev + 1);inicialEstado(index)}} data-bs-dismiss="modal">Regresar</button>
                            <button type="submit" className="btn btn-warning mx-2" data-bs-dismiss="modal">Actualizar</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
