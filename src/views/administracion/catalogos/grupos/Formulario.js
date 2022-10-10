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
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

export default function Formulario({ setTableUpdate }) {
    const [periodo, setPeriodo] = React.useState('');
    const [materia, setMateria] = React.useState('');
    const [carrera, setCarrera] = React.useState('');
    const [profesor, setProfesor] = React.useState('');
    const [aula, setAula] = React.useState('');
    const [listaPeriodos, setListaPeriodos] = React.useState([]);
    const [listaMaterias, setListaMaterias] = React.useState([]);
    const [listaProfesores, setListaProfesores] = React.useState([]);
    const [listaCarreras, setListaCarreras] = React.useState([]);
    const [lunesIni, setLunesIni] = React.useState(null);
    const [lunesFin, setLunesFin] = React.useState(null);
    const [martesIni, setMartesIni] = React.useState(null);
    const [martesFin, setMartesFin] = React.useState(null);
    const [miercolesIni, setMiercolesIni] = React.useState(null);
    const [miercolesFin, setMiercolesFin] = React.useState(null);
    const [juevesIni, setJuevesIni] = React.useState(null);
    const [juevesFin, setJuevesFin] = React.useState(null);
    const [viernesIni, setViernesIni] = React.useState(null);
    const [viernesFin, setViernesFin] = React.useState(null);
    const [sabadoIni, setSabadoIni] = React.useState(null);
    const [sabadoFin, setSabadoFin] = React.useState(null);
    const [datosGrupo, setDatosGrupo] = React.useState();
    const [valueAux, setValueAux] = React.useState(null);
    const [inputValue, setInputValue] = React.useState('');
    let lunesCheck = React.useState(false);
    let martesCheck = React.useState(false);
    let miercolesCheck = React.useState(false);
    let juevesCheck = React.useState(false);
    let viernesCheck = React.useState(false);
    let sabadoCheck = React.useState(false);
    let horarioCheck = React.useState('');

    function validarHorario() {
        console.log('>>>>><<<>>>>>>------------Antes---------------><><');
        console.log('Lunes check', lunesCheck);
        console.log('Martes check', martesCheck);
        console.log('Miercoles check', miercolesCheck);
        console.log('Jueves check', juevesCheck);
        console.log('Viernes check', viernesCheck);
        console.log('Sabado check', sabadoCheck);
        console.log('Horario check', horarioCheck);
        console.log('>>>>><<<>>>>>>---------------------------><><');

        if ((lunesIni === null && lunesFin === null) || (lunesIni !== null && lunesFin !== null)) {
            lunesCheck = true;
        }
        if ((martesIni === null && martesFin === null) || (martesIni !== null && martesFin !== null)) {
            martesCheck = true;
        }
        if ((miercolesIni === null && miercolesFin === null) || (miercolesIni !== null && miercolesFin !== null)) {
            miercolesCheck = true;
        }
        if ((juevesIni === null && juevesFin === null) || (juevesIni !== null && juevesFin !== null)) {
            juevesCheck = true;
        }
        if ((viernesIni === null && viernesFin === null) || (viernesIni !== null && viernesFin !== null)) {
            viernesCheck = true;
        }
        if ((sabadoIni === null && sabadoFin === null) || (sabadoIni !== null && sabadoFin !== null)) {
            sabadoCheck = true;
        }
        if (
            lunesIni === null &&
            lunesFin === null &&
            martesIni === null &&
            martesFin === null &&
            miercolesIni === null &&
            miercolesFin === null &&
            juevesIni === null &&
            juevesFin === null &&
            viernesIni === null &&
            viernesFin === null &&
            sabadoIni === null &&
            sabadoFin === null
        ) {
            horarioCheck = 'Sin horario';
        } else {
            horarioCheck = 'Con horario';
        }

        console.log('>>>>><<<>>>>>>-----------Despues----------------><><');
        console.log('Lunes check', lunesCheck);
        console.log('Martes check', martesCheck);
        console.log('Miercoles check', miercolesCheck);
        console.log('Jueves check', juevesCheck);
        console.log('Viernes check', viernesCheck);
        console.log('Sabado check', sabadoCheck);
        console.log('Horario check', horarioCheck);
        console.log('>>>>><<<>>>>>>---------------------------><><');
    }

    function validarCampos() {
        let profesorAux = '';
        if (valueAux !== null) {
            profesorAux = valueAux.id;

            console.log('Esto es la validacion del id ', profesorAux);
        }
        if (periodo !== '' && carrera !== '' && materia !== '' && profesorAux !== '') {
            return true;
        }
        return false;
    }
    function validarCamposAux() {
        console.log('>>>>><<<>>>>>>-----------Validar Aux para guardar----------------><><');
        console.log('Lunes check', lunesCheck);
        console.log('Martes check', martesCheck);
        console.log('Miercoles check', miercolesCheck);
        console.log('Jueves check', juevesCheck);
        console.log('Viernes check', viernesCheck);
        console.log('Sabado check', sabadoCheck);
        console.log('Horario check', horarioCheck);
        console.log('>>>>><<<>>>>>>---------------------------><><');
        if (
            lunesCheck === true &&
            martesCheck === true &&
            miercolesCheck === true &&
            juevesCheck === true &&
            viernesCheck === true &&
            sabadoCheck === true &&
            horarioCheck === 'Con horario'
        ) {
            return true;
        }
        return false;
    }

    function returnHora(hora) {
        if (hora != null) {
            return `${hora.getHours()}:${hora.getMinutes()}:${hora.getSeconds()}`;
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

    const fetchMaterias = async (id) => {
        const lista = await DataSourceMateria.getMateriasByCarreraData(id);
        setListaMaterias(lista.data);
    };

    const fetchProfesores = async () => {
        const lista = await DataSourceProfesor.getProfesoresData();
        setListaProfesores(lista.data);
    };

    const fetchCarreras = async () => {
        const lista = await DataSourceCarreras.getCarrerasData();
        setListaCarreras(lista.data);
    };

    useEffect(() => {
        fetchPeriodos();
        fetchMaterias();
        fetchProfesores();
        fetchCarreras();
    }, []);

    const handleChangePeriodo = (event) => {
        setPeriodo(event.target.value);
    };

    const handleChangeCarrera = (event) => {
        setMateria('');
        setCarrera(event.target.value);
        fetchMaterias(event.target.value);
    };

    const handleChangeMateria = (event) => {
        setMateria(event.target.value);
    };

    const handleChangeProfesor = (event) => {
        setProfesor(event.target.value);
    };

    const handleChangeAula = (event) => {
        setAula(event.target.value);
    };

    // Horario
    const handleChangeLunesIni = (value) => {
        setLunesIni(value);
    };
    const handleChangeLunesFin = (value) => {
        setLunesFin(value);
    };

    const handleChangeMartesIni = (value) => {
        setMartesIni(value);
    };
    const handleChangeMartesFin = (value) => {
        setMartesFin(value);
    };

    const handleChangeMiercolesIni = (value) => {
        setMiercolesIni(value);
    };
    const handleChangeMiercolesFin = (value) => {
        setMiercolesFin(value);
    };

    const handleChangeJuevesIni = (value) => {
        setJuevesIni(value);
    };
    const handleChangeJuevesFin = (value) => {
        setJuevesFin(value);
    };

    const handleChangeViernesIni = (value) => {
        setViernesIni(value);
    };
    const handleChangeViernesFin = (value) => {
        setViernesFin(value);
    };

    const handleChangeSabadoIni = (value) => {
        setSabadoIni(value);
    };
    const handleChangeSabadoFin = (value) => {
        setSabadoFin(value);
    };

    const guardarGrupo = (e) => {
        validarHorario();
        let profesorAux = '';
        if (valueAux !== null) {
            profesorAux = valueAux.id;

            console.log('Esto es la validacion del id ', profesorAux);
        }
        if (validarCampos() === false) {
            Swal.fire({
                position: 'bottom-end',
                icon: 'warning',
                title: '¡Verifique los campos!',
                showConfirmButton: false,
                timer: 1500,
                toast: true
            });
            return;
        }
        if (validarCamposAux() === false) {
            Swal.fire({
                position: 'bottom-end',
                icon: 'warning',
                title: '¡Verifique el horario!',
                showConfirmButton: false,
                timer: 1500,
                toast: true
            });
            return;
        }

        const nuevoGrupo = {
            id_profesor: `${profesorAux}`,
            id_materia: `${materia}`,
            id_periodo: `${periodo}`,
            aula: `${aula}`,
            grupo_estado: true,

            lunes: `${returnHora(lunesIni)}`,
            lunes_fin: `${returnHora(lunesFin)}`,
            martes: `${returnHora(martesIni)}`,
            martes_fin: `${returnHora(martesFin)}`,
            miercoles: `${returnHora(miercolesIni)}`,
            miercoles_fin: `${returnHora(miercolesFin)}`,
            jueves: `${returnHora(juevesIni)}`,
            jueves_fin: `${returnHora(juevesFin)}`,
            viernes: `${returnHora(viernesIni)}`,
            viernes_fin: `${returnHora(viernesFin)}`,
            sabado: `${returnHora(sabadoIni)}`,
            sabado_fin: `${returnHora(sabadoFin)}`
        };

        console.log('---------------AQUI', nuevoGrupo);
        console.log(lunesFin);

        DataSourceGrupos.postGrupoHorario(nuevoGrupo);

        Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            title: '¡Grupo registrado!',
            showConfirmButton: false,
            timer: 1500,
            toast: true
        });

        profesorAux = '';
        setValueAux(null);
        setPeriodo('');
        setCarrera('');
        setMateria('');
        setProfesor('');
        setAula('');
        setTableUpdate(true);
        setLunesIni(null);
        setLunesFin(null);
        setMartesIni(null);
        setMartesFin(null);
        setMiercolesIni(null);
        setMiercolesFin(null);
        setJuevesIni(null);
        setJuevesFin(null);
        setViernesIni(null);
        setViernesFin(null);
        setSabadoIni(null);
        setSabadoFin(null);
        setDatosGrupo();
        lunesCheck = false;
        martesCheck = false;
        miercolesCheck = false;
        juevesCheck = false;
        viernesCheck = false;
        sabadoCheck = false;
        horarioCheck = false;
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
                    <InputLabel>Programa de estudios</InputLabel>
                    <Select onChange={handleChangeCarrera} value={carrera} MenuProps={MenuProps}>
                        {listaCarreras.map((programa) => {
                            try {
                                return (
                                    <MenuItem key={programa.id} value={programa.id}>
                                        {programa.nombre}
                                    </MenuItem>
                                );
                            } catch (e) {
                                return 'Error';
                            }
                        })}
                        ;
                    </Select>
                </FormControl>
                <FormControl id="carrera" sx={{ m: 1, minWidth: '31%', p: 1 }} size="small" required>
                    <InputLabel>Materia</InputLabel>
                    <Select onChange={handleChangeMateria} value={materia} MenuProps={MenuProps}>
                        {listaMaterias.map((materia) => {
                            try {
                                return (
                                    <MenuItem key={materia.id} value={materia.id}>
                                        {materia.nombre}
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
                    <Autocomplete
                        ddisablePortal
                        id="combo-box-demo"
                        value={valueAux}
                        onChange={(event, newValue) => {
                            setValueAux(newValue);
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
                <FormControl sx={{ m: 1, minWidth: '31%', p: 1 }} size="small" required>
                    <InputLabel>Aula</InputLabel>
                    <TextField id="outlined-size-small" size="small" value={aula} onChange={handleChangeAula} required />
                </FormControl>
            </div>
            <div>
                <SubCard title="Horario">
                    <FormControl sx={{ p: 1 }} size="small" required>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <FormLabel sx={{ p: 1 }}>Lunes</FormLabel>
                            <TimePicker
                                label="Inico"
                                value={lunesIni}
                                onChange={handleChangeLunesIni}
                                renderInput={(params) => <TextField {...params} />}
                            />
                            <TimePicker
                                label="Fin"
                                value={lunesFin}
                                onChange={handleChangeLunesFin}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </FormControl>
                    <FormControl sx={{ p: 1 }} size="small" required>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <FormLabel sx={{ p: 1 }}>Martes</FormLabel>
                            <TimePicker
                                label="Inico"
                                value={martesIni}
                                onChange={handleChangeMartesIni}
                                renderInput={(params) => <TextField {...params} />}
                            />
                            <TimePicker
                                label="Fin"
                                value={martesFin}
                                onChange={handleChangeMartesFin}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </FormControl>
                    <FormControl sx={{ p: 1 }} size="small" required>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <FormLabel sx={{ p: 1 }}>Miercoles</FormLabel>
                            <TimePicker
                                label="Inico"
                                value={miercolesIni}
                                onChange={handleChangeMiercolesIni}
                                renderInput={(params) => <TextField {...params} />}
                            />
                            <TimePicker
                                label="Fin"
                                value={miercolesFin}
                                onChange={handleChangeMiercolesFin}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </FormControl>
                    <FormControl sx={{ p: 1 }} size="small" required>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <FormLabel sx={{ p: 1 }}>Jueves</FormLabel>
                            <TimePicker
                                label="Inico"
                                value={juevesIni}
                                onChange={handleChangeJuevesIni}
                                renderInput={(params) => <TextField {...params} />}
                            />
                            <TimePicker
                                label="Fin"
                                value={juevesFin}
                                onChange={handleChangeJuevesFin}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </FormControl>
                    <FormControl sx={{ p: 1 }} size="small" required>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <FormLabel sx={{ p: 1 }}>Viernes</FormLabel>
                            <TimePicker
                                label="Inico"
                                value={viernesIni}
                                onChange={handleChangeViernesIni}
                                renderInput={(params) => <TextField {...params} />}
                            />
                            <TimePicker
                                label="Fin"
                                value={viernesFin}
                                onChange={handleChangeViernesFin}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </FormControl>
                    <FormControl sx={{ p: 1 }} size="small" required>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <FormLabel sx={{ p: 1 }}>Sabado</FormLabel>
                            <TimePicker
                                label="Inico"
                                value={sabadoIni}
                                onChange={handleChangeSabadoIni}
                                renderInput={(params) => <TextField {...params} />}
                            />
                            <TimePicker
                                label="Fin"
                                value={sabadoFin}
                                onChange={handleChangeSabadoFin}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </FormControl>
                </SubCard>
            </div>
            <Button variant="contained" onClick={guardarGrupo} sx={{ m: 2, minWidth: '29%' }} startIcon={<SaveIcon />}>
                Guardar
            </Button>
        </Box>
    );
}

Formulario.propTypes = {
    setTableUpdate: PropTypes.func.isRequired
};
