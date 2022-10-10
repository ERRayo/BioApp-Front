import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import DataSourceCarrera from 'data/catalogos/carrera';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

export default function Formulario({ setTableUpdate }) {
    const [nombre, setNombre] = React.useState('');
    const [planEstudios, setPlanEstudios] = React.useState('');

    const handleChangeNombre = (event) => {
        setNombre(event.target.value);
    };

    const handleChangePlanEstudios = (event) => {
        setPlanEstudios(event.target.value);
    };

    function validarCampos() {
        if (nombre !== '' && planEstudios !== '') {
            return true;
        }
        return false;
    }

    const guardarCarrera = (e) => {
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
        const nuevaCarrera = {
            nombre: `${nombre}`,
            plan_estudios: `${planEstudios}`
        };
        DataSourceCarrera.postCarrera(nuevaCarrera);
        Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            title: '¡Plan de estudios registrado!',
            showConfirmButton: false,
            timer: 1500,
            toast: true
        });
        setTableUpdate(true);
        setNombre('');
        setPlanEstudios('');
    };

    return (
        <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '31%' } }} noValidate autoComplete="off">
            <div>
                <TextField label="Nombre" id="outlined-size-small" size="small" value={nombre} onChange={handleChangeNombre} required />
                <TextField
                    label="Plan de estudios"
                    id="outlined-size-small"
                    size="small"
                    value={planEstudios}
                    onChange={handleChangePlanEstudios}
                    required
                />
                <Button variant="contained" onClick={guardarCarrera} sx={{ m: 1, minWidth: '31%' }} startIcon={<SaveIcon />}>
                    Guardar
                </Button>
            </div>
        </Box>
    );
}

Formulario.propTypes = {
    setTableUpdate: PropTypes.func.isRequired
};
