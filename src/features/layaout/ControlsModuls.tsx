import './ControlsModuls.css'
import { Link } from 'react-router-dom'
const ControlsModuls = ()=>{
    return(
        <>
            <nav className='controls'>
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
export default ControlsModuls