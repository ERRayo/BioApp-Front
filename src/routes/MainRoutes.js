import React, { useEffect, useState, Component, lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import Lazy from 'yup/lib/Lazy';
import loginUser from '../data/login';
import { browserHistory, Router, Route } from 'react-router';
import { Navigate } from 'react-router-dom';
import { func } from 'prop-types';

// Ruta de dashboard
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// Reportes de asistencia por carreras - Rutas
const ReporteAsistenciaProfesores = Loadable(lazy(() => import('views/administracion/reportes/asistencia/profesores')));

// Administración de catálogos - Rutas
const CatalogoCarreras = Loadable(lazy(() => import('views/administracion/catalogos/carreras')));
const CatalogoGrupos = Loadable(lazy(() => import('views/administracion/catalogos/grupos')));
const CatalogoPeriodos = Loadable(lazy(() => import('views/administracion/catalogos/periodos')));
const CatalogoProfesores = Loadable(lazy(() => import('views/administracion/catalogos/profesores')));
const CatalogoMaterias = Loadable(lazy(() => import('views/administracion/catalogos/materias')));
const CatalogoPrefeccto = Loadable(lazy(() => import('views/administracion/catalogos/prefectos')));
// Cuenta - Rutas
const CuentaAjustes = Loadable(lazy(() => import('views/cuenta/ajustes')));

const Login = Loadable(lazy(() => import('views/cuenta/authentication3/Login3')));

// ==============================|| MAIN ROUTING ||============================== //

function userLogin() {
    if (localStorage.getItem('userLogin') === 'true' && localStorage.getItem('typeUser') === 'Administrador') {
        console.log('Seseion de Admin');
        return true;
    }
    return false;
}
function tipoUser() {
    if (localStorage.getItem('userLogin') === 'true' && localStorage.getItem('typeUser') === 'Profesor') {
        console.log('Sesion de Profesor');
        return `Sesion profesor, email: ${localStorage.getItem('emailUser')}`;
    }
    console.log('Sin inicio de sesion');
    return <Navigate to="/cuenta/login" />;
}

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: userLogin() ? <DashboardDefault /> : tipoUser()
        },
        {
            path: '/dashboard/default',
            element: userLogin() ? <DashboardDefault /> : tipoUser()
        },
        {
            path: '/administracion/reportes/asistencia/profesores',
            element: userLogin() ? <ReporteAsistenciaProfesores /> : tipoUser()
        },
        {
            path: 'administracion/catalogos/carreras',
            element: userLogin() ? <CatalogoCarreras /> : tipoUser()
        },
        {
            path: 'administracion/catalogos/grupos',
            element: userLogin() ? <CatalogoGrupos /> : tipoUser()
        },
        {
            path: 'administracion/catalogos/materias',
            element: userLogin() ? <CatalogoMaterias /> : tipoUser()
        },
        {
            path: 'administracion/catalogos/periodos',
            element: userLogin() ? <CatalogoPeriodos /> : tipoUser()
        },
        {
            path: 'administracion/catalogos/profesores',
            element: userLogin() ? <CatalogoProfesores /> : tipoUser()
        },
        {
            path: 'administracion/catalogos/prefectos',
            element: userLogin() ? <CatalogoPrefeccto /> : tipoUser()
        },
        {
            path: 'cuenta/ajustes',
            element: userLogin() ? <CuentaAjustes /> : tipoUser()
        }
    ]
};

export default MainRoutes;
