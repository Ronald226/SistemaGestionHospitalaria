import React from 'react'
import { useNavigate, useParams } from "react-router-dom"
import './Dashboard.css'


const Dashboard:React.FC=()=>{
    const navigate = useNavigate();
    const {user}= useParams<{ user: string }>();


    const login = () =>{
        navigate("/login");
    }
    return (
        <>
            <h1>Hola {user}</h1>
            <button type='button' id='logout' onClick={login}> Cerrar Sesion </button>
        </>
    )

}
export default Dashboard;