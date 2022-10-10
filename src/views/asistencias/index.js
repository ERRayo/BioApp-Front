// material-ui
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import SubCard from 'ui-component/cards/SubCard';
import { Select, MenuItem, InputLabel, FormControl, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DataSourceGrupos from 'data/catalogos/grupo';
import DataSourcePeriodo from 'data/catalogos/periodo';
import DataSourceProfesor from 'data/catalogos/profesor';
import Tabla from './Tabla';
// ==============================|| SAMPLE PAGE ||============================== //

function Asistencias() {
    const [datos, setDatos] = React.useState([]);
    const [grupos, setGrupos] = React.useState([]);
    const [periodo, setPeriodo] = React.useState('');
    const [profesor, setProfesor] = React.useState('');
    const [listaPeriodos, setListaPeriodos] = React.useState([]);
    const [listaProfesores, setListaProfesores] = React.useState([]);
    const [tableUpdate, setTableUpdate] = React.useState(false);
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250
            }
        }
    };

    const fetchPeriodos = async () => {
        const lista = await DataSourcePeriodo.getPeriodosData();
        setListaPeriodos(lista.data);
    };

    const fetchProfesores = async () => {
        const lista = await DataSourceProfesor.getProfesoresData();
        setListaProfesores(lista.data);
    };

    const fetchGrupos = async () => {
        const lista = await DataSourceGrupos.getGruposData();
        setGrupos(lista.data);
        setDatos(lista.data);
    };

    useEffect(() => {
        fetchPeriodos();
        fetchProfesores();
        fetchGrupos();
        setTableUpdate(false);
    }, [tableUpdate]);

    const handleChangePeriodo = (event) => {
        setPeriodo(event.target.value);
    };

    const handleChangeProfesor = (event) => {
        setProfesor(event.target.value);
    };

    const searchValue = () => {
        if (periodo !== '' && profesor !== '') {
            const groups = grupos.filter((grupo) => grupo.periodo.id === periodo);
            const filterGroups = groups.filter((grupo) => grupo.profesor.id === profesor);
            setDatos(filterGroups);
        } else {
            setDatos(grupos);
        }
    };

    return (
        <section>
            <Grid item xs={12} sm={12} sx={{ px: 2, pb: 2 }}>
                <SubCard title="Reportes de asistencia de alumnos por grupos">
                    <Grid container direction="Collumn" sx={{ display: 'inline' }} spacing={1}>
                        <div>
                            <FormControl sx={{ minWidth: '25%', ml: '25%', mr: '1%', pt: 1 }} size="small" required>
                                <InputLabel>Periodo de estudios</InputLabel>
                                <Select onChange={handleChangePeriodo} value={periodo} MenuProps={MenuProps}>
                                    {listaPeriodos.map((periodo) => {
                                        try {
                                            return (
                                                <MenuItem key={periodo.id} value={periodo.id}>
                                                    {`${periodo.fecha_ini} - ${periodo.fecha_fin}`}
                                                </MenuItem>
                                            );
                                        } catch (e) {
                                            return 'Error';
                                        }
                                    })}
                                    ;
                                </Select>
                            </FormControl>
                            <FormControl sx={{ minWidth: '25%', pt: 1 }} size="small" required>
                                <InputLabel>Profesor</InputLabel>
                                <Select onChange={handleChangeProfesor} value={profesor} MenuProps={MenuProps}>
                                    {listaProfesores.map((profe) => {
                                        try {
                                            return (
                                                <MenuItem key={profe.id} value={profe.id}>
                                                    {`${profe.nombre} ${profe.apellido_paterno} ${profe.apellido_materno}`}
                                                </MenuItem>
                                            );
                                        } catch (e) {
                                            return 'Error';
                                        }
                                    })}
                                    ;
                                </Select>
                            </FormControl>
                            <Button variant="contained" onClick={searchValue} sx={{ m: 1, minWidth: '15%' }} startIcon={<SearchIcon />}>
                                Buscar
                            </Button>
                        </div>
                    </Grid>
                    <Grid container direction="column" spacing={1}>
                        <Tabla datos={datos} />
                    </Grid>
                </SubCard>
            </Grid>
        </section>
    );
}

export default Asistencias;
