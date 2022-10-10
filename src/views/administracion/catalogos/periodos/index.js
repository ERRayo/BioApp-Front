import React, { useState, useEffect } from 'react';
import { Typography, Grid, TextField } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import DataSourcePeriodo from 'data/catalogos/periodo';
import Formulario from './Formulario';
import Tabla from './Tabla';

function CatalogoPeriodos() {
    const [periodos, setPeriodos] = React.useState([]);
    const [datos, setDatos] = React.useState([]);
    const [tableUpdate, setTableUpdate] = React.useState(false);
    const [inputSearch, setInputSearch] = React.useState('');

    useEffect(() => {
        const fetchPeriodos = async () => {
            const periodos = await DataSourcePeriodo.getPeriodosData();
            console.log('Periodos', periodos);
            setPeriodos(periodos.data);
            setDatos(periodos.data);
        };
        fetchPeriodos();
        setTableUpdate(false);
    }, [tableUpdate]);

    const handleInputSearch = (event) => {
        setInputSearch(event.target.value);
    };

    const searchValue = () => {
        if (inputSearch !== '') {
            const items = periodos.filter((periodo) => periodo.fecha_ini.toLowerCase().startsWith(inputSearch.toLowerCase()));
            setDatos(items);
        } else {
            setTableUpdate(true);
        }
    };

    return (
        <section>
            <Grid item xs={12} sm={12} sx={{ px: 2, pb: 2 }}>
                <SubCard title="Agregar periodo académico">
                    <Grid container direction="column" spacing={1}>
                        <Formulario setTableUpdate={setTableUpdate} />
                    </Grid>
                </SubCard>
            </Grid>
            <Grid item xs={12} sm={12} sx={{ px: 2, pb: 2 }}>
                <SubCard title="Periodos académicos">
                    <Grid container direction="Collumn" spacing={1}>
                        <TextField
                            size="small"
                            defaultValue=""
                            variant="outlined"
                            placeholder="Buscar por fecha de inicio de cursos"
                            sx={{ ml: '66%', minWidth: '31%' }}
                            onChange={handleInputSearch}
                            onKeyUpCapture={searchValue}
                        />
                    </Grid>
                    <Grid container direction="column" spacing={1}>
                        <Tabla datos={datos} setTableUpdate={setTableUpdate} />
                    </Grid>
                </SubCard>
            </Grid>
        </section>
    );
}

export default CatalogoPeriodos;
