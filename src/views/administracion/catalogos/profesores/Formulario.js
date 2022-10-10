import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import DataSourceProfesor from 'data/catalogos/profesor';
import Swal from 'sweetalert2';

export default function Formulario({ setTableUpdate }) {
    const [nombre, setNombre] = React.useState('');
    const [paterno, setPaterno] = React.useState('');
    const [materno, setMaterno] = React.useState('');
    const [noEmpleado, setNoEmpleado] = React.useState('');

    const handleChangeNombre = (event) => {
        setNombre(event.target.value);
    };

    const handleChangePaterno = (event) => {
        setPaterno(event.target.value);
    };

    const handleChangeMaterno = (event) => {
        setMaterno(event.target.value);
    };

    const handleChangeNoEmpleado = (event) => {
        setNoEmpleado(event.target.value);
    };

    function validarCampos() {
        let validar = false;
        if (nombre !== '' && paterno !== '' && materno !== '' && noEmpleado !== '') {
            validar = true;
        }
        return validar;
    }

    const guardarProfesor = () => {
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

        const nuevoProfesor = {
            nombre: `${nombre}`,
            apellido_paterno: `${paterno}`,
            apellido_materno: `${materno}`,
            no_trabajador: `${noEmpleado}`
        };
        DataSourceProfesor.postProfesor(nuevoProfesor);

        Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            title: '¡Profesor registrado!',
            showConfirmButton: false,
            timer: 1500,
            toast: true
        });

        setTableUpdate(true);
        setNombre('');
        setPaterno('');
        setMaterno('');
        setNoEmpleado('');
    };

    return (
        <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '23%' } }} noValidate autoComplete="off">
            <div>
                <TextField label="Nombre" id="outlined-size-small" size="small" value={nombre} onChange={handleChangeNombre} required />
                <TextField
                    label="Apellido paterno"
                    id="outlined-size-small"
                    value={paterno}
                    onChange={handleChangePaterno}
                    size="small"
                    required
                />
                <TextField
                    label="Apellido materno"
                    id="outlined-size-small"
                    value={materno}
                    onChange={handleChangeMaterno}
                    size="small"
                    required
                />
                <TextField label="Número de empleado" value={noEmpleado} onChange={handleChangeNoEmpleado} size="small" required />
                <Button variant="contained" onClick={guardarProfesor} sx={{ m: 1, minWidth: '23%' }} startIcon={<SaveIcon />}>
                    Guardar
                </Button>
            </div>
        </Box>
    );
}

Formulario.propTypes = {
    setTableUpdate: PropTypes.func.isRequired
};
