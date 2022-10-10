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
import DataSourcePrecto from 'data/catalogos/prefecto';
import Swal from 'sweetalert2';

export default function ModalEditar({ idGrupo, setTableUpdate }) {
    const [open, setOpen] = React.useState(false);
    const [periodo, setPeriodo] = React.useState('');
    const [carrera, setCarrera] = React.useState('');
    const [materia, setMateria] = React.useState('');
    const [profesor, setProfesor] = React.useState('');
    const [estado, setEstado] = React.useState('');
    const [listaPeriodos, setListaPeriodos] = React.useState([]);
    const [listaMaterias, setListaMaterias] = React.useState([]);
    const [listaProfesores, setListaProfesores] = React.useState([]);
    const [listaCarreras, setListaCarreras] = React.useState([]);
    const [nombre, setNombre] = React.useState('');
    const [idUsuario, setIdUsuario] = React.useState('');
    const [paterno, setPaterno] = React.useState('');
    const [materno, setMaterno] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [update, setUpdate] = React.useState(false);

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

    const handleChangeNombre = (event) => {
        setNombre(event.target.value);
    };

    const handleChangePaterno = (event) => {
        setPaterno(event.target.value);
    };

    const handleChangeMaterno = (event) => {
        setMaterno(event.target.value);
    };

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    };

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
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

        console.log('datos prefecto', idGrupo);
        setNombre(idGrupo.nombre);
        setPaterno(idGrupo.apellido_paterno);
        setMaterno(idGrupo.apellido_materno);
        setIdUsuario(idGrupo.id_usuario);
        setEmail(idGrupo.usuario.email);

        setUpdate(false);
    }, [update]);

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
    };

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

    const handleChangeEstado = (event) => {
        setEstado(event.target.value);
    };

    function validarCampos() {
        if (nombre !== '' && paterno !== '' && materno !== '' && email !== '' && password !== '') {
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

        const prefecto = {
            id_usuario: `${idUsuario}`,
            nombre: `${nombre}`,
            apellido_paterno: `${paterno}`,
            apellido_materno: `${materno}`,
            email: `${email}`,
            contraseña: `${password}`
        };

        console.log('Datos prefecto: ', prefecto);
        DataSourcePrecto.putPrefecto(idGrupo.id, prefecto);
        setTableUpdate(true);
        handleClose();
        Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            title: '¡Prefecto actualizado!',
            showConfirmButton: false,
            timer: 1500,
            toast: true
        });
    };

    return (
        <div>
            <EditIcon onClick={handleClickOpen} />
            <Dialog id="form-modal" sx={{ display: 'block' }} open={open} onClose={handleClose}>
                <DialogContent sx={{ maxWidth: 400, display: 'block' }}>
                    <TextField autoFocus margin="dense" id="ID" label="ID" value={idGrupo.id} type="text" size="small" fullWidth disabled />
                    <TextField
                        label="Nombre"
                        id="outlined-size-small"
                        size="small"
                        value={nombre}
                        onChange={handleChangeNombre}
                        sx={{ mt: 2, py: 1 }}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Apellido paterno"
                        id="outlined-size-small"
                        value={paterno}
                        onChange={handleChangePaterno}
                        size="small"
                        sx={{ mt: 2, py: 1 }}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Apellido materno"
                        id="outlined-size-small"
                        value={materno}
                        onChange={handleChangeMaterno}
                        size="small"
                        sx={{ mt: 2, py: 1 }}
                        fullWidth
                        required
                    />
                    <TextField
                        label="eMail"
                        type="email"
                        id="outlined-size-small"
                        value={email}
                        onChange={handleChangeEmail}
                        size="small"
                        sx={{ mt: 2, py: 1 }}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Contraseña"
                        type="password"
                        id="outlined-size-small"
                        value={password}
                        onChange={handleChangePassword}
                        size="small"
                        sx={{ mt: 2, py: 1 }}
                        fullWidth
                        required
                    />
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
