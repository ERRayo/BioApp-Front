import React, { useState, useEffect } from 'react';
import { Grid, TextField } from '@mui/material';
import SubCard from 'ui-component/cards/SubCard';
import Formulario from './Formulario';
import Tabla from './Tabla';
import DataSourceProfesor from 'data/catalogos/profesor';

function CatalogoProfesores() {
    const [profesores, setProfesores] = React.useState([]);
    const [datos, setDatos] = React.useState([]);
    const [tableUpdate, setTableUpdate] = React.useState(false);
    const [tableFilter, setTableFilter] = React.useState(false);
    const [inputSearch, setInputSearch] = React.useState('');

    useEffect(() => {
        const fetchProfesores = async () => {
            const profesores = await DataSourceProfesor.getProfesoresData();
            setProfesores(profesores.data);
            setDatos(profesores.data);
        };
        fetchProfesores();
        setTableUpdate(false);
    }, [tableUpdate]);

    const handleInputSearch = (event) => {
        setInputSearch(event.target.value);
        setTableFilter(true);
    };

    const searchValue = () => {
        if (inputSearch !== '') {
            const teachers = profesores.filter((profesor) => profesor.nombre.toLowerCase().startsWith(inputSearch.toLowerCase()));
            setDatos(teachers);
        } else {
            setTableUpdate(true);
        }
    };

    return (
        <section>
            <Grid item xs={12} sm={12} sx={{ px: 2, pb: 2 }}>
                <SubCard title="Agregar profesor">
                    <Grid container direction="column" spacing={1}>
                        <Formulario setTableUpdate={setTableUpdate} />
                    </Grid>
                </SubCard>
            </Grid>
            <Grid item xs={12} sm={12} sx={{ px: 2, pb: 2 }}>
                <SubCard title="Profesores">
                    <Grid container direction="Collumn" spacing={1}>
                        <TextField
                            size="small"
                            defaultValue=""
                            variant="outlined"
                            placeholder="Buscar por nombre de profesor"
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
export default CatalogoProfesores;
