import { useSesion } from "../../context/SesionContext";

const useStoreSesion=()=>{
    const { setSesion, setToken, isToken,isSesion,isRol,setRol,isName,setName } = useSesion();
    const destroyToken=()=>{
        setSesion(false);
        setToken("");
    }
    const startToken=(tok:string,rol:string,name:string)=>{
        setSesion(true);
        setToken(tok);
        setRol(rol);
        setName(name);
    }
    const getTok=()=>{
        return isToken;
    }
    const getSes=()=>{
        return isSesion;
    }
    const getRol=()=>{
        return isRol;
    }
    const getName=()=>{
        return isName;
    }
    return {destroyToken, getTok, startToken,getSes,getRol,getName};
};

export default useStoreSesion;