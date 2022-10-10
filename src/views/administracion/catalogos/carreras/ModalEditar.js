import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { FormHelperText } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import DataSourceCarrera from 'data/catalogos/carrera';
import Swal from 'sweetalert2';

export default function ModalEditar({ idCarrera, setTableUpdate }) {
    const [open, setOpen] = React.useState(false);
    const [nombre, setNombre] = React.useState('');
    const [planEstudios, setPlanEstudios] = React.useState('');
    const [update, setUpdate] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setNombre('');
        setPlanEstudios('');
    };

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

        const carreraEditada = {
            nombre: `${nombre}`,
            plan_estudios: `${planEstudios}`
        };

        DataSourceCarrera.putCarrera(idCarrera.id, carreraEditada);
        setTableUpdate(true);
        handleClose();
        Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            title: '¡Programa de estudios actualizado!',
            showConfirmButton: false,
            timer: 1500,
            toast: true
        });
    };

    useEffect(() => {
        setNombre(idCarrera.nombre);
        setPlanEstudios(idCarrera.plan_estudios);
        setUpdate(false);
    }, [update]);

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
                        value={idCarrera.id}
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
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Plan de estudios"
                        value={planEstudios}
                        onChange={handleChangePlanEstudios}
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
    idCarrera: PropTypes.number.isRequired,
    setTableUpdate: PropTypes.func.isRequired
};
