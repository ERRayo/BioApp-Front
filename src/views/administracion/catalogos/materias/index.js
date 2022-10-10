// import react
import React, { useState, useEffect } from 'react';
import DataSourceMateria from '../../../../data/catalogos/materia';
import axios from 'axios';

// material-ui
import { Grid, TextField } from '@mui/material';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import Formulario from './Formulario';
import Tabla from './Tabla';

// ==============================|| SAMPLE PAGE ||============================== //

function CatalogoMaterias() {
    const [materias, setMaterias] = React.useState([]);
    const [datos, setDatos] = React.useState([]);
    const [tableUpdate, setTableUpdate] = React.useState(false);
    const [tableFilter, setTableFilter] = React.useState(false);
    const [inputSearch, setInputSearch] = React.useState('');

    useEffect(() => {
        const fetchMaterias = async () => {
            const materias = await DataSourceMateria.getMateriasData();
            setMaterias(materias.data);
            setDatos(materias.data);
        };
        fetchMaterias();
        setTableUpdate(false);
    }, [tableUpdate]);

    const handleInputSearch = (event) => {
        setInputSearch(event.target.value);
        setTableFilter(true);
    };

    const searchValue = () => {
        if (inputSearch !== '') {
            const lista = materias.filter((materia) => materia.nombre.toLowerCase().startsWith(inputSearch.toLowerCase()));
            setDatos(lista);
        } else {
            setTableUpdate(true);
        }
    };

    return (
        <section>
            <Grid item xs={12} sm={12} sx={{ px: 2, pb: 2 }}>
                <SubCard title="Agregar materias">
                    <Grid container direction="column" spacing={1}>
                        <Formulario setTableUpdate={setTableUpdate} />
                    </Grid>
                </SubCard>
            </Grid>
            <Grid item xs={12} sm={12} sx={{ px: 2, pb: 2 }}>
                <SubCard title="Agregar materias">
                    <Grid container direction="Collumn" spacing={1}>
                        <TextField
                            size="small"
                            defaultValue=""
                            variant="outlined"
                            placeholder="Buscar por matería"
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

export default CatalogoMaterias;
