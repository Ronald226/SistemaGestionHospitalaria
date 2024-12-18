import useStoreSesion from '../../services/Auth/UserStore';
import { useNavigate } from 'react-router-dom';
import "./SidebarMenu.css"



const SidebarMenu:React.FC=() => {
    const {getRol,getSes,destroyToken}=useStoreSesion();
    const rol=getRol();
    const ses=getSes();
    let Elemento:any;
    console.log(ses)
    console.log(rol)

    const navigate = useNavigate();
    const CloseSesion=()=>{
        destroyToken();
        navigate('/')
    }
    switch (rol) {
        case "admision":
            Elemento=SidebarMenuAdmision;
            break;
        case "user":
            Elemento=SidebarMenuUser;
            break;
        case "farmacia":
            Elemento=SidebarMenuFarmacia;
            break;
        case "admin":
            Elemento=SidebarMenuAdmin;
            break;
        default:
            Elemento = null;
            break;
    }

    return (
        <>
           {Elemento ? <Elemento destroySesion={CloseSesion}/> : <div>No tienes acceso</div>}
        </>
    )
}
interface SidebarMenuProps{
    destroySesion:() => void
}
export const DescripcionUser:React.FC=() =>{
    const {getName,getRol}=useStoreSesion();
    return (
        <>
            <img src="/img/perfil-icon.png" alt="foto-perfil" />
            <span id='nombre' className='fw-bold name'>{getName()}</span>
            <span id='rol' className='mt-2 rol bg-light border border-4 rounded text-center text-capitalize fw-lighter'>{getRol()}</span>
        </>
    )
}
export const SidebarMenuUser:React.FC<SidebarMenuProps>= ({destroySesion})=>{
    const navigate = useNavigate();
    const Menu=()=>{
        return (
            <>
                <ul className='menu-user'>
                    <li>
                        <a onClick={()=>navigate("/patients")}>
                        <img src="/img/module-paciente-icon.png" alt="" />
                        <span>Pacientes</span>
                        </a>
                    </li>
                    <li>
                        <a onClick={()=>navigate("/farmacia")}>
                        <img src="/img/module-farmacia-icon.png" alt="" />
                        <span>Farmacia</span>
                        </a>
                    </li>
                    <li>
                        <a onClick={()=>navigate("/administracion")}>
                        <img src="/img/module-admin-icon.png" alt="" />
                        <span>Administracion</span>
                        </a>
                    </li> 
                    <li>
                        <a >
                        <img src="/img/setting-icon.png" alt="" />
                        <span>Configuracion</span>
                        </a>
                    </li>
                    <li><img className='btn-eliminar' onClick={()=>{destroySesion()}} src="/img/power.png" alt="" /></li>
                </ul>
            </>
        )
    }
    return (
        <>
            <SidebarMenuGeneral Menu={Menu}></SidebarMenuGeneral>
        </>
    )
}
export const SidebarMenuAdmision:React.FC<SidebarMenuProps>= ({destroySesion})=>{
    const navigate = useNavigate();
    const Menu=()=>{
        return (
            <>
                <ul className='menu-user'>
                    <li>
                        <a onClick={()=>navigate("/patients")}>
                        <img src="/img/module-paciente-icon.png" alt="" />
                        <span>Pacientes</span>
                        </a>
                    </li>
                    <li>
                        <a >
                        <img src="/img/setting-icon.png" alt="" />
                        <span>Configuracion</span>
                        </a>
                    </li>
                    <li><img className='btn-eliminar' onClick={()=>{destroySesion()}} src="/img/power.png" alt="" /></li>
                </ul>
            </>
        )
    }
    return (
        <>
            <SidebarMenuGeneral Menu={Menu}></SidebarMenuGeneral>
        </>
    )
}
export const SidebarMenuFarmacia:React.FC<SidebarMenuProps>= ({destroySesion})=>{
    const navigate = useNavigate();
    const Menu=()=>{
        return (
            <>
                <ul className='menu-user'>
                    <li>
                        <a onClick={()=>navigate("/farmacia")}>
                        <img src="/img/module-farmacia-icon.png" alt="" />
                        <span>Farmacia</span>
                        </a>
                    </li>
                    <li>
                        <a >
                        <img src="/img/setting-icon.png" alt="" />
                        <span>Configuracion</span>
                        </a>
                    </li>
                    <li><img className='btn-eliminar' onClick={()=>{destroySesion()}} src="/img/power.png" alt="" /></li>
                </ul>
            </>
        )
    }
    return (
        <>
            <SidebarMenuGeneral Menu={Menu}></SidebarMenuGeneral>
        </>
    )
}
export const SidebarMenuAdmin:React.FC<SidebarMenuProps>= ({destroySesion})=>{
    const navigate = useNavigate();
    const Menu=()=>{
        return (
            <>
                <ul className='menu-user'>
                    <li>
                        <a onClick={()=>navigate("/patients")}>
                        <img src="/img/module-paciente-icon.png" alt="" />
                        <span>Pacientes</span>
                        </a>
                    </li>
                    <li>
                        <a onClick={()=>navigate("/farmacia")}>
                        <img src="/img/module-farmacia-icon.png" alt="" />
                        <span>Farmacia</span>
                        </a>
                    </li>
                    <li>
                        <a onClick={()=>navigate("/administracion")}>
                        <img src="/img/module-admin-icon.png" alt="" />
                        <span>Administracion</span>
                        </a>
                    </li>
                    <li>
                        <a >
                        <img src="/img/setting-icon.png" alt="" />
                        <span>Configuracion</span>
                        </a>
                    </li>
                    <li><img className='btn-eliminar' onClick={()=>{destroySesion()}} src="/img/power.png" alt="" /></li>
                </ul>
            </>
        )
    }
    return (
        <>
            <SidebarMenuGeneral Menu={Menu}></SidebarMenuGeneral>
        </>
    )
}
interface SidebarMenuGeneralProps{
    Menu:React.FC
}
export const SidebarMenuGeneral:React.FC<SidebarMenuGeneralProps>= ({Menu})=>{
    const changeMenu=()=>{
        const sidebar=document.getElementById("sidebar-container");
        const nombre=document.getElementById("nombre")
        const rol=document.getElementById("rol")
        sidebar?.classList.toggle("shrink")
        rol?.classList.toggle("shrink")
        nombre?.classList.toggle("shrink")
        console.log(sidebar)
    }
    
    
    return (
        <>
        <div id='content-descripcion-user' className='content-descripcion-user'>
            <DescripcionUser></DescripcionUser>
        </div>
        <nav className='content-menu-user'>
            <div className='content-show-menu'>
                <input type="checkbox" id="show-menu" role="button" onClick={()=>changeMenu()}/>
                <img src="/img/menu-icon.png" id='show-menu-icon' alt="menu-icon" />
                <Menu></Menu>
            </div>
            
        </nav>
        </>
    )
}

export default SidebarMenu