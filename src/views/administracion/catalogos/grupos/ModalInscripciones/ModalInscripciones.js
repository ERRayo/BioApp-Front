import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SubCard from 'ui-component/cards/SubCard';
import {
    Dialog,
    Grid,
    DialogContent,
    ListItemText,
    Button,
    ListItemIcon,
    DialogActions,
    List,
    ListItem,
    Checkbox,
    Paper
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DataSourceGrupos from 'data/catalogos/grupo';
import TablaCarrera from './TablaCarrera';
import TablaGrupo from './TablaGrupo';

export default function ModalInscripciones({ grupo }) {
    const [open, setOpen] = React.useState(false);
    const [listaCarrera, setListaCarrera] = React.useState([]);
    const [listaGrupo, setListaGrupo] = React.useState([]);
    const [tableUpdate, setTableUpdate] = React.useState(false);

    const fetchAlumnosPorCarrera = async (idCarrera, idGrupo) => {
        const alumnos = await DataSourceGrupos.getAlumnosNoGrupo(idCarrera, idGrupo);
        setListaCarrera(alumnos.data);
    };

    const fetchAlumnosPorGrupo = async (idGrupo) => {
        const lista = await DataSourceGrupos.getAlumnosPorGrupo(idGrupo);
        setListaGrupo(lista.data);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    useEffect(() => {
        fetchAlumnosPorCarrera(grupo.materia.carrera.id, grupo.id);
        fetchAlumnosPorGrupo(grupo.id);
        setTableUpdate(false);
    }, [tableUpdate]);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <UploadFileIcon title="Inscripciones" onClick={handleClickOpen} />
            <Dialog open={open} onClose={handleClose} maxWidth="md">
                <DialogContent>
                    <Grid item xs={12} sm={12} sx={{ px: 2, pb: 2 }}>
                        <SubCard title={`Alumnos del programa ${grupo.materia.carrera.nombre}`}>
                            <Grid container direction="column" spacing={1}>
                                <TablaCarrera rows={listaCarrera} grupo={grupo} setTableUpdate={setTableUpdate} />
                            </Grid>
                        </SubCard>
                    </Grid>
                    <Grid item xs={12} sm={12} sx={{ px: 2, pb: 2 }}>
                        <SubCard title={`Alumnos del grupo ${grupo.id}`}>
                            <Grid container direction="column" spacing={1}>
                                <TablaGrupo datos={listaGrupo} grupo={grupo} setTableUpdate={setTableUpdate} />
                            </Grid>
                        </SubCard>
                    </Grid>
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
                </DialogActions>
            </Dialog>
        </div>
    );
}

ModalInscripciones.propTypes = {
    grupo: PropTypes.object.isRequired
};
