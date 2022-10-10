import React, { useState, useEffect } from 'react';
import { Grid, TextField } from '@mui/material';
import SubCard from 'ui-component/cards/SubCard';
import Formulario from './Formulario';
import DataSourceCarrera from '../../../../data/catalogos/carrera';
import Tabla from './Tabla';

function CatalogoCarreras() {
    const [carreras, setCarreras] = React.useState([]);
    const [datos, setDatos] = React.useState([]);
    const [tableUpdate, setTableUpdate] = React.useState(false);
    const [tableFilter, setTableFilter] = React.useState(false);
    const [inputSearch, setInputSearch] = React.useState('');

    useEffect(() => {
        const fetchCarreras = async () => {
            const carreras = await DataSourceCarrera.getCarrerasData();
            setCarreras(carreras.data);
            setDatos(carreras.data);
        };
        fetchCarreras();
        setTableUpdate(false);
    }, [tableUpdate]);

    const handleInputSearch = (event) => {
        setInputSearch(event.target.value);
        setTableFilter(true);
    };

    const searchValue = () => {
        if (inputSearch !== '') {
            const planes = carreras.filter((plan) => plan.nombre.toLowerCase().startsWith(inputSearch.toLowerCase()));
            setDatos(planes);
        } else {
            setTableUpdate(true);
        }
    };

    return (
        <section>
            <Grid item xs={12} sm={12} sx={{ px: 2, pb: 2 }}>
                <SubCard title="Agregar planes de estudio">
                    <Grid container direction="column" spacing={1}>
                        <Formulario setTableUpdate={setTableUpdate} />
                    </Grid>
                </SubCard>
            </Grid>
            <Grid item xs={12} sm={12} sx={{ px: 2, pb: 2 }}>
                <SubCard title="Planes de estudio">
                    <Grid container direction="Collumn" spacing={1}>
                        <TextField
                            size="small"
                            defaultValue=""
                            variant="outlined"
                            placeholder="Buscar por programa académico"
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

export default CatalogoCarreras;
