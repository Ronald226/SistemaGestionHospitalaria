import React, { useState } from 'react'
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import { useNavigate } from "react-router-dom"
import "./RecoverPassword.css"

interface ILoginForm {
    user: string;
    email: string;
}
const RecoverPassword:React.FC= ()=>{
    const {register, handleSubmit, formState: { errors } } = useForm<ILoginForm>();
    const navigate = useNavigate();
    const [msg,setText]=useState("");
    const [msg2,setText2]=useState("");
    const ChangeLogin=()=>{
        navigate('/login');
    }

    const onSubmit: SubmitHandler<ILoginForm> = (data) => {
        console.log(data); // Aquí puedes manejar el login (API, redirección, etc.)
        if(data.user=="acasanova" && data.email=="acasanova@unsa.edu.pe"){
            setText2("El cambio se ha aprobado con exito");
            setText("");
            setTimeout(() => {
                navigate("/setNewPassword"); // Cambia "/nueva-ruta" a la ruta a la que quieres redirigir
              }, 2000);;
        }else{
            setText("Usuario o email no valido");
            setText2("");
        }
        
    };
    return (
        <div className='content-form'>
            <div>   
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1>Recuperar Contraseña</h1>
                    <p className='error-form'>{msg}</p>
                    <p className='confirm-form'>{msg2}</p>
                    <div>
                        <label htmlFor='user'>Usuario</label>
                        <input id='user' 
                        type="text" 
                        // placeholder='Coloca tu usuario'
                        {...register("user", {
                            required: "Campo es requerido",
                            pattern: {
                            value: /^[A-Za-z0-9._%+-]{2,}$/,
                            message: "Ingresa un usuario valido."
                            }
                        })}
                        />
                        {errors.user && <p>{errors.user.message}</p>}
                    </div>
                    <div>
                        <label htmlFor='email'>Correo</label>
                        <input id='email' 
                        type="email" 
                        // placeholder='Coloca tu contraseña'
                        {...register("email", {
                            required: "El correo es requerido",
                            pattern: {
                            value: /^[A-Za-z0-9._+-]{2,}@[A-Za-z0-9._+-]{2,}$/,
                            message: "Debe ser un correo valido."
                            }
                        })}
                        />
                        {errors.email && <p>{errors.email.message}</p>}
                    </div>
                    <button type="submit">Recuperar Contraseña</button>
                    <span><a onClick={ChangeLogin}>Volver al Login</a></span>
                </form>
            </div>
        </div>

    )
}
export default RecoverPassword;