import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    FormHelperText,
    FormControl,
    TextField,
    Dialog,
    DialogContent,
    InputLabel,
    Select,
    Button,
    MenuItem,
    DialogActions,
    Radio,
    FormLabel,
    RadioGroup,
    FormControlLabel
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import DataSourceGrupos from 'data/catalogos/grupo';
import DataSourcePeriodo from 'data/catalogos/periodo';
import DataSourceCarreras from 'data/catalogos/carrera';
import DataSourceMateria from 'data/catalogos/materia';
import DataSourceProfesor from 'data/catalogos/profesor';
import DataSourceHorario from 'data/catalogos/horario';
import Swal from 'sweetalert2';
import SubCard from 'ui-component/cards/SubCard';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import dayjs from 'dayjs';
import moment from 'moment';

export default function ModalEditar({ idGrupo, setTableUpdate }) {
    const [open, setOpen] = React.useState(false);
    const [profesor, setProfesor] = React.useState('');
    const [materia, setMateria] = React.useState('');
    const [periodo, setPeriodo] = React.useState('');
    const [aula, setAula] = React.useState('');
    const [estado, setEstado] = React.useState('');
    const [carrera, setCarrera] = React.useState('');
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
    let lunesCheck = React.useState(false);
    let martesCheck = React.useState(false);
    let miercolesCheck = React.useState(false);
    let juevesCheck = React.useState(false);
    let viernesCheck = React.useState(false);
    let sabadoCheck = React.useState(false);
    let horarioCheck = React.useState('');
    const [valueAux, setValueAux] = React.useState(null);
    const [inputValue, setInputValue] = React.useState('');

    const [listaProfesores, setListaProfesores] = React.useState([]);
    const [listaMaterias, setListaMaterias] = React.useState([]);
    const [listaPeriodos, setListaPeriodos] = React.useState([]);
    const [listaCarreras, setListaCarreras] = React.useState([]);

    const [update, setUpdate] = React.useState(false);

    const [horarioGet, setHorarioGet] = useState([]);

    const ITEM_HEIGHT = 38;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250
            }
        }
    };

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
        console.log('hora pasada:', hora);

        if (hora != null) {
            if (hora >= '00:00:00') {
                console.log('Estoy aqui en hora', hora);
                return hora;
            }
            return `${hora.getHours()}:${hora.getMinutes()}:${hora.getSeconds()}`;
        }
        return '';
    }

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

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setPeriodo('');
        setCarrera('');
        setMateria('');
        setProfesor('');
        setEstado('');
        setAula('');
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
        lunesCheck = false;
        martesCheck = false;
        miercolesCheck = false;
        juevesCheck = false;
        viernesCheck = false;
        sabadoCheck = false;
        horarioCheck = false;
        setHorarioGet([]);
        setUpdate(true);
    };

    const handleChangePeriodo = (event) => {
        setPeriodo(event.target.value);
    };

    const handleChangeCarrera = (event) => {
        setCarrera(event.target.value);
    };

    const handleChangeMateria = (event) => {
        setMateria(event.target.value);
    };

    const handleChangeProfesor = (event) => {
        setProfesor(event.target.value);
    };

    const handleChangeEstado = (event) => {
        setEstado(event.target.value);
    };

    const handleChangeAula = (event) => {
        setAula(event.target.value);
    };

    function validarCampos() {
        if (periodo !== '' && carrera !== '' && materia !== '' && profesor !== '' && estado !== '') {
            return true;
        }
        return false;
    }

    function activoCheck() {
        if (estado === 'true') {
            return true;
        }
        return false;
    }

    const handleUpdate = () => {
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
                toast: true,
                target: document.getElementById('form-modal')
            });
            return;
        }

        const grupoEditado = {
            id_profesor: `${profesor}`,
            id_materia: `${materia}`,
            id_periodo: `${periodo}`,
            aula: `${aula}`,
            grupo_estado: activoCheck(),

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

        console.log('Datos para actualziar el grupo y horario: ', grupoEditado, '<<<<<<<<--');

        DataSourceGrupos.putGrupoHorario(idGrupo.id, grupoEditado);
        setTableUpdate(true);

        handleClose();

        Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            title: '¡Grupo actualizado!',
            showConfirmButton: false,
            timer: 1500,
            toast: true
        });
    };

    const horarioSet = async (id) => {
        const horarioAux = await DataSourceHorario.getHorarioData(id);
        setHorarioGet(horarioAux.data);
    };

    function retornaDHora(inicio, fin) {
        if (inicio === '00:00:00' && fin === '00:00:00') {
            return '(Sin horario)';
        }
        return `(${inicio} - ${fin})`;
    }

    useEffect(() => {
        fetchPeriodos();
        fetchMaterias(idGrupo.materia.id_carrera);
        fetchProfesores();
        fetchCarreras();
        horarioSet(idGrupo.id);

        setPeriodo(idGrupo.id_periodo);
        setCarrera(idGrupo.materia.id_carrera);
        setMateria(idGrupo.id_materia);
        setProfesor(idGrupo.id_profesor);
        setAula(idGrupo.aula);
        setEstado(idGrupo.grupo_estado);

        setLunesIni(idGrupo.horario[0].lunes);
        setLunesFin(idGrupo.horario[0].lunes_fin);
        setMartesIni(idGrupo.horario[0].martes);
        setMartesFin(idGrupo.horario[0].martes_fin);
        setMiercolesIni(idGrupo.horario[0].miercoles);
        setMiercolesFin(idGrupo.horario[0].miercoles_fin);
        setJuevesIni(idGrupo.horario[0].jueves);
        setJuevesFin(idGrupo.horario[0].jueves_fin);
        setViernesIni(idGrupo.horario[0].viernes);
        setViernesFin(idGrupo.horario[0].viernes_fin);
        setSabadoIni(idGrupo.horario[0].sabado);
        setSabadoFin(idGrupo.horario[0].sabado_fin);

        setUpdate(false);
    }, [update]);

    return (
        <div>
            <EditIcon onClick={handleClickOpen} />
            <Dialog id="form-modal" open={open} onClose={handleClose}>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="ID"
                        label="ID"
                        value={idGrupo.id}
                        type="text"
                        sx={{ mt: 2, py: 1, pr: 2 }}
                        size="small"
                        disabled
                    />
                    <FormControl sx={{ mt: 2, py: 1 }} size="small" required>
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
                    <FormControl sx={{ mt: 2, py: 1 }} size="small" fullWidth required>
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
                    <FormControl sx={{ mt: 2, py: 1 }} size="small" fullWidth required>
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
                    <FormControl sx={{ mt: 2, py: 1 }} size="small" fullWidth required>
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
                    <TextField
                        id="outlined-size-small"
                        size="small"
                        margin="dense"
                        label="Aula"
                        value={aula}
                        onChange={handleChangeAula}
                        sx={{ pr: 2 }}
                        required
                    />
                    <FormControl size="small" required>
                        Estado
                        <RadioGroup row value={estado} onChange={handleChangeEstado}>
                            <FormControlLabel value="true" control={<Radio />} label="Activo" />
                            <FormControlLabel value="false" control={<Radio />} label="Inactivo" />
                        </RadioGroup>
                    </FormControl>

                    <SubCard title="Horario" fullWidth>
                        <FormControl size="small">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <FormLabel sx={{ color: 'text.primary', fontSize: 15, fontWeight: 'medium' }}>
                                    Lunes {retornaDHora(horarioGet.lunes, horarioGet.lunes_fin)}
                                </FormLabel>
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
                        <FormControl size="small">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <FormLabel sx={{ color: 'text.primary', fontSize: 15, fontWeight: 'medium' }}>
                                    Martes {retornaDHora(horarioGet.martes, horarioGet.martes_fin)}
                                </FormLabel>
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
                        <FormControl size="small">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <FormLabel sx={{ color: 'text.primary', fontSize: 15, fontWeight: 'medium' }}>
                                    Miercoles {retornaDHora(horarioGet.miercoles, horarioGet.miercoles_fin)}
                                </FormLabel>
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
                        <FormControl size="small">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <FormLabel sx={{ color: 'text.primary', fontSize: 15, fontWeight: 'medium' }}>
                                    Jueves {retornaDHora(horarioGet.jueves, horarioGet.jueves_fin)}
                                </FormLabel>
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
                        <FormControl size="small">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <FormLabel sx={{ color: 'text.primary', fontSize: 15, fontWeight: 'medium' }}>
                                    Viernes {retornaDHora(horarioGet.viernes, horarioGet.viernes_fin)}
                                </FormLabel>
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
                        <FormControl size="small">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <FormLabel sx={{ color: 'text.primary', fontSize: 15, fontWeight: 'medium' }}>
                                    Sabado {retornaDHora(horarioGet.sabado, horarioGet.sabado_fin)}
                                </FormLabel>
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
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="error"
                        sx={{ m: 1, minWidth: '20%' }}
                        onClick={handleClose}
                        startIcon={<CancelIcon />}
                    >
                        Cancelar
                    </Button>
                    <Button variant="contained" sx={{ m: 1, minWidth: '20%' }} onClick={handleUpdate} startIcon={<SaveIcon />}>
                        Guardar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

ModalEditar.propTypes = {
    idGrupo: PropTypes.number.isRequired,
    setTableUpdate: PropTypes.func.isRequired
};
