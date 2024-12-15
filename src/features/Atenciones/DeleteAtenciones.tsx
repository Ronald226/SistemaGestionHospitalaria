import { delete_atenciones } from "../../services/Atenciones/Atenciones";
import { Atenciones } from "./InterfaceAtenciones";
import { formatDate } from "./FormatAtencion";

interface DeleteAtencionesProps{
    atencion:Atenciones
    index: number
    setRefreshList:React.Dispatch<React.SetStateAction<number>>
}

export const DeleteAtenciones:React.FC<DeleteAtencionesProps>=({atencion,index,setRefreshList}) =>{
    
    const DeleteAtencion= async (id:number)=>{
        const res=await delete_atenciones(id);
    
        if(res){
            console.log("Paciente Eliminado");
            // Actualiza la lista invocando el setter
            setRefreshList((prev) => prev + 1); // Incrementa el contador
            console.log(setRefreshList)
            
        }else{
            console.log("No se pudo eliminar Paciente")
        }
    
    }
    return (
        <>
            <img className='my-btn' data-bs-toggle="modal" data-bs-target={`#staticBackdroDeleteAtencion${index}`} src="/img/btn-delete.png" alt="" />
            <div className="modal fade" id={`staticBackdroDeleteAtencion${index}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby={`staticBackdropDeleteAtencionLabel${index}`} >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 text-danger-dark fw-bold" id={`staticBackdropDeleteAtencionLabel${index}`}>Eliminar informacion de la Atencion</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="list-group">
                                <div className="row shadow-lg p-3 mb-2 mx-1 bg-body rounded">
                                    <div className="col">
                                        <label htmlFor={`atenciondeletenombres${index}`} className="form-label fw-bold text-danger">Nombres</label>
                                        <input readOnly defaultValue={atencion.paciente.nombres} id={`atenciondeletenombres${index}`} type="text" className="form-control" />
                                    </div>
                                    <div className="col">
                                    <label htmlFor={`atenciondeleteapellidos${index}`} className="form-label fw-bold text-danger">Apellidos</label>
                                        <input readOnly defaultValue={atencion.paciente.apellidos} id={`atenciondeleteapellidos${index}`} type="text" className="form-control"/>
                                    </div>
                                </div>
                                <div className="row shadow-lg p-3 mb-2 mx-1 bg-body rounded">
                                    <div className="col">
                                        <label htmlFor={`atenciondeletedni${index}`} className="form-label fw-bold text-danger">DNI</label>
                                        <input readOnly defaultValue={atencion.paciente.dni} id={`atenciondeletedni${index}`} type="text" className="form-control"/>
                                    </div>
                                    <div className="col">
                                        <label htmlFor={`atenciondeletehistoria${index}`} className="form-label fw-bold text-danger">N° Historia</label>
                                        <input readOnly defaultValue={atencion.paciente.historia} id={`atenciondeletehistoria${index}`} type="text" className="form-control"/>
                                    </div>
                                    <div className="col">
                                        <label htmlFor={`atenciondeleteestado${index}`} className="form-label fw-bold text-danger">Estado</label>
                                        <div className={atencion.estado?"pasado":"pendiente"} id={`atenciondeleteestado${index}`}>{atencion.estado?"Pasado":"Pendiente"}</div>
                                        {/* <input readOnly defaultValue={atencion.estado?"Pasado":"Pendiente"} id={`atencionestado${index}`} type="text" className="form-control"/> */}
                                    </div>
                                </div>
                                <div className="row shadow-lg p-3 mb-2 mx-1 bg-body rounded">
                                    <div className="col">
                                        <label htmlFor={`atenciondeletedoctor${index}`} className="form-label fw-bold text-danger">Doctor@</label>
                                        <input readOnly defaultValue={atencion.doctor.nombre+" "+atencion.doctor.apellido} id={`atenciondeletedoctor${index}`} type="text" className="form-control" />
                                    </div>
                                </div>
                                <div className="row shadow-lg p-3 mb-2 mx-1 bg-body rounded">
                                    <div className="col">
                                        <label htmlFor={`atenciondeleteespecialidad${index}`} className="form-label fw-bold text-danger">Especialidad</label>
                                        <input readOnly defaultValue={atencion.especialidad} id={`atenciondeleteespecialidad${index}`} type="text" className="form-control" />
                                    </div>
                                    <div className="col">
                                        <label htmlFor={`atenciondeletefecha${index}`} className="form-label fw-bold text-danger">Fecha de Registro</label>
                                        <input readOnly defaultValue={formatDate(atencion.fecha)} id={`atenciondeletefecha${index}`} type="text" className="form-control" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Regresar</button>
                            <button type="button" onClick={()=>DeleteAtencion(atencion.id)} data-bs-dismiss="modal" className="btn btn-danger">Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}