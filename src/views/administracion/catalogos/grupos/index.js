import React, { useState, useEffect } from 'react';
import { Grid, TextField } from '@mui/material';
import SubCard from 'ui-component/cards/SubCard';
import Formulario from './Formulario';
import DataSourceGrupos from '../../../../data/catalogos/grupo';
import Tabla from './Tabla';

const datosGrupos = [
    {
        id: 1,
        periodo: 'Enero - Julio 2020',
        carrera: 'Ingeniería en Sistemas Computacionales',
        materia: 'Fundamentos de programación',
        profesor: 'Uziel Trujillo Colón',
        sesiones: 15,
        estado: 'Activo'
    },
    {
        id: 1,
        periodo: 'Enero - Julio 2020',
        carrera: 'Ingeniería en Sistemas Computacionales',
        materia: 'Fundamentos de programación',
        profesor: 'Uziel Trujillo Colón',
        sesiones: 15,
        estado: 'Activo'
    },
    {
        id: 1,
        periodo: 'Enero - Julio 2020',
        carrera: 'Ingeniería en Sistemas Computacionales',
        materia: 'Fundamentos de programación',
        profesor: 'Uziel Trujillo Colón',
        sesiones: 15,
        estado: 'Activo'
    },
    {
        id: 1,
        periodo: 'Enero - Julio 2020',
        carrera: 'Ingeniería en Sistemas Computacionales',
        materia: 'Fundamentos de programación',
        profesor: 'Uziel Trujillo Colón',
        sesiones: 15,
        estado: 'Activo'
    },
    {
        id: 1,
        periodo: 'Enero - Julio 2020',
        carrera: 'Ingeniería en Sistemas Computacionales',
        materia: 'Fundamentos de programación',
        profesor: 'Uziel Trujillo Colón',
        sesiones: 15,
        estado: 'Activo'
    }
];

function CatalogoProfesores() {
    const [grupos, setGrupos] = React.useState([]);
    const [datos, setDatos] = React.useState([]);
    const [tableUpdate, setTableUpdate] = React.useState(false);
    const [tableFilter, setTableFilter] = React.useState(false);
    const [inputSearch, setInputSearch] = React.useState('');

    useEffect(() => {
        const fetchGrupos = async () => {
            const lista = await DataSourceGrupos.getGruposData();
            setGrupos(lista.data);
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
            const groups = grupos.filter((grupo) => grupo.materia.nombre.toLowerCase().startsWith(inputSearch.toLowerCase()));
            setDatos(groups);
        } else {
            setTableUpdate(true);
        }
    };

    return (
        <section>
            <Grid item xs={12} sm={12} sx={{ px: 2, pb: 2 }}>
                <SubCard title="Crear un nuevo grupo">
                    <Grid container direction="column" spacing={1}>
                        <Formulario setTableUpdate={setTableUpdate} />
                    </Grid>
                </SubCard>
            </Grid>
            <Grid item xs={12} sm={12} sx={{ px: 2, pb: 2 }}>
                <SubCard title="Grupos">
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
