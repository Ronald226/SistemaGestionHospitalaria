import { Atenciones } from "./InterfaceAtenciones";
import { formatDate } from "./FormatAtencion";

interface ViewAtencionProps{
    atencion: Atenciones,
    index:number,
    setRefreshList:React.Dispatch<React.SetStateAction<number>>
}

export const ViewAtencion:React.FC<ViewAtencionProps> =({atencion,index,setRefreshList})=> {
    console.log(atencion)

    return (
        <>
            <img className='my-btn' data-bs-toggle="modal" data-bs-target={`#staticBackdroViewAtencion${index}`} src="/img/btn-view.png" alt="" />
            <div className="modal fade" id={`staticBackdroViewAtencion${index}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby={`staticBackdropViewAtencionLabel${index}`} >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 text-enfasis fw-bold" id={`staticBackdropViewAtencionLabel${index}`}>Informacion de la Atencion</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="list-group">
                                <div className="row shadow-lg p-3 mb-2 mx-1 bg-body rounded">
                                    <div className="col">
                                        <label htmlFor={`atencionviewnombres${index}`} className="form-label fw-bold text-success">Nombres</label>
                                        <input readOnly value={atencion.paciente.nombres} id={`atencionviewnombres${index}`} type="text" className="form-control" />
                                    </div>
                                    <div className="col">
                                    <label htmlFor={`atencionviewapellidos${index}`} className="form-label fw-bold text-success">Apellidos</label>
                                        <input readOnly value={atencion.paciente.apellidos} id={`atencionviewapellidos${index}`} type="text" className="form-control"/>
                                    </div>
                                </div>
                                <div className="row shadow-lg p-3 mb-2 mx-1 bg-body rounded">
                                    <div className="col">
                                        <label htmlFor={`atencionviewdni${index}`} className="form-label fw-bold text-success">DNI</label>
                                        <input readOnly value={atencion.paciente.dni} id={`atencionviewdni${index}`} type="text" className="form-control"/>
                                    </div>
                                    <div className="col">
                                        <label htmlFor={`atencionviewhistoria${index}`} className="form-label fw-bold text-success">N° Historia</label>
                                        <input readOnly value={atencion.paciente.historia} id={`atencionviewhistoria${index}`} type="text" className="form-control"/>
                                    </div>
                                    <div className="col">
                                        <label htmlFor={`atencionestado${index}`} className="form-label fw-bold text-success">Estado</label>
                                        <div className={atencion.estado?"pasado":"pendiente"} id={`atencionestado${index}`}>{atencion.estado?"Pasado":"Pendiente"}</div>
                                        {/* <input readOnly defaultValue={atencion.estado?"Pasado":"Pendiente"} id={`atencionestado${index}`} type="text" className="form-control"/> */}
                                    </div>
                                </div>
                                <div className="row shadow-lg p-3 mb-2 mx-1 bg-body rounded">
                                    <div className="col">
                                        <label htmlFor={`atencionviewdoctor${index}`} className="form-label fw-bold text-success">Doctor@</label>
                                        <input readOnly value={atencion.doctor.nombre+" "+atencion.doctor.apellido} id={`atencionviewdoctor${index}`} type="text" className="form-control" />
                                    </div>
                                </div>
                                <div className="row shadow-lg p-3 mb-2 mx-1 bg-body rounded">
                                    <div className="col">
                                        <label htmlFor={`atencionviewespecialidad${index}`} className="form-label fw-bold text-success">Especialidad</label>
                                        <input readOnly value={atencion.doctor.especialidad.nombre} id={`atencionviewespecialidad${index}`} type="text" className="form-control" />
                                    </div>
                                    <div className="col">
                                        <label htmlFor={`atencionviewfecha${index}`} className="form-label fw-bold text-success">Fecha de Registro</label>
                                        <input readOnly value={formatDate(atencion.fecha)} id={`atencionviewfecha${index}`} type="text" className="form-control" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Regresar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
