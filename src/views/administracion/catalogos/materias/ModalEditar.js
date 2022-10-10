import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { FormHelperText, FormControlLabel } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import { SettingsPowerTwoTone } from '@mui/icons-material';
import DataSourceMateria from '../../../../data/catalogos/materia';
import DataSourceCarrera from '../../../../data/catalogos/carrera';
import Swal from 'sweetalert2';

export default function ModalEditar({ idMateria, setTableUpdate }) {
    const [open, setOpen] = React.useState(false);
    const [materia, setMateria] = React.useState([]);
    const [nombre, setNombre] = React.useState('');
    const [carrera, setCarrera] = React.useState('');
    const [discarreras, setDisCarreras] = useState([]);
    const [update, setUpdate] = React.useState(false);

    const handleChangeCarrera = (event) => {
        setCarrera(event.target.value);
    };

    const handleChangeMateria = (event) => {
        setNombre(event.target.value);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function validarCampos() {
        if (materia !== '' && carrera !== '') {
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

        const updateMateria = {
            id_carrera: `${carrera}`,
            nombre: `${nombre}`
        };

        console.log('Datos --------->', updateMateria);

        DataSourceMateria.putMateriaData(idMateria.id, updateMateria);
        setTableUpdate(true);
        handleClose();
        Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            title: '¡Matería actualizada!',
            showConfirmButton: false,
            timer: 1500,
            toast: true
        });
    };

    const fetchMateria = async () => {
        const materia = await DataSourceMateria.getMateriaData(idMateria);
        setMateria(materia.data);
    };

    const fetchCarreras = async () => {
        const discarreras = await DataSourceCarrera.getCarrerasData();
        setDisCarreras(discarreras.data);
    };

    useEffect(() => {
        setNombre(idMateria.nombre);
        setCarrera(idMateria.id_carrera);
        fetchCarreras();
        setUpdate(false);
    }, [update]);

    return (
        <div>
            <EditIcon onClick={handleClickOpen} />
            <Dialog id="form-modal" sx={{ display: 'block' }} open={open} onClose={handleClose}>
                <DialogContent sx={{ maxWidth: 450 }}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="ID"
                        value={idMateria.id}
                        type="text"
                        size="small"
                        fullWidth
                        required
                        disabled
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nombre"
                        value={nombre}
                        onChange={handleChangeMateria}
                        type="text"
                        size="small"
                        fullWidth
                        required
                    />
                    <FormControl sx={{ pb: 1, pt: 1, mt: 1 }} size="small" label="Carrera" fullWidth required>
                        <InputLabel>Carrera</InputLabel>
                        <Select onChange={handleChangeCarrera} value={carrera}>
                            {discarreras.map((discarrera) => {
                                try {
                                    return (
                                        <MenuItem key={discarrera.id} value={discarrera.id}>
                                            {discarrera.nombre}
                                        </MenuItem>
                                    );
                                } catch (e) {
                                    return 'caught';
                                }
                            })}
                            ;
                        </Select>
                        <FormHelperText>Seleccione la carrera del alumno</FormHelperText>
                    </FormControl>
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
    idMateria: PropTypes.number.isRequired
};
