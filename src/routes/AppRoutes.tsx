import { BrowserRouter, Route, Routes } from "react-router-dom"
import routes from './Routes'
import getToken from "../services/Auth/Auth";
import React, { createContext, useContext, useState,useEffect } from "react";

// interface UserContextProps {
//     isActive: boolean;
//     authToken: string | null;
//     setAuthToken: (token: string | null) => void;
//     setIsActive: (active: boolean) => void;
// }
interface PrivateRouteProps {
    children: React.ReactNode; // Tipo correcto para children
    authToken: boolean;         // Asegúrate de usar 'string' en lugar de 'String'
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



const AppRoutes = () => {
    const [authToken, setAuthToken] = useState<boolean | null>(null);

    useEffect(() => {
        const validateToken = async () => {
            const isValid = await getToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTczMjUzODExMywiZXhwIjoxNzMyNjI0NTEzfQ.7t2uvtt71vapOfK5qnpmVWYxYSPV5Sx4FcxUqoVuxyk');
            console.log(isValid);
            setAuthToken(isValid);
        };
        validateToken();
    }, []);

    if (authToken === null) {
        return <div>Cargando...</div>; // Mostrar un loader mientras se valida el token
    }

    return (
        <BrowserRouter>
            <Routes>
                {routes.map((routes, key) => {
                const { element, path, isPrivate } = routes;
                const Element = element;

                return (
                    <Route
                    key={key}
                    path={path}
                    
                    element={
                        isPrivate ? (
                            <PrivateRoute authToken={authToken}>
                              <Element />
                            </PrivateRoute>
                          ) : (
                            <Element />
                          )
                    }
                    />
                );
                })}
            </Routes>
        </BrowserRouter>
    );
};
export default AppRoutes
