import LoginPage from "../features/Auth/LoginPage";
import RecoverPassword from "../features/Auth/RecoverPassword";
import SetNewPassword from "../features/Auth/SetNewPassword";
import Dashboard from "../features/Dashboard/Dashboard";
import Home from "../features/Home/Home";
import ListPacient from "../features/Pacients/ListPacient";
import SearchPacient from "../features/Pacients/SearchPacient";
import UpdatePacient from "../features/Pacients/UpdatePacient";
import NewPacient from "../features/Pacients/NewPacient";

interface RouteType {
  path: string;
  element: any;
  isPrivate: boolean;
}

const routes: RouteType[] = [
  {
    path: "/",
    element: Home,
    isPrivate: false,
  },
  {
    path: "/login",
    element: LoginPage,
    isPrivate: false,
  },
  {
    path: "/dasboard/:user",
    element: Dashboard,
    isPrivate: true,
  },
  {
    path: "/recovery",
    element: RecoverPassword,
    isPrivate: true,
  },
  {
    path: "/setNewPassword",
    element: SetNewPassword,
    isPrivate: true,
  },
  {
    path: "/patients",
    element: ListPacient,
    isPrivate: true,
  },
  {
    path: "/patients/new",
    element: NewPacient,
    isPrivate: true,
  },
  {
    path: "/patients/update",
    element: UpdatePacient,
    isPrivate: true,
  },
  {
    path: "/patients/search",
    element: SearchPacient,
    isPrivate: true,
  },
];

export default routes;
