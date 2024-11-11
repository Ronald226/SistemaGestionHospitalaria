import LoginPage from "../features/Auth/LoginPage";
import RecoverPassword from "../features/Auth/RecoverPassword";
import SetNewPassword from "../features/Auth/SetNewPassword";
import Dashboard from "../features/Dashboard/Dashboard";
import Home from "../features/Home/Home";

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
  
];

export default routes;
