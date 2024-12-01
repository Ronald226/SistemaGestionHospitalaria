import React, { useState} from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import './LoginPage.css'
import { useNavigate } from "react-router-dom"
import login from "../../services/Auth/login"
import useStoreSesion  from '../../services/Auth/UserStore'

interface ILoginForm {
    user: string;
    password: string;
}

const LoginPage:React.FC = () => {

    const {register, handleSubmit, formState: { errors } } = useForm<ILoginForm>();
    const { startToken, getTok  } = useStoreSesion();
    // localStorage.setItem('usuario',"");
    
    
    // Función que maneja el envío del formulario
    const navigate = useNavigate();
    const [msg,setText]=useState("");
    
    const ChangePassword=()=>{
        navigate('/recovery');
    }

    const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
        console.log(data); // Aquí puedes manejar el login (API, redirección, etc.)
        const data_user =  await login(data.user,data.password); 
       
        console.log(data_user);

        if(data_user != null){
            console.log("exito");
            // const user = { email: data_user.email, token: data_user.token };
            // localStorage.setItem('usuario', JSON.stringify(user));
            startToken(data_user.token);
            console.log(getTok())
            navigate(`/patients`);
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
                        <label htmlFor='name'>email</label>
                        <input id='name' 
                        type="text" 
                        // placeholder='Coloca tu usuario'
                        {...register("user", {
                            required: "Campo es requerido",
                            
                        })}
                        />
                        {errors.user && <p>{errors.user.message}</p>}
                    </div>
                    <div>
                        <label htmlFor='pass'>contraseña</label>
                        <input id='pass' 
                        type="password" autoComplete='current-password'
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