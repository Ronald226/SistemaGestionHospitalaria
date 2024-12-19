import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from 'react-hook-form'
import {register_farmaco} from "../../services/Farmacia/Farmacos"
const NewFarmaco:React.FC=() => {
    return (
        <>
            <main className="main">
                <div className='list-content'>
                    <h2 className="titulos-seccion">Registro de Nuevo Farmaco</h2>
                    <section className="section no-scroll">
                        <FormularioNewFarmaco></FormularioNewFarmaco>
                    </section>
                </div>
            </main>
        </>
    )
}
interface RegisterFarmacoForm{
    codigo: string,
    nombre_articulo: string,
    descripcion: string,
    stock: number,
    precio: number
}
interface simpleOption{
    iden:string
}
const FormularioNewFarmaco:React.FC = () => {
    const [msgNew, setText] = useState<string>("");
    const navigate = useNavigate();
    const {register, handleSubmit, formState: { errors },clearErrors,setValue,watch} = useForm<RegisterFarmacoForm>();

    const CancelNewFarmaco=()=>{
        navigate(`/farmacia`);
    };

    
    const fetchRegisterFarmaco: SubmitHandler<RegisterFarmacoForm> = async (data) => {
        console.log(data)
        const codigo:string = data.codigo
        const nombre_articulo:string = data.nombre_articulo
        const descripcion:string= data.descripcion
        const stock:number=parseInt(String(data.stock))
        const precio:number = parseInt(String(data.precio))
        
        
        // const res= await register_atencion(historia,doctorId,especialidadId,fecha,estado);
        const res= await register_farmaco(codigo,nombre_articulo,descripcion,stock,precio)
        if(res){
            console.log("Farmaco Registrado")
            setText("Farmaco Registrado")
            setTimeout(() => {
                navigate("/farmacia");
            }, 3000);
        }else{
            console.log("Error en la Solicitud de Registrar Farmaco")
            setText("Error en la Solicitud de Registrar Farmaco")
        }
    }

    
    return (
        <>
            <form onSubmit={handleSubmit(fetchRegisterFarmaco)} className="formulario my-4">
                <p className="text-success">{msgNew}</p>
                <div className="list-group">
                    <div className="row shadow-lg p-3 mb-2 mx-1 bg-body rounded">
                        <div className="col">
                            {/* <label htmlFor={`atencionregisterhistoria`} className="form-label fw-bold text-dorian-light">N° Historia</label>
                            <OptionHistoria iden={`atencionregisterhistoria`}></OptionHistoria> */}

                            <label htmlFor={`farmacoregistercodigo`} className="form-label fw-bold text-dorian-light">Codigo</label>
                            <input type="text" id="farmacoregistercodigo" className={`form-control ${errors.codigo ? "is-invalid" : ""}`} placeholder="Coloca un Codigo para el farmaco"
                            {...register("codigo", {
                                required:"Es necesario un codigo."
                            })}
                            />
                            {errors.codigo && <p className="text-danger">{errors.codigo.message}</p>}
                            {/* <input readOnly defaultValue={atencion.paciente.nombres} id={`atencionupdatenombres${index}`} type="text" className="form-control"/> */}
                        </div>
                       
                    </div>
                    
                    <div className="row shadow-lg p-3 mb-2 mx-1 bg-body rounded">
                        <div className="col">
                            <label htmlFor={`farmacoregisternombrearticulo`} className="form-label fw-bold text-dorian-light">Nombre del Farmaco</label>
                            {/* <input defaultValue={atencion.doctor.nombre+" "+atencion.doctor.apellido} id={`atenciondoctor${index}`} type="text" className="form-control" /> */}
                            {/* <OptionDoctor iden={`farmacoregisternombrearticulo`}></OptionDoctor> */}
                            <input type="text" id="farmacoregisternombrearticulo" className={`form-control ${errors.nombre_articulo ? "is-invalid" : ""}`} placeholder="Coloca un Nombre para el farmaco" 
                            {...register("nombre_articulo", {
                                required:"Es necesario el nombre del articulo."
                            })}
                            />
                            {errors.nombre_articulo && <p className="text-danger">{errors.nombre_articulo.message}</p>}
                        </div>
                    </div>
                    <div className="row shadow-lg p-3 mb-2 mx-1 bg-body rounded">
                        <div className="col">
                            <label htmlFor={`farmacoregisterdescripcion`} className="form-label fw-bold text-dorian-light">Descripcion</label>
                            <textarea id={`farmacoregisterdescripcion`} placeholder="Coloca una descripcion breve..."
                            className={`form-control ${errors.descripcion ? "is-invalid" : ""}`}
                            {...register("descripcion", {
                                required: "Campo descripcion es necesario",
                            })}
                            />
                            {errors.descripcion && <p className="text-danger">{errors.descripcion.message}</p>}
                        </div>
                    </div>
                    <div className="row shadow-lg p-3 mb-2 mx-1 bg-body rounded">
                        
                        
                        {/* <div className="col">
                            <label htmlFor={`atencionregisterespecialidad`} className="form-label fw-bold text-dorian-light">Especialidad</label> */}
                            {/* <input defaultValue={atencion.especialidad} id={`atencionespecialidad${index}`} type="text" className="form-control" /> */}
                            {/* <OptionEspecialidad iden={`atencionregisterespecialidad`}></OptionEspecialidad>
                            {errors.especialidadId && <p>{errors.especialidadId.message}</p>}
                        </div> */}
                        <div className="col">
                            <label htmlFor={`farmacoregisterstock`} className="form-label fw-bold text-dorian-light">Stock</label>
                            <input type="text" id="farmacoregisterstock" placeholder="Coloca el stock"
                            className={`form-control ${errors.stock ? "is-invalid" : ""}`}
                            {...register("stock", {
                                required: "Campo stock es necesario",
                                pattern: {
                                    value: /^[1-9]\d*$/, // Expresión regular para números enteros positivos
                                    message: "El stock debe ser un número entero positivo",
                                },
                                validate: (value) =>
                                    Number.isInteger(Number(value)) || "El stock debe ser un número entero",
                            })}
                            />
                            {errors.stock && <p className="text-danger">{errors.stock.message}</p>}
                        </div>
                        <div className="col">
                            <label htmlFor={`farmacoregisterprecio`} className="form-label fw-bold text-dorian-light">Precio</label>
                            <input type="text" id="farmacoregisterprecio" placeholder="Coloca el precio"
                            className={`form-control ${errors.precio ? "is-invalid" : ""}`}
                            {...register("precio", {
                                required: "Campo precio es necesario",
                                pattern: {
                                    value: /^\d+(\.\d+)?$/, // Expresión regular para números positivos con o sin decimales
                                    message: "El precio debe ser un número positivo (entero o decimal)",
                                },
                                validate: (value) => parseFloat(String(value)) > 0 || "El precio debe ser mayor a 0",
                            })}
                            />
                            {errors.precio && <p className="text-danger">{errors.precio.message}</p>}
                        </div>
                    </div>
                    {/* <div className="row shadow-lg p-3 mb-2 mx-1 bg-body rounded">
                    </div> */}
                    <div className="row justify-content-center mt-3 mb-2">
                        <button type="button" onClick={()=>{CancelNewFarmaco()}} className="btn btn-secondary mx-2 w-25">Regresar</button>
                        <button type="submit" className="btn btn-warning mx-2 w-25">Registrar</button>
                    </div>
                </div>
            </form>
        </>
    )
}






export default NewFarmaco
