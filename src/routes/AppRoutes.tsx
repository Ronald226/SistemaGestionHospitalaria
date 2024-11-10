import { BrowserRouter, Route, Routes } from "react-router-dom"
import routes from './Routes'

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                {routes.map((routes, key) => {
                const { element, path } = routes;
                const Element = element;

                return (
                    <Route
                    key={key}
                    path={path}
                    element={ 
                        <Element />
                    }
                    />
                );
                })}
            </Routes>
        </BrowserRouter>
    );
};
export default AppRoutes
