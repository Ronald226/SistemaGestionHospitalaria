import React, { createContext, useState, ReactNode, useContext } from 'react';

interface SesionContextProps{
  isSesion: boolean;
  setSesion: (load: boolean) => void;
  isToken: string;
  setToken:(tok:string)=>void;
  isRol: string;
  setRol:(rol: string)=>void;
  isName: string;
  setName:(name: string)=>void;
}


// const Sesion = createContext<SesionContextProps>({
//     isSesion:false,
//     isToken:"",
//     setSesion: ()=>{},
//     setToken: ()=>{},
// });
const Sesion = createContext<SesionContextProps | null>(null);

const SesionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isSesion, setSesion] = useState<boolean>(false);
    const [isToken, setToken] = useState<string>("");
    const [isRol,setRol]=useState<string>("");
    const [isName,setName]=useState<string>("");
    return (
        <Sesion.Provider value={{ isSesion, setSesion, isToken, setToken,isRol,setRol,isName,setName}}>
            {children}
        </Sesion.Provider>
    );
};

// const SesionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//     const [isSesion, setSesion] = useState<boolean>(false); // Estado de sesión
//     const [isToken, setToken] = useState<string>(""); // Estado del token

//     return (
//         <Sesion.Provider value={{ isSesion, setSesion, isToken, setToken }}>
//             {children}
//         </Sesion.Provider>
//     );
// };


const useSesion = () => {
    const context = useContext(Sesion);
    if (!context) {
      throw new Error("useSesion must be used within a SesionProvider");
    }
    return context;
};
  
export { Sesion, SesionProvider, useSesion};