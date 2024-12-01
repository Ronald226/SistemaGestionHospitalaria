import { BrowserRouter, Route, Routes } from "react-router-dom"
import {routes, routes_sesion} from './Routes'
import {getToken} from "../services/Auth/Auth";
import useStoreSesion from "../services/Auth/UserStore";
import React, { useState,useEffect } from "react";
import Loading from "../features/Errors/Loading";
import { LoadingProvider, useLoading } from "../context/LoadingContext"
import { SesionProvider } from "../context/SesionContext";
import SidebarMenu from "../features/layaout/SidebarMenu";
import TopHeader from "../features/layaout/TopHeader";

interface PrivateRouteProps {
    children: React.ReactNode; // Tipo correcto para children
    authToken: any;         // Asegúrate de usar 'string' en lugar de 'String'
}

const PrivateRoute:React.FC<PrivateRouteProps> =({ children, authToken }) => {
    if(!authToken){
        return "Sin Acceso";
    }
    return (
        <>
        {children}
        </>
    );
};

const routes_element = (authToken: any ):React.ReactElement =>{
    let routes_element:any;
    const {getSes}= useStoreSesion();
    const pri= getSes();
    routes_element=routes.map((routes,key)=>{
        const { element, path, isPrivate } = routes;
                const Element = element;
        
        return (

            <Route
                key={key}
                path={path}
                element={
                    isPrivate ? (
                        <PrivateRoute authToken={authToken}>
                            <Maquetado sesion={pri}>
                                <Element />
                            </Maquetado>
                            
                        </PrivateRoute>
                        ) : (
                            <Element/>
                        )
                }
            />
        )
        
        
    })
    console.log(routes_element);
    return routes_element;
}
interface Estructura{
    children: React.ReactNode
    sesion:boolean
}
const Maquetado:React.FC<Estructura>=({children,sesion})=>{
    return (
        <>
            
                <div className="sidebar-container">
                    <SidebarMenu></SidebarMenu>
                </div>
                
                <div className="main-container">
                    <header className="header">
                        <TopHeader></TopHeader>
                    </header>
                    
                    {children}
                </div>
            
        </>
        
    )
}
const Menu=()=>{
    return ( "menu")
}

const routes_element_sesion= (authToken: any ):React.ReactElement =>{
    let routes_element_sesion:any;
    const {getSes}= useStoreSesion();
    const pri= getSes();
    routes_element_sesion=routes_sesion.map((routes_sesion,key)=>{
        const { element, path, isPrivate } = routes_sesion;
                const Element = element;
        
        return (
            <Route
                key={key}
                path={path}
                element={
                    authToken ? (
                        <PrivateRoute authToken={!pri}>
                            <Element />
                        </PrivateRoute>
                        ) : (
                        <Element/>
                        )
                }
            />
        )
        
        
    })
    console.log(routes_element_sesion);
    return routes_element_sesion;
}

const RoutesLoading:React.FC = () => {
    const [authToken, setAuthToken] = useState<boolean | null>(null);
    const { isLoading } = useLoading();
    const { setLoading } = useLoading();
    const { getTok } = useStoreSesion();

    useEffect(() => {
        const validateToken = async () => {
            // const toks:any=localStorage.getItem('usuario');
            const toks:string= getTok();    
            console.log("token"+toks);
            let isValid;
            let t:string;
           
            if(toks!="" && toks!=null){
                t=toks;
                console.log("ultimo token  "+ t)
                try{
                    console.log(t)
                    isValid = await getToken(t);
                    console.log("validacion"+isValid)
                    setAuthToken(isValid);
                }catch(error){
                    console.error("Error validando el token:", error);
                    setAuthToken(false);
                }
                finally{
                    setLoading(false);
                }
            }else{
                isValid=false;
            }
            console.log("valor de isValid"+isValid);
            
        };
        validateToken();
    });

    return (
        <>
            {isLoading && <Loading />}
            <BrowserRouter>
                <Routes>
                    {routes_element(authToken)}
                    {routes_element_sesion(authToken)}
                </Routes>
            </BrowserRouter>
        
        </>
    );
};
const AppRoutes:React.FC = () => {
    return (
        <>  
            <LoadingProvider>
                <SesionProvider>
                    <RoutesLoading></RoutesLoading>
                </SesionProvider>
            </LoadingProvider>
      
        </>
        
    )
}
export default AppRoutes
