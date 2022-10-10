import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { FormHelperText, Box } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import DataSourcePeriodo from 'data/catalogos/periodo';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import format from 'date-fns/format';
import Swal from 'sweetalert2';

export default function ModalEditar({ idPeriodo, setTableUpdate }) {
    const [open, setOpen] = React.useState(false);
    const [inicio, setInicio] = React.useState('');
    const [fin, setFin] = React.useState('');
    const [update, setUpdate] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setInicio('');
        setFin('');
        setUpdate(true);
    };

    const handleChangeInicio = (event) => {
        setInicio(event.target.value);
    };

    const handleChangeFin = (event) => {
        setFin(event.target.value);
    };

    function validarCampos() {
        if (inicio !== '' && fin !== '') {
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

        const ini = format(inicio, 'yyyy-MM-dd');
        const fi = format(fin, 'yyyy-MM-dd');

        const periodoEditado = {
            fecha_ini: `${ini}`,
            fecha_fin: `${fi}`
        };

        DataSourcePeriodo.putPeriodo(idPeriodo.id, periodoEditado);
        setTableUpdate(true);
        handleClose();
        Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            title: '¡Periodo de estudios actualizado!',
            showConfirmButton: false,
            timer: 1500,
            toast: true
        });
    };

    useEffect(() => {
        setInicio(idPeriodo.fecha_ini);
        setFin(idPeriodo.fecha_fin);

        setUpdate(false);
    }, [update]);

    return (
        <div>
            <EditIcon onClick={handleClickOpen} />
            <Dialog id="form-modal" sx={{ display: 'block', m: 4 }} open={open} onClose={handleClose}>
                <DialogContent sx={{ maxWidth: 800, display: 'block' }}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="ID"
                        label="ID"
                        value={idPeriodo.id}
                        type="text"
                        size="small"
                        fullWidth
                        disabled
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Box sx={{ my: 2 }}>
                            <DatePicker
                                label="Inicio de curso"
                                value={inicio}
                                showToolbar
                                fullWidth
                                onChange={(newValue) => {
                                    setInicio(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                                required
                            />
                        </Box>
                        <Box>
                            <DatePicker
                                label="Fin de curso"
                                value={fin}
                                fullWidth
                                showToolbar
                                onChange={(newValue) => {
                                    setFin(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                                required
                            />
                        </Box>
                    </LocalizationProvider>
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
    idPeriodo: PropTypes.number.isRequired,
    setTableUpdate: PropTypes.func.isRequired
};
