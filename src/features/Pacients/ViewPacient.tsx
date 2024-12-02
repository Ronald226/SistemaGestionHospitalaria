
interface DeletePacientProps{
    pacient: {
        dni:number,
        nombres:string,
        apellidos:string,
        historia:number,
        fechaCreacion:string
    },
    index:number
}
const ViewPacient:React.FC<DeletePacientProps>=({pacient,index})=>{
    console.log(pacient)
    const formatDate = (isoDate: string): string => {
        const date = new Date(isoDate);
    
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
    
        return `${day}-${month}-${year}`;
    };
    
    return (
        <>
        <img className='my-btn' data-bs-toggle="modal" data-bs-target={`#staticBackdro${index}`} src="/img/btn-view.png" alt="" />
        <div className="modal fade" id={`staticBackdro${index}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby={`staticBackdropLabel${index}`} aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id={`staticBackdroLabel${index}`}>Datos del Paciente</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div className="list-group">
                        
                        <a href="#" className="list-group-item list-group-item-action">
                            <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">DNI</h5>

                            </div>
                            <p className="mb-1">{pacient.dni}</p>
                        </a>
                        <a href="#" className="list-group-item list-group-item-action">
                            <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">Nombres</h5>

                            </div>
                            <p className="mb-1">{pacient.nombres}</p>
                        </a>
                        <a href="#" className="list-group-item list-group-item-action">
                            <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">Apellidos</h5>

                            </div>
                            <p className="mb-1">{pacient.apellidos}</p>
                        </a>
                        <a href="#" className="list-group-item list-group-item-action">
                            <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">N° Historia</h5>

                            </div>
                            <p className="mb-1">{pacient.historia}</p>
                        </a>
                        <a href="#" className="list-group-item list-group-item-action">
                            <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">Fecha de Creacion</h5>

                            </div>
                            <p className="mb-1">{formatDate(pacient.fechaCreacion)}</p>
                        </a>
                    </div>

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        
                    </div>
                </div>
            </div>
        </div>
        
        
        </>
    );
}

export default ViewPacient;