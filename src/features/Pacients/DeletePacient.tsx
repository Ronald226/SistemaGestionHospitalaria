import { delete_pacient } from "../../services/Pacients/Pacients"
import { useNavigate } from 'react-router-dom';
import "./DeletePacient.css"
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useEffect } from "react";
interface DeletePacientProps{
    pacient: {
        dni:number,
        nombres:string,
        apellidos:string,
        historia:number,
    },
    index:number,
    RefreshList:number,
    setRefreshList:React.Dispatch<React.SetStateAction<number>>;
}
const DeletePacient:React.FC<DeletePacientProps>=({pacient,index,RefreshList,setRefreshList})=>{
    console.log(pacient)
    const DeletePacient= async (dni:number)=>{
        const res=await delete_pacient(dni);
    
        if(res){
            console.log("Paciente Eliminado");
            const modal=document.getElementById(`staticBackdrop${index}`);
            modal?.classList.remove('show');
            // Actualiza la lista invocando el setter
            setRefreshList((prev) => prev + 1); // Incrementa el contador

        }else{
            console.log("No se pudo eliminar Paciente")
        }
    
    }
    return (
        <>
        <img className='my-btn' data-bs-toggle="modal" data-bs-target={`#staticBackdrop${index}`} src="/img/btn-delete.png" alt="" />
        <div className="modal fade" id={`staticBackdrop${index}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby={`staticBackdropLabel${index}`} aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id={`staticBackdropLabel${index}`}>Eliminar Paciente</h1>
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
                    </div>

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" onClick={()=>DeletePacient(pacient.dni)} data-bs-dismiss="modal" className="btn btn-primary">Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
        
        
        </>
    );
}

export default DeletePacient;