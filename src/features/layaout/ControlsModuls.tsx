import './ControlsModuls.css'
import { Link } from 'react-router-dom'
export const ControlsModuls = ()=>{
    return(
        <>
            <nav className='controls mt-3'>
                <Link to="/patients">
                    <img src="/img/pacient-icon1.png" alt="" />
                    <span>Pacientes</span>
                </Link>
                <Link to="/patients/new">
                    <img src="/img/pacient-icon1.png" alt="" />
                    <span>Nuevo Paciente</span>
                </Link>
                
                <Link to="/patients/search">
                    <img src="/img/pacient-icon2.png" alt="" />
                    <span>Buscar Paciente</span>
                </Link>
                <Link to="/atenciones">
                    <img src="/img/pacient-icon4.png" alt="" />
                    <span>Atenciones Diarias</span>
                </Link>
                <Link to="/atenciones/nuevo">
                    <img src="/img/pacient-icon3.png" alt="" />
                    <span>Registrar Atencion</span>
                </Link>
                
            </nav>
        </>
    )
}
export const ControlsModulsFarmacia = ()=>{
    return(
        <>
            <nav className='controls mt-3'>
                <Link to="/farmacia">
                    <img src="/img/pacient-icon1.png" alt="" />
                    <span>Farmacia</span>
                </Link>
                <Link to="/farmacia/new">
                    <img src="/img/pacient-icon1.png" alt="" />
                    <span>Nuevo Farmaco</span>
                </Link>
            </nav>
        </>
    )
}
export const ControlsModulsAdministracion = ()=>{
    return(
        <>
            <nav className='controls mt-3'>
                <Link to="/administracion">
                    <img src="/img/pacient-icon1.png" alt="" />
                    <span>Usuarios</span>
                </Link>
                <Link to="/administracion/new">
                    <img src="/img/pacient-icon1.png" alt="" />
                    <span>Nuevo Usuario</span>
                </Link>
            </nav>
        </>
    )
}