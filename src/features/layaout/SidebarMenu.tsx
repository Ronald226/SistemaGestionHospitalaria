import useStoreSesion from '../../services/Auth/UserStore';
import { useNavigate } from 'react-router-dom';

interface SidebarMenuProps{
    
}
const SidebarMenu:React.FC=() =>{
    const {destroyToken}=useStoreSesion();
    const navigate = useNavigate();
    const destroySesion=()=>{
        destroyToken();
        navigate('/login')
    }
    
    
    return (
        <img className='btn' onClick={destroySesion} src="/img/power.png" alt="" />
    )
}


export default SidebarMenu