import React, { useState, useEffect } from 'react';
import { Grid, TextField } from '@mui/material';
import SubCard from 'ui-component/cards/SubCard';
import Formulario from './Formulario';
import DataSourcePrefecto from '../../../../data/catalogos/prefecto';
import Tabla from './Tabla';

function CatalogoProfesores() {
    const [prefectos, setPrefectos] = React.useState([]);
    const [datos, setDatos] = React.useState([]);
    const [tableUpdate, setTableUpdate] = React.useState(false);
    const [tableFilter, setTableFilter] = React.useState(false);
    const [inputSearch, setInputSearch] = React.useState('');

    useEffect(() => {
        const fetchGrupos = async () => {
            const lista = await DataSourcePrefecto.getPrefectoData();
            setPrefectos(lista.data);
            setDatos(lista.data);
        };
        fetchGrupos();
        setTableUpdate(false);
    }, [tableUpdate]);

    const handleInputSearch = (event) => {
        setInputSearch(event.target.value);
        setTableFilter(true);
    };

    const searchValue = () => {
        if (inputSearch !== '') {
            const prefectosAux = prefectos.filter((prefecto) => prefecto.nombre.toLowerCase().startsWith(inputSearch.toLowerCase()));
            setDatos(prefectosAux);
        } else {
            setTableUpdate(true);
        }
    };

    return (
        <section>
            <Grid item xs={12} sm={12} sx={{ px: 2, pb: 2 }}>
                <SubCard title="Agregar un prefecto">
                    <Grid container direction="column" spacing={1}>
                        <Formulario setTableUpdate={setTableUpdate} />
                    </Grid>
                </SubCard>
            </Grid>
            <Grid item xs={12} sm={12} sx={{ px: 2, pb: 2 }}>
                <SubCard title="Prefectos">
                    <Grid container direction="Collumn" spacing={1}>
                        <TextField
                            size="small"
                            defaultValue=""
                            variant="outlined"
                            placeholder="Buscar por materia"
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
