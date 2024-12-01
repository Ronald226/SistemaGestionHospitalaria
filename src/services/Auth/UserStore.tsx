import { useSesion } from "../../context/SesionContext";

const useStoreSesion=()=>{
    const { setSesion, setToken, isToken,isSesion } = useSesion();
    const destroyToken=()=>{
        setSesion(false);
        setToken("");
    }
    const startToken=(tok:string)=>{
        setSesion(true);
        setToken(tok);
    }
    const getTok=()=>{
        return isToken;
    }
    const getSes=()=>{
        return isSesion;
    }
    return {destroyToken, getTok, startToken,getSes};
};

export default useStoreSesion;