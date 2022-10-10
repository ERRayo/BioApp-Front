import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));

const Login = Loadable(lazy(() => import('views/cuenta/authentication3/Login3')));
const Registro = Loadable(lazy(() => import('views/cuenta/authentication3/Register3')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

function userLogin() {
    if (localStorage.getItem('userLogin') === 'true' && localStorage.getItem('typeUser') === 'Administrador') {
        return <Navigate to="/" />;
    }
    if (localStorage.getItem('userLogin') === 'true' && localStorage.getItem('typeUser') === 'Profesor') {
        return <Navigate to="/" />;
    }
    return <Login />;
}

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/pages/login/login3',
            element: <AuthLogin3 />
        },
        {
            path: '/pages/register/register3',
            element: <AuthRegister3 />
        },
        {
            path: '/cuenta/login',
            element: userLogin()
        },
        {
            path: '/cuenta/registro',
            element: <Registro />
        }
    ]
};

export default AuthenticationRoutes;
