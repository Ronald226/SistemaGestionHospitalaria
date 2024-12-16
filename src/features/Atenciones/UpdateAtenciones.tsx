import { Atenciones } from "./InterfaceAtenciones";
import { formatDate,formatDateISO } from "./FormatAtencion";
import React,{ useState,useEffect} from "react";
import { useForm, SubmitHandler, set } from 'react-hook-form'
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
    
    
    const [valorDoctor,setValorDoctor]=useState<number>(atencion.doctor.id);
    const [valorEspecialidades,setValorEspecialidades] = useState<number>(atencion.doctor.especialidad.id);

    const [valorNombre,setValorNombre]=useState<string>(atencion.paciente.nombres);
    const [valorApellido,setValorApellido]=useState<string>(atencion.paciente.apellidos);
    const [valorDni,setValorDni]=useState<number>(atencion.paciente.dni);
    const [valorHistoria,setValorHistoria]=useState<number>(atencion.paciente.historia);
    const [valorFecha,setValorFecha]=useState<string>(atencion.fecha);
    const [valorId,setValorId]=useState<number>(atencion.id)

    const inicialEstado=(index:number)=>{
        const btn:any=document.getElementById(`updateestado${index}`)
        btn.classList.replace(btn.className,atencion.estado ? "pasado" : "pendiente")
        setEstado(atencion.estado ? "Pasado" : "Pendiente")
        setValorDoctor(atencion.doctor.id)
        setValorEspecialidades(atencion.doctor.especialidad.id)
    }
    const changeEstado=(id:string)=>{
        const btn:any=document.getElementById(id);
        btn.classList.replace(btn.className,(btn.className=="pendiente")?"pasado":"pendiente");
        btn.textContent=btn.className;
        console.log(btn.className)
        setValue("estado",String(btn.className))
        setEstado(btn.className);
        // setValorDoctor(valorinicialDoctor)
    }
    
    const fetchUpadateAtenciones: SubmitHandler<UpdateAtencionesForm> = async (data) => {
        console.log(data)
        const historia:number = data.historia
        const fecha:string = formatDateISO(data.fecha)
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
        
        const fetchEspecialidades =async()=>{
            const data = await get_especialidades();
            setEspecialidades(data);
            
        }
        useEffect(() => {
            fetchEspecialidades();
            setValue("especialidadId",valorEspecialidades)
        }, []);

        const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            const value = e.target.value;
            setValorEspecialidades(parseInt(value))
             // Actualiza el valor en react-hook-form
        };
        return (
            <>
                <select className="form-select" id={iden} value={valorEspecialidades}
                    {...register("especialidadId",{
                        required:""
                    })}
                    onChange={handleSelectChange}
                >
                    {
                        especialidades.map((especialidad:any) => (
                            <option value={especialidad.id}>{especialidad.nombre}</option>
                            
                        ))
                    }
                </select>
            </>
        )
    }
    

    const OptionDoctor:React.FC<simpleOption> =({id,iden})=>{
        const [doctores, setDoctores] = useState<any[]>([]);
        
        
        const fetchDoctores= async() =>{
            const data = await get_doctores();
            setDoctores(data);
            // setValorDoctor(atencion.doctor.id)
            // Encontrar la especialidad inicial según el ID recibido
            // setValorinicialDoctor(id);
            // setValorDoctor(data.id)
            // setValue("doctorId",id)
            
        }
        useEffect(() => {
            fetchDoctores();
            setValue("doctorId",valorDoctor)
        }, []);
        const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            const value = e.target.value;
            setValorDoctor(parseInt(value))
             // Actualiza el valor en react-hook-form
        };
        console.log(id)
        return (
            <>
            <select className="form-select" id={iden} value={valorDoctor}
            {...register("doctorId",{
                required: ""
            })}
            onChange={handleSelectChange}
            >
                {
                    doctores.map((doctor:any) => (
                        <option value={doctor.id}>{doctor.nombre +" "+ doctor.apellido}</option>
                    ))
                }
            </select>
            </>
        )
    }
    return (
        <>
            <img className='my-btn' data-bs-toggle="modal" data-bs-target={`#staticBackdroUpdateAtencion${atencion.id}`} src="/img/btn-update.png" alt="" />
            <div className="modal fade" id={`staticBackdroUpdateAtencion${atencion.id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby={`staticBackdropUpdateAtencionLabel${atencion.id}`} >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 text-dorian fw-bold" id={`staticBackdropUpdateAtencionLabel${atencion.id}`}>Editar informacion de la Atencion</h1>
                            <button type="button" onClick={()=>{setRefreshList((prev) => prev + 1);inicialEstado(atencion.id)}} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSubmit(fetchUpadateAtenciones)}>
                        <div className="modal-body">
                            <div className="list-group">
                                <div className="row shadow-lg p-3 mb-2 mx-1 bg-body rounded">
                                    <div className="col">
                                        <label htmlFor={`atencionupdatenombres${atencion.id}`} className="form-label fw-bold text-dorian-light">Nombres</label>
                                        <input readOnly defaultValue={valorNombre} id={`atencionupdatenombres${atencion.id}`} type="text" className="form-control"/>
                                    </div>
                                    <div className="col">
                                    <label htmlFor={`atencionupdateapellidos${atencion.id}`} className="form-label fw-bold text-dorian-light">Apellidos</label>
                                        <input readOnly defaultValue={valorApellido} id={`atencionupdateapellidos${atencion.id}`} type="text" className="form-control"/>
                                    </div>
                                </div>
                                <div className="row shadow-lg p-3 mb-2 mx-1 bg-body rounded">
                                    <div className="col">
                                        <label htmlFor={`atencionupdatedni${atencion.id}`} className="form-label fw-bold text-dorian-light">DNI</label>
                                        <input readOnly defaultValue={valorDni} id={`atencionupdatedni${atencion.id}`} type="text" className="form-control"/>
                                    </div>
                                    <div className="col">
                                        <label htmlFor={`atencionupdatehistoria${atencion.id}`} className="form-label fw-bold text-dorian-light">N° Historia</label>
                                        <input readOnly defaultValue={valorHistoria} id={`atencionupdatehistoria${atencion.id}`} 
                                        type="text" 
                                        className="form-control"
                                        {...register("historia", {
                                    
                                        })}
                                        />
                                    </div>
                                    <div className="col">
                                        <label htmlFor={`atencionupdateestado${atencion.id}`} className="form-label fw-bold text-dorian-light">Estado</label>
                                        <div className={atencion.estado?"pasado":"pendiente"} id={`updateestado${atencion.id}`} onClick={()=>changeEstado(`updateestado${atencion.id}`)} >{estado}</div>
                                        <input hidden value={estado} id={`atencionupdateestado${atencion.id}`} 
                                        type="text" 
                                        className="form-control"
                                        {...register("estado", {
                                    
                                        })}
                                        />
                                    </div>
                                </div>
                                <div className="row shadow-lg p-3 mb-2 mx-1 bg-body rounded">
                                    <div className="col">
                                        <label htmlFor={`atencionupdatedoctor${atencion.id}`} className="form-label fw-bold text-dorian-light">Doctor@</label>
                                        {/* <input defaultValue={atencion.doctor.nombre+" "+atencion.doctor.apellido} id={`atenciondoctor${index}`} type="text" className="form-control" /> */}
                                        
                                        <OptionDoctor  id={atencion.doctor.id} iden={`atencionupdatedoctor${atencion.id}`}></OptionDoctor>
                                        
                                    </div>
                                </div>
                                <div className="row shadow-lg p-3 mb-2 mx-1 bg-body rounded">
                                    <div className="col">
                                        <label htmlFor={`atencionupdateespecialidad${atencion.id}`} className="form-label fw-bold text-dorian-light">Especialidad</label> 
                                        {/* <input defaultValue={atencion.especialidad} id={`atencionespecialidad${index}`} type="text" className="form-control" /> */}
                                        
                                        <OptionEspecialidad id={atencion.id} iden={`atencionupdateespecialidad${atencion.id}`}></OptionEspecialidad>
                                        
                                    </div> 
                                    <div className="col">
                                        <label htmlFor={`atencionupdatefecha${atencion.id}`} className="form-label fw-bold text-dorian-light">Fecha de Registro</label>
                                        <input readOnly defaultValue={formatDate(valorFecha)} id={`atencionupdatefecha${atencion.id}`} 
                                        type="text" 
                                        className="form-control"
                                        {...register("fecha", {
                                    
                                        })}
                                        />
                                        <input readOnly defaultValue={valorId} hidden
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
                            <button type="button" className="btn btn-secondary mx-2" onClick={()=>{setRefreshList((prev) => prev + 1);inicialEstado(atencion.id)}} data-bs-dismiss="modal">Regresar</button>
                            <button type="submit" className="btn btn-warning mx-2" data-bs-dismiss="modal">Actualizar</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
