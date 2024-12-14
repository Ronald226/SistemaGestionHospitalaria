import LoginPage from "../features/Auth/LoginPage";
import RecoverPassword from "../features/Auth/RecoverPassword";
import SetNewPassword from "../features/Auth/SetNewPassword";
import Dashboard from "../features/Dashboard/Dashboard";
import Home from "../features/Home/Home";
import {ListPacient} from "../features/Pacients/ListPacient";
import SearchPacient from "../features/Pacients/SearchPacient";
import UpdatePacient from "../features/Pacients/UpdatePacient";
import NewPacient from "../features/Pacients/NewPacient";
import { ListAtenciones } from "../features/Atenciones/ListAtenciones";
import NewAtenciones from "../features/Atenciones/NewAtenciones";
import { ListFarmacia } from "../features/Farmacia/ListFarmacia";
import { ListAdministracion } from "../features/Administracion/ListAdministracion";
interface RouteType {
  path: string;
  element: any;
  isPrivate: boolean;
  user:string[]
}

export const routes: RouteType[] = [
  {
    path: "/",
    element: Home,
    isPrivate: false,
    user: ["all"],
  },
  {
    path: "/recovery",
    element: RecoverPassword,
    isPrivate: true,
    user: ["all"],
  },
  {
    path: "/setNewPassword",
    element: SetNewPassword,
    isPrivate: true,
    user: ["all"],
  },
  {
    path: "/patients",
    element: ListPacient,
    isPrivate: true,
    user: ["user","admision","admin"],
  },
  {
    path: "/patients/new",
    element: NewPacient,
    isPrivate: true,
    user: ["user","admision","admin"],
  },
  {
    path: `/patients/update/:dni`,
    element: UpdatePacient,
    isPrivate: true,
    user: ["user","admision","admin"],
  },
  {
    path: "/patients/search",
    element: SearchPacient,
    isPrivate: true,
    user: ["user","admision","admin"],
  },
  {
    path: "/atenciones",
    element: ListAtenciones,
    isPrivate: true,
    user: ["user","admision","admin"],
  },
  {
    path: "/atenciones/nuevo",
    element: NewAtenciones,
    isPrivate: true,
    user: ["user","admision","admin"],
  },
  {
    path: "/farmacia",
    element: ListFarmacia,
    isPrivate: true,
    user: ["user","farmacia","admin"],
  },
  {
    path: "/administracion",
    element: ListAdministracion,
    isPrivate: true,
    user: ["admin"],
  },
];

export const routes_sesion:RouteType[] = [
  {
    path: "/login",
    element: LoginPage,
    isPrivate: false,
    user: ["all"],
  },
];
