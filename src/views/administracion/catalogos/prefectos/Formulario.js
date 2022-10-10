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
import DataSourcePrecto from 'data/catalogos/prefecto';
import Swal from 'sweetalert2';
import SubCard from 'ui-component/cards/SubCard';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

export default function Formulario({ setTableUpdate }) {
    const [nombre, setNombre] = React.useState('');
    const [paterno, setPaterno] = React.useState('');
    const [materno, setMaterno] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function validarCampos() {
        if (nombre !== '' && paterno !== '' && materno !== '' && email !== '' && password !== '') {
            return true;
        }
        return false;
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

    const guardarProfesor = (e) => {
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
        const nuevoPrefecto = {
            nombre: `${nombre}`,
            apellido_paterno: `${paterno}`,
            apellido_materno: `${materno}`,
            email: `${email}`,
            contraseña: `${password}`,
            tipo_usuario: `Prefecto`
        };

        DataSourcePrecto.postPrefectoUser(nuevoPrefecto);
        Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            title: '¡Prefecto registrado!',
            showConfirmButton: false,
            timer: 1500,
            toast: true
        });

        setNombre('');
        setPaterno('');
        setMaterno('');
        setEmail('');
        setPassword('');
        setTableUpdate(true);
    };

    return (
        <Box component="form" noValidate autoComplete="off">
            <div>
                <TextField
                    sx={{ m: 1, minWidth: '31%', p: 1 }}
                    label="Nombre"
                    id="outlined-size-small"
                    size="small"
                    value={nombre}
                    onChange={handleChangeNombre}
                    required
                />
                <TextField
                    sx={{ m: 1, minWidth: '31%', p: 1 }}
                    label="Apellido paterno"
                    id="outlined-size-small"
                    value={paterno}
                    onChange={handleChangePaterno}
                    size="small"
                    required
                />
                <TextField
                    sx={{ m: 1, minWidth: '31%', p: 1 }}
                    label="Apellido materno"
                    id="outlined-size-small"
                    value={materno}
                    onChange={handleChangeMaterno}
                    size="small"
                    required
                />
                <TextField
                    sx={{ m: 1, minWidth: '31%', p: 1 }}
                    label="eMail"
                    type="email"
                    id="outlined-size-small"
                    value={email}
                    onChange={handleChangeEmail}
                    size="small"
                    required
                />
                <TextField
                    sx={{ m: 1, minWidth: '31%', p: 1 }}
                    label="Contraseña"
                    type="password"
                    id="outlined-size-small"
                    value={password}
                    onChange={handleChangePassword}
                    size="small"
                    required
                />
                <Button variant="contained" onClick={guardarProfesor} sx={{ m: 2, minWidth: '29%' }} startIcon={<SaveIcon />}>
                    Guardar
                </Button>
            </div>
        </Box>
    );
}

Formulario.propTypes = {
    setTableUpdate: PropTypes.func.isRequired
};
