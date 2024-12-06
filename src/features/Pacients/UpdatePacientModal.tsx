import { useParams,useNavigate,useLocation } from "react-router-dom";
import React,{ useState,useEffect} from "react";
import {update_pacient } from "../../services/Pacients/Pacients"
import { useForm, SubmitHandler } from 'react-hook-form'
import {pacient_search_dni} from "../../services/Pacients/Pacients"
import "./UpdatePacientModal.css"
interface UpdatePacientModalProps{
    pacients: any,
    index:number,
    setRefreshList:React.Dispatch<React.SetStateAction<number>>,
    
}
interface ILoginForm {
    dni: number;
    nombres: String;
    apellidos: String;
    historia: number
}
const UpadatePacientModal:React.FC<UpdatePacientModalProps> = ({pacients,index,setRefreshList}) => {
    const {register, handleSubmit, formState: { errors } } = useForm<ILoginForm>();
    
    const [msgUpdate, setText] = useState<string>("");

    const fetchUpadatePacient: SubmitHandler<ILoginForm> = async (data) => {
        console.log(data)
        const dni:number =pacients.dni
        const nombres:String =data.nombres
        const apellidos:String =data.apellidos
        const historia:number = pacients.historia
        const res= await update_pacient(dni,nombres,apellidos,historia);

        if(res){
            setRefreshList((prev) => prev + 1);
            console.log("Paciente Actualizado "+pacients)
        }else{
            console.log("Error en la Solicitud de Actualizar Paciente")
        }
    };  
    
    return (
    <>
        <img className='my-btn' data-bs-toggle="modal" data-bs-target={`#staticBackdropUpdate${index}`} src="/img/btn-update.png" alt="" />
        <div className="modal fade" id={`staticBackdropUpdate${index}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby={`staticBackdropLabel${index}`}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id={`staticBackdropLabelUpdate${index}`}>Actualizar informacion del Paciente</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                    <form onSubmit={handleSubmit(fetchUpadatePacient)} className="formulario-modal">
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInputUpdate1" className="form-label">DNI*</label>
                            <input type="number" 
                                className="form-control bg-light"
                                id="exampleFormControlInputUpdate1" 
                                placeholder="*Obligatorio"
                                defaultValue={pacients.dni}
                                readOnly
                                {...register("dni", {
                                    
                                })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInputUpdate2" className="form-label">Nombres</label>
                            <input type="text" 
                                className="form-control" 
                                id="exampleFormControlInputUpdate2" 
                                placeholder="*Obligatorio"
                                defaultValue={pacients.nombres}
                                {...register("nombres", {
                                    required: "Campo es requerido",
                                })}
                            />
                            
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInputUpdate3" className="form-label">Apellidos</label>
                            <input type="text" 
                                className="form-control" 
                                id="exampleFormControlInputUpdate3" 
                                placeholder="*Obligatorio"
                                defaultValue={pacients.apellidos}
                                {...register("apellidos", {
                                    required: "Campo es requerido",
                                })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInputUpdate4" className="form-label">N° Historia</label>
                            <input type="number" 
                                className="form-control bg-light" 
                                id="exampleFormControlInputUpdate4" 
                                placeholder="*Obligatorio"
                                defaultValue={pacients.historia}
                                readOnly
                                {...register("historia", {
                                    
                                })}
                            />
                        </div>
                        <div className="d-flex justify-content-center">
                        <button type="button" className="btn btn-secondary mx-2" data-bs-dismiss="modal">Cancelar</button>
                        <button data-bs-dismiss="modal" className="btn btn-primary mx-2" type="submit">Actualizar</button>
                        </div>
                        {errors.dni && <p>{errors.dni.message}</p>}
                        
                    </form>
                    </div>
                </div>
            </div>
           
        </div>
        
        
    </>
    )
}

export default UpadatePacientModal;