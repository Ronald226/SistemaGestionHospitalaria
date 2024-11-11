import React, { useState } from 'react'
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import { useNavigate } from "react-router-dom"
import "./SetNewPassoword.css"

interface ILoginForm {
    newpass: string;
    confirmpass: string;
}
const SetNewPassoword:React.FC= ()=>{
    const {register, handleSubmit, formState: { errors } } = useForm<ILoginForm>();
    const navigate = useNavigate();
    const [msg,setText]=useState("");
    const [msg2,setText2]=useState("");
    const ChangeLogin=()=>{
        navigate('/login');
    }

    const onSubmit: SubmitHandler<ILoginForm> = (data) => {
        console.log(data); // Aquí puedes manejar el login (API, redirección, etc.)
        if(data.newpass==data.confirmpass){
            setText2("El cambio de contraseña es valido");
            setText("");
            setTimeout(() => {
                navigate("/login"); // Cambia "/nueva-ruta" a la ruta a la que quieres redirigir
              }, 2000);

        }else{
            setText2("");
            setText("Las contraseñas no coinciden");
        }
        
    };
    return (
        <div className='content-form'>
            <div>   
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1>Establecer Contraseña</h1>
                    <p className='error-form'>{msg}</p>
                    <p className='confirm-form'>{msg2}</p>
                    <div>
                        <label htmlFor='newpass'>Nueva Contraseña</label>
                        <input id='newpass' 
                        type="password" 
                        // placeholder='Coloca tu usuario'
                        {...register("newpass", {
                            required: "Campo es requerido",
                            minLength: {
                                value: 6,
                                message: "La contraseña debe ser minimo 6 letras."
                            }
                        })}
                        />
                        {errors.newpass && <p>{errors.newpass.message}</p>}
                    </div>
                    <div>
                        <label htmlFor='confirmpass'>Confirmar Contraseña</label>
                        <input id='confirmpass' 
                        type="password" 
                        // placeholder='Coloca tu contraseña'
                        {...register("confirmpass", {
                            required: "El correo es requerido",
                            minLength: {
                                value: 6,
                                message: "La contraseña debe ser minimo 6 letras."
                            }
                        })}
                        />
                        {errors.confirmpass && <p>{errors.confirmpass.message}</p>}
                    </div>
                    <button type="submit">Establecer Contraseña</button>
                    <span><a onClick={ChangeLogin}>Volver al Login</a></span>
                </form>
            </div>
        </div>

    )
}
export default SetNewPassoword;