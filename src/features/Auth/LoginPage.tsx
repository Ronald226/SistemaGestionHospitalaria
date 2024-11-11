import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import './LoginPage.css'
import { useNavigate } from "react-router-dom"

interface ILoginForm {
    user: string;
    password: string;
}

const LoginPage:React.FC = () => {

    const {register, handleSubmit, formState: { errors } } = useForm<ILoginForm>();
    
    // Función que maneja el envío del formulario
    const navigate = useNavigate();
    const [msg,setText]=useState("");
    
    const ChangePassword=()=>{
        navigate('/recovery');
    }

    const onSubmit: SubmitHandler<ILoginForm> = (data) => {
        console.log(data); // Aquí puedes manejar el login (API, redirección, etc.)
        if(data.user=="acasanova" && (data.password=="123456789" || data.password=="123456")){
            navigate(`/dasboard/${data.user}`);
        }else{
            setText("Usuario o contraseña no valido");
        }
        
    };
    
    return (
        <div className='content-form'>
            <div>   
                <form onSubmit={handleSubmit(onSubmit)}>
                    <img src="/img/user-icon.png" alt="user" className='user-icon' />
                    <p className='error-form'>{msg}</p>
                    <div>
                        <label htmlFor='name'>usuario</label>
                        <input id='name' 
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
                        <label htmlFor='pass'>contraseña</label>
                        <input id='pass' 
                        type="password" 
                        // placeholder='Coloca tu contraseña'
                        {...register("password", {
                            required: "La contraseña es requerida",
                            minLength: {
                            value: 6,
                            message: "La contraseña debe ser minimo 6 letras."
                            }
                        })}
                        />
                        {errors.password && <p>{errors.password.message}</p>}
                    </div>
                    <button type="submit">Iniciar</button>
                    <span><a onClick={ChangePassword}>¿Has Olvidado tu contraseña?</a></span>
                </form>
            </div>
        </div>
        
    );
};

export default LoginPage;