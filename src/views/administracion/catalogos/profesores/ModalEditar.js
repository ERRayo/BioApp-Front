import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import DataSourceProfesor from 'data/catalogos/profesor';
import Swal from 'sweetalert2';

export default function ModalEditar({ idProfesor, setTableUpdate }) {
    const [open, setOpen] = React.useState(false);
    const [nombre, setNombre] = React.useState('');
    const [paterno, setPaterno] = React.useState('');
    const [materno, setMaterno] = React.useState('');
    const [numeroEmpleado, setNumeroEmpleado] = React.useState('');
    const [update, setUpdate] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setNombre('');
        setPaterno('');
        setMaterno('');
        setNumeroEmpleado('');
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

    const handleChangeNumeroEmpleado = (event) => {
        setNumeroEmpleado(event.target.value);
    };

    function validarCampos() {
        if (nombre !== '' && paterno !== '' && materno !== '' && numeroEmpleado !== '') {
            return true;
        }
        return false;
    }

    useEffect(() => {
        setNombre(idProfesor.nombre);
        setPaterno(idProfesor.apellido_paterno);
        setMaterno(idProfesor.apellido_materno);
        setNumeroEmpleado(idProfesor.no_trabajador);
        setUpdate(false);
    }, [update]);

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
        const profesorEditado = {
            nombre: `${nombre}`,
            apellido_paterno: `${paterno}`,
            apellido_materno: `${materno}`,
            no_trabajador: `${numeroEmpleado}`
        };

        DataSourceProfesor.putProfesor(idProfesor.id, profesorEditado);
        setTableUpdate(true);
        handleClose();
        Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            title: 'Profesor actualizado!',
            showConfirmButton: false,
            timer: 1500,
            toast: true
        });
    };

    return (
        <div>
            <EditIcon onClick={handleClickOpen} />
            <Dialog id="form-modal" sx={{ display: 'block' }} open={open} onClose={handleClose}>
                <DialogContent sx={{ maxWidth: 450, display: 'block' }}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="ID"
                        label="ID"
                        value={idProfesor.id}
                        type="text"
                        size="small"
                        fullWidth
                        disabled
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nombre"
                        value={nombre}
                        onChange={handleChangeNombre}
                        type="text"
                        size="small"
                        fullWidth
                        required
                    />
                    <TextField
                        margin="dense"
                        label="Apellido paterno"
                        value={paterno}
                        onChange={handleChangePaterno}
                        type="text"
                        size="small"
                        fullWidth
                        required
                    />
                    <TextField
                        margin="dense"
                        label="Apellido materno"
                        value={materno}
                        onChange={handleChangeMaterno}
                        type="text"
                        size="small"
                        fullWidth
                        required
                    />
                    <TextField
                        margin="dense"
                        label="Número de empleado"
                        value={numeroEmpleado}
                        onChange={handleChangeNumeroEmpleado}
                        type="text"
                        size="small"
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
    idProfesor: PropTypes.number.isRequired,
    setTableUpdate: PropTypes.func.isRequired
};
