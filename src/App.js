import { useSelector } from 'react-redux';
import React, { useEffect, useState, Component, lazy } from 'react';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';

import loginUser from './data/login';

// ==============================|| APP ||============================== //

const App = () => {
    const customization = useSelector((state) => state.customization);

    const fechUser = async () => {
        const getUser = await loginUser.getUser();

        console.log('User login >>>>', getUser);

        try {
            localStorage.setItem('typeUser', getUser.data.tipo_usuario);
        } catch (e) {
            localStorage.setItem('typeUser', undefined);
        }

        if (getUser === 'Sin usuario') {
            localStorage.setItem('userLogin', false);
        }
        if (getUser !== 'Sin usuario') {
            localStorage.setItem('userLogin', true);
        }
    };

    useEffect(() => {
        fechUser();
        localStorage.getItem('userLogin');
        localStorage.getItem('typeUser');
    }, []);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(customization)}>
                <CssBaseline />
                <NavigationScroll>
                    <Routes />
                </NavigationScroll>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;
