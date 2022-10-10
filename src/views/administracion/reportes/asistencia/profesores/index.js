import React, { useState, useEffect, useCallback } from 'react';
import { Grid, Box, FormControl, Select, MenuItem, FormHelperText, InputLabel, TextField } from '@mui/material';
import SubCard from 'ui-component/cards/SubCard';
import DataSourceReportesProfesores from '../../../../../data/reportes/profesor';
import Formulario from './Formulario';
import DataSourcePeriodo from 'data/catalogos/periodo';
import DataSourceProfesor from 'data/catalogos/profesor';
import DataSourceCarrerasPorPeriodo from 'data/reportes/carrera';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import LoopIcon from '@mui/icons-material/Loop';
import Tabla from './Tabla';
import { DatePicker } from '@mui/x-date-pickers';
import Swal from 'sweetalert2';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import SaveIcon from '@mui/icons-material/Save';
import { CSVLink, CSVDownload } from 'react-csv';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import useAutocomplete from '@mui/material/useAutocomplete';
import { styled } from '@mui/system';

function ReporteAsistenciaProfesores() {
    const [asistencias, setAsistencias] = React.useState([]);
    const [datos, setDatos] = React.useState([]);
    const [datosCsv, setDatosCsv] = React.useState([]);
    const [datosCsvAux, setDatosCsvAux] = React.useState([]);
    const [datosProfesor, setDatosProfesor] = React.useState([]);
    const [tableUpdate, setTableUpdate] = React.useState(false);
    const [tableFilter, setTableFilter] = React.useState(false);
    const [inputSearch, setInputSearch] = React.useState('');
    const [periodo, setPeriodo] = React.useState('');
    const [profesor, setProfesor] = React.useState('');
    const [fechaIni, setFechaIni] = React.useState(null);
    const [fechaFin, setFechaFin] = React.useState(null);
    const [listaPeriodos, setListaPeriodos] = React.useState([]);
    const [listaProfesores, setListaProfesores] = React.useState([]);
    const [value, setValue] = React.useState(null);
    const [inputValue, setInputValue] = React.useState('');

    // Formulario para la busqueda
    function validarFecha() {
        if ((fechaIni === null && fechaFin === null) || (fechaIni !== null && fechaFin !== null)) {
            return true;
        }
        return false;
    }
    function returnFecha(fecha) {
        let mes;
        let dia;
        if (fecha != null) {
            if (fecha.getMonth() < 9) {
                mes = `0${fecha.getMonth() + 1}`;
            } else {
                mes = `${fecha.getMonth() + 1}`;
            }
            if (fecha.getDate() < 10) {
                dia = `0${fecha.getDate()}`;
            } else {
                dia = `${fecha.getDate()}`;
            }
            return `${fecha.getFullYear()}-${mes}-${dia}`;
        }
        return '';
    }

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

    // Fin de formulario

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

    const fetchAsistencias = async () => {
        const asistenciasAux = await DataSourceReportesProfesores.getAsistenciaProfesor();
        setAsistencias(asistenciasAux.data);
        setDatos(asistenciasAux.data);
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
        fetchAsistencias();
        fetchPeriodos();
        fetchProfesores();
        setTableUpdate(false);
    }, [tableUpdate]);

    const buscarAsistencia = () => {
        let profesorAux = '';
        if (value !== null) {
            profesorAux = value.id;

            console.log('Esto es la validacion del id ', profesorAux);
        }
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
            id_profesor: `${profesorAux}`,
            id_periodo: `${periodo}`,
            fecha_ini: `${returnFecha(fechaIni)}`,
            fecha_fin: `${returnFecha(fechaFin)}`
        };

        console.log('Datos: ---------Busqueda-------', datosBusqueda);

        if (periodo !== '' && profesorAux === '' && fechaIni === null && fechaFin === null) {
            console.log('Periodo: ', periodo);
            const reporte = asistencias.filter((asistencia) => asistencia.grupo.id_periodo === periodo);
            setDatos(reporte);
        }
        if (periodo === '' && profesorAux !== '' && fechaIni === null && fechaFin === null) {
            console.log('Profesor: ', profesor);
            const reporte = asistencias.filter((asistencia) => asistencia.grupo.id_profesor === profesorAux);
            setDatos(reporte);
        }
        if (periodo !== '' && profesorAux !== '' && fechaIni === null && fechaFin === null) {
            console.log('Profesor y Periodo: ', profesor, periodo);
            const reporte = asistencias.filter(
                (asistencia) => asistencia.grupo.id_periodo === periodo && asistencia.grupo.id_profesor === profesorAux
            );
            setDatos(reporte);
        }

        if (periodo === '' && profesorAux === '' && fechaIni !== null && fechaFin !== null) {
            console.log('Fecha:', returnFecha(fechaIni), '-', returnFecha(fechaFin));
            console.log('Datos perrones:', datos);
            const reporte = asistencias.filter(
                (asistencia) => asistencia.fecha <= returnFecha(fechaFin) && asistencia.fecha >= returnFecha(fechaIni)
            );
            setDatos(reporte);
        }

        if (periodo === '' && profesorAux !== '' && fechaIni !== null && fechaFin !== null) {
            console.log('Fecha:', returnFecha(fechaIni), '-', returnFecha(fechaFin));
            console.log('Profesor: ', profesor);
            console.log('Datos perrones:', datos);
            const reporte = asistencias.filter(
                (asistencia) =>
                    asistencia.fecha <= returnFecha(fechaFin) &&
                    asistencia.fecha >= returnFecha(fechaIni) &&
                    asistencia.grupo.id_profesor === profesorAux
            );
            setDatos(reporte);
        }

        if (periodo !== '' && profesorAux !== '' && fechaIni !== null && fechaFin !== null) {
            console.log('Fecha:', returnFecha(fechaIni), '-', returnFecha(fechaFin));
            console.log('Profesor: ', profesor);
            console.log('Datos perrones:', datos);
            const reporte = asistencias.filter(
                (asistencia) =>
                    asistencia.grupo.id_periodo === periodo &&
                    asistencia.fecha <= returnFecha(fechaFin) &&
                    asistencia.fecha >= returnFecha(fechaIni) &&
                    asistencia.grupo.id_profesor === profesorAux
            );
            setDatos(reporte);
        }

        Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            title: '¡Busqueda realziada!',
            showConfirmButton: false,
            timer: 1500,
            toast: true
        });
    };

    const datosCsvButton = () => {
        const arrayAsistencia = [];

        function returnSi(estado) {
            if (estado !== true) {
                return 'Si';
            }
            return 'No';
        }

        for (let i = 0; i < datos.length; i += 1) {
            arrayAsistencia.push({
                Profesor: `${datos[i].grupo.profesor.nombre} ${datos[i].grupo.profesor.apellido_paterno} ${datos[i].grupo.profesor.apellido_materno}`,
                Materia: datos[i].grupo.materia.nombre,
                Aula: datos[i].grupo.aula,
                Fecha: datos[i].fecha,
                Hora: datos[i].hora,
                Observaciones: returnSi(datos[i].asistencia_estado),
                Descripción: datos[i].descripcion,
                Prefecto: `${datos[i].prefecto.nombre} ${datos[i].prefecto.apellido_paterno} ${datos[i].prefecto.apellido_materno}`
            });
        }

        console.log('Arreglo nuevo: ', arrayAsistencia);

        setDatosCsv(arrayAsistencia);
    };

    return (
        <section>
            <Grid item xs={12} sm={12} sx={{ px: 2, pb: 2 }}>
                <SubCard title="Realizar busqueda">
                    <FormControl sx={{ m: 1, minWidth: '20%', p: 1 }} size="small" required>
                        <InputLabel sx={{ p: 1 }}>Periodo de estudios</InputLabel>
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
                    <FormControl sx={{ m: 1, minWidth: '20%', p: 1 }} size="small" required>
                        <Autocomplete
                            ddisablePortal
                            id="combo-box-demo"
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                            inputValue={inputValue}
                            onInputChange={(event, newInputValue) => {
                                setInputValue(newInputValue);
                            }}
                            options={listaProfesores}
                            getOptionLabel={(option) => `${option.nombre} ${option.apellido_paterno} ${option.apellido_materno}`}
                            renderInput={(params) => <TextField {...params} label="Profesor" />}
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, p: 1 }} size="small">
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
                    <Button
                        variant="contained"
                        onClick={buscarAsistencia}
                        sx={{ m: 2, minWidth: '15%', p: 1.5 }}
                        size="normal"
                        startIcon={<SearchIcon />}
                    >
                        Buscar
                    </Button>
                </SubCard>
                <SubCard title="Reportes de asistencia de profesores">
                    <Grid container direction="column" spacing={1}>
                        <Tabla datos={datos} />
                    </Grid>
                </SubCard>
                <SubCard title="Reporte">
                    <CSVLink data={datosCsv}>
                        <Button variant="contained" onClick={datosCsvButton} size="small" startIcon={<SaveIcon />}>
                            Descargar CSV!
                        </Button>
                    </CSVLink>
                </SubCard>
            </Grid>
        </section>
    );
}

export default ReporteAsistenciaProfesores;
