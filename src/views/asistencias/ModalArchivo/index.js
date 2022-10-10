import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import DialogTitle from '@mui/material/DialogTitle';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import { Box, TextField, Button, Select, FormControl, InputLabel, MenuItem, Grid } from '@mui/material';
import SubCard from 'ui-component/cards/SubCard';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileTimePicker from '@mui/lab/MobileTimePicker';
import uploadAssis from 'data/uploadAssis';
import { format, parse } from 'date-fns';
import Tabla from './Tabla';
import TablaTeams from './TablaTeams';
import Swal from 'sweetalert2';

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
    const [value, setValue] = React.useState(' ');
    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500]
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired
};

export default function ModalArchivo({ grupo }) {
    const [open, setOpen] = React.useState(false);
    const [inicio, setInicio] = React.useState('');
    const [fin, setFin] = React.useState('');
    const [file, setFile] = React.useState();
    const [fileLoad, setFileLoad] = React.useState(false);
    const [assis, setAssis] = React.useState([]);
    const [tableUpdate, setTableUpdate] = React.useState(false);
    const [tableUpdateTeams, setTableUpdateTeams] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setInicio('');
        setFin('');
        setFile();
        setAssis([]);
        setTableUpdate(false);
        setTableUpdateTeams(false);
        setOpen(false);
    };

    const handleChangeFile = (event) => {
        setFile(event.target.files[0]);
        setFileLoad(true);
    };

    const fechAssis = async (formData) => {
        const lista = await uploadAssis.uploadFile(formData);
        setAssis(lista.data);
        console.log('Api response: ', assis);
        if (assis !== undefined && assis !== null && assis.length > 0) {
            const encabezado = Object.keys(assis[0]);
            console.log('IMPORTANTE : ', encabezado.length);
            if (encabezado.length > 6) {
                setTableUpdate(true);
            } else {
                setTableUpdateTeams(true);
            }
        } else {
            Swal.fire({
                position: 'bottom-end',
                icon: 'warning',
                title: '¡Por favor, intente otra vez!',
                showConfirmButton: false,
                timer: 1500,
                toast: true,
                target: document.getElementById('modal')
            });
        }
    };

    const cargarArchivo = () => {
        if (inicio !== '' && fin !== '' && fileLoad !== false) {
            const inicioAux = format(inicio, 'hh:mm');
            const finoAux = format(fin, 'hh:mm');

            const formData = new FormData();

            formData.append('id_grupo', grupo.id);
            formData.append('inicio', inicioAux);
            formData.append('fin', finoAux);
            formData.append('profesor', `${grupo.profesor.nombre} ${grupo.profesor.apellido_paterno} ${grupo.profesor.apellido_materno}`);

            formData.append('file', file);
            fechAssis(formData);
        } else {
            Swal.fire({
                position: 'bottom-end',
                icon: 'warning',
                title: '¡Verifique los campos!',
                showConfirmButton: false,
                timer: 1500,
                toast: true,
                target: document.getElementById('modal')
            });
        }
    };

    return (
        <div>
            <NoteAddIcon onClick={handleClickOpen} />
            <Dialog id="modal" sx={{ display: 'block', minWidth: 1300 }} maxWidth="lg" open={open} onClose={handleClose}>
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {`Cargar archivos de asistencia del grupo ${grupo.id}`}
                </BootstrapDialogTitle>
                <DialogContent sx={{ display: 'inline' }}>
                    <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '23%' } }} noValidate autoComplete="off">
                        <div>
                            <Box sx={{ p: 1, bgcolor: 'background.paper', '& .MuiTextField-root': { m: 1, width: '25%' } }}>
                                <LocalizationProvider dateAdapter={AdapterDateFns} sx={{ mr: 2 }}>
                                    <MobileTimePicker
                                        label="Hora inicio"
                                        value={inicio}
                                        onChange={(newInicio) => {
                                            setInicio(newInicio);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                    <MobileTimePicker
                                        label="Hora fin"
                                        value={fin}
                                        onChange={(newFin) => {
                                            setFin(newFin);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                                <Button variant="outlined" component="label" sx={{ width: '20%', mt: 1, p: 1.5 }}>
                                    Cargar Archivos
                                    <input
                                        type="file"
                                        name="file"
                                        onChange={handleChangeFile}
                                        accept=".csv, .zip, .rar"
                                        style={{ display: 'none' }}
                                    />
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    component="span"
                                    justifyContent="center"
                                    onClick={cargarArchivo}
                                    type="submit"
                                    sx={{ mt: 1, p: 1.5, ml: 1, width: '20%' }}
                                >
                                    Subir Asistencia
                                </Button>
                            </Box>
                        </div>
                    </Box>
                    <Grid item xs={12} sm={12} sx={{ px: 2, pb: 2 }}>
                        <SubCard title="Lista de asistencia">
                            <Grid container direction="column" spacing={1}>
                                {tableUpdate ? <Tabla datos={assis} /> : ''}
                                {tableUpdateTeams ? <TablaTeams datos={assis} /> : ''}
                            </Grid>
                        </SubCard>
                    </Grid>
                </DialogContent>
            </Dialog>
        </div>
    );
}

ModalArchivo.propTypes = {
    grupo: PropTypes.object.isRequired
};
