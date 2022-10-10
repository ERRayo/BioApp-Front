import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import { MenuItem, InputLabel, Select, FormControl, Button, FormLabel } from '@mui/material';
import PropTypes from 'prop-types';
import DataSourcePeriodo from 'data/catalogos/periodo';
import DataSourceMateria from 'data/catalogos/materia';
import DataSourceProfesor from 'data/catalogos/profesor';
import DataSourceCarreras from 'data/catalogos/carrera';
import DataSourceGrupos from 'data/catalogos/grupo';
import Swal from 'sweetalert2';
import SubCard from 'ui-component/cards/SubCard';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

export default function Formulario({ setTableUpdate }) {
    const [periodo, setPeriodo] = React.useState('');
    const [profesor, setProfesor] = React.useState('');
    const [listaPeriodos, setListaPeriodos] = React.useState([]);
    const [listaProfesores, setListaProfesores] = React.useState([]);
    const [fechaIni, setFechaIni] = React.useState(null);
    const [fechaFin, setFechaFin] = React.useState(null);

    function validarFecha() {
        if ((fechaIni === null && fechaFin === null) || (fechaIni !== null && fechaFin !== null)) {
            return true;
        }
        return false;
    }

    function returnFecha(fecha) {
        if (fecha != null) {
            return `${fecha.getFullYear()}:${fecha.getMonth()}:${fecha.getDate()}`;
        }
        return '';
    }

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

    useEffect(() => {
        fetchPeriodos();
        fetchProfesores();
    }, []);

    const handleChangePeriodo = (event) => {
        setPeriodo(event.target.value);
    };

    const handleChangeProfesor = (event) => {
        setProfesor(event.target.value);
    };

    // Horario
    const handleChangeFechaIni = (value) => {
        setFechaIni(value);
    };
    const handleChangeFechaFin = (value) => {
        setFechaFin(value);
    };

    const buscarAsistencia = (e) => {
        if (validarFecha() === false) {
            Swal.fire({
                position: 'bottom-end',
                icon: 'warning',
                title: '¡Verifique la fecha!',
                showConfirmButton: false,
                timer: 1500,
                toast: true
            });
            return;
        }

        const datosBusqueda = {
            id_profesor: `${profesor}`,
            id_periodo: `${periodo}`,
            fecha_ini: `${returnFecha(fechaIni)}`,
            fecha_fin: `${returnFecha(fechaFin)}`
        };

        console.log('Datos: --->>>>>>>><>---', listaPeriodos.data);

        // DataSourceGrupos.postGrupoHorario(nuevoGrupo);
        Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            title: '¡Grupo registrado!',
            showConfirmButton: false,
            timer: 1500,
            toast: true
        });

        setPeriodo('');
        setProfesor('');
        setTableUpdate(true);
        setFechaIni(null);
        setFechaFin(null);
    };

    return (
        <Box component="form" noValidate autoComplete="off">
            <div>
                <FormControl sx={{ m: 1, minWidth: '31%', p: 1 }} size="small" required>
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
                <FormControl sx={{ m: 1, minWidth: '31%', p: 1 }} size="small" required>
                    <InputLabel sx={{ p: 1 }}>Professsssor</InputLabel>
                    <Stack spacing={2} sx={{ width: 300 }}>
                        {listaProfesores.map((profe) => {
                            try {
                                return (
                                    <Autocomplete
                                        id="free-solo-demo"
                                        freeSolo
                                        options={profe.map((option) => option.nombre)}
                                        renderInput={(params) => <TextField {...params} label="freeSolo" />}
                                    />
                                );
                            } catch (e) {
                                return 'Error';
                            }
                        })}
                        ;
                    </Stack>
                </FormControl>
                <FormControl sx={{ m: 1, p: 1 }} size="normal">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Inico"
                            views={['day', 'month', 'year']}
                            inputFormat="dd/MM/yyyy"
                            value={fechaIni}
                            onChange={handleChangeFechaIni}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </FormControl>
                <FormControl sx={{ m: 1, p: 1 }} size="small">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Fin"
                            views={['day', 'month', 'year']}
                            inputFormat="dd/MM/yyyy"
                            value={fechaFin}
                            onChange={handleChangeFechaFin}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </FormControl>
                <Button variant="contained" onClick={buscarAsistencia} sx={{ m: 2, minWidth: '29%' }} startIcon={<SaveIcon />}>
                    Buscarrrrr
                </Button>
            </div>
        </Box>
    );
}

Formulario.propTypes = {
    setTableUpdate: PropTypes.func.isRequired
};
