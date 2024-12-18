import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from 'react-hook-form'
// import {register_farmaco} from "../../services/Farmacia/Farmacos"
import {register_user} from "../../services/Administracion/Usuarios/Usuarios"

const NewUsuario:React.FC=() => {
    return (
        <>
            <main className="main">
                <div className='list-content'>
                    <h2 className="titulos-seccion">Registro de Nuevo Usuario</h2>
                    <section className="section no-scroll">
                        <FormularioNewUsuario></FormularioNewUsuario>
                    </section>
                </div>
            </main>
        </>
    )
}
interface RegisterUsuarioForm{
    name: string,
    email: string,
    password: string,
    role: string
}
interface simpleOption{
    iden:string
}
const FormularioNewUsuario:React.FC = () => {
    const [msg, setText] = useState<string>("");
    const navigate = useNavigate();
    const {register, handleSubmit, formState: { errors },clearErrors,setValue,watch} = useForm<RegisterUsuarioForm>();

    const CancelNewUsuario=()=>{
        navigate(`/administracion`);
    };

    
    const fetchRegisterFarmaco: SubmitHandler<RegisterUsuarioForm> = async (data) => {
        console.log(data)
        // const codigo:string = data.codigo
        const name:string = data.name
        const email:string = data.email
        const password:string = data.password
        const role:string = data.role
        // const descripcion:string= data.descripcion
        // const stock:number=parseInt(String(data.stock))
        // const precio:number = parseInt(String(data.precio))
        
        
        // const res= await register_atencion(historia,doctorId,especialidadId,fecha,estado);
        const res= await register_user(name,email,password,role)
        if(res){
            console.log("Usuario Registrado")
            setText("Usuario Registrado")
            setTimeout(() => {
                navigate("/administracion");
            }, 3000);
        }else{
            console.log("Error en la Solicitud de Registrar Usuario")
            setText("Error en la Solicitud de Registrar Usuario")
        }
    }

    
    return (
        <>
            <form onSubmit={handleSubmit(fetchRegisterFarmaco)} className="formulario my-4">
                <p className="text-success">{msg}</p>
                <div className="list-group">
                    <div className="row shadow-lg p-3 mb-2 mx-1 bg-body rounded">
                        <div className="col">
                            {/* <label htmlFor={`atencionregisterhistoria`} className="form-label fw-bold text-dorian-light">N° Historia</label>
                            <OptionHistoria iden={`atencionregisterhistoria`}></OptionHistoria> */}

                            <label htmlFor={`userregistername`} className="form-label fw-bold text-dorian-light">Nombres</label>
                            <input type="text" id="userregistername" className={`form-control ${errors.name ? "is-invalid" : ""}`} placeholder="Coloca un Nombre para el usuario"
                            {...register("name", {
                                required:"Es necesario un nombre.",
                                pattern: {
                                    value: /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/, // Permite solo letras y espacios
                                    message: "Solo se permiten letras y espacios",
                                },
                            })}
                            />
                            {errors.name && <p className="text-danger">{errors.name.message}</p>}
                            {/* <input readOnly defaultValue={atencion.paciente.nombres} id={`atencionupdatenombres${index}`} type="text" className="form-control"/> */}
                        </div>
                       
                    </div>
                    
                    <div className="row shadow-lg p-3 mb-2 mx-1 bg-body rounded">
                        <div className="col">
                            <label htmlFor={`usuarioregisteremail`} className="form-label fw-bold text-dorian-light">Correo</label>
                            <input type="email" id="usuarioregisteremail" className={`form-control ${errors.email ? "is-invalid" : ""}`} placeholder="Coloca un Correo para el usuario" 
                            {...register("email", {
                                required:"Es necesario un email.",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Expresión regular para validar correos
                                    message: "Ingrese un correo válido",
                                },
                            })}
                            />
                            {errors.email && <p className="text-danger">{errors.email.message}</p>}
                        </div>
                    </div>
                    <div className="row shadow-lg p-3 mb-2 mx-1 bg-body rounded">
                        <div className="col">
                            <label htmlFor={`usuarioregisterpassword`} className="form-label fw-bold text-dorian-light">Password</label>
                            <input type="text" id="usuarioregisterpassword" className={`form-control ${errors.password ? "is-invalid" : ""}`} placeholder="Coloca una Contraseña para el usuario" 
                            {...register("password", {
                                required:"Es necesario una contraseña.",
                                minLength: {
                                    value: 6,
                                    message: "La contraseña debe tener al menos 6 caracteres",
                                },
                                maxLength: {
                                    value: 20,
                                    message: "La contraseña no puede exceder los 20 caracteres",
                                },
                            })}
                            />
                            {errors.password && <p className="text-danger">{errors.password .message}</p>}
                        </div>
                    </div>
                    <div className="row shadow-lg p-3 mb-2 mx-1 bg-body rounded">
                    
                        <div className="col">
                            <label htmlFor={`usuarioregisterrole`} className="form-label fw-bold text-dorian-light">Rol</label>
                            <select id="usuarioregisterrole"
                                className={`form-control ${errors.role ? "is-invalid" : ""}`}
                                {...register("role", {
                                    required: "Campo stock es necesario",
                                    
                                })}
                                defaultValue={"user"}
                            >
                                <option value={"user"}>Usuario</option>
                                <option value={"admision"}>Admision</option>
                                <option value={"farmacia"}>Farmacia</option>
                                <option value={"admin"}>Admin</option>
                            </select>
                            {errors.role && <p className="text-danger">{errors.role.message}</p>}
                        </div>
                        
                    </div>
                    {/* <div className="row shadow-lg p-3 mb-2 mx-1 bg-body rounded">
                    </div> */}
                    <div className="row justify-content-center mt-3 mb-2">
                        <button type="button" onClick={()=>{CancelNewUsuario()}} className="btn btn-secondary mx-2 w-25">Regresar</button>
                        <button type="submit" className="btn btn-warning mx-2 w-25">Registrar</button>
                    </div>
                </div>
            </form>
        </>
    )
}






export default NewUsuario
