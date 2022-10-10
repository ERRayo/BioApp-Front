import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { FormControl, FormControlLabel, FormHelperText } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DataSourceCarrera from '../../../../data/catalogos/carrera';
import DataSourceMateria from '../../../../data/catalogos/materia';
import Swal from 'sweetalert2';

export default function Formulario({ setTableUpdate }) {
    const [materia, setMateria] = React.useState('');
    const [carrera, setCarrera] = React.useState('');
    const [discarreras, setDisCarreras] = useState([]);

    const handleChangeCarrera = (event) => {
        setCarrera(event.target.value);
    };

    const handleChangeMateria = (event) => {
        setMateria(event.target.value);
    };

    function validarCampos() {
        let validar = false;
        if (materia !== '' && carrera !== '') {
            validar = true;
        }
        return validar;
    }

    const guardarAlumno = (e) => {
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

        const newMateria = {
            id_carrera: `${carrera}`,
            nombre: `${materia}`
        };

        DataSourceMateria.postMateriaData(newMateria);
        Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            title: '¡Matería registrada!',
            showConfirmButton: false,
            timer: 1500,
            toast: true
        });
        setMateria('');
        setCarrera('');
        setTableUpdate(true);
    };

    const fetchCarreras = async () => {
        const discarreras = await DataSourceCarrera.getCarrerasData();
        setDisCarreras(discarreras.data);
    };
    useEffect(() => {
        fetchCarreras();
    }, []);

    return (
        <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '32%', pt: 1 } }} noValidate autoComplete="off">
            <div>
                <TextField label="Materia" id="outlined-size-small" size="small" value={materia} onChange={handleChangeMateria} required />
                <FormControl sx={{ m: 1, minWidth: '31%', pt: 1 }} size="small" required>
                    <InputLabel>Carrera</InputLabel>
                    <Select onChange={handleChangeCarrera} value={carrera}>
                        {discarreras.map((discarreras) => {
                            try {
                                return (
                                    <MenuItem key={discarreras.id} value={discarreras.id}>
                                        {discarreras.nombre}
                                    </MenuItem>
                                );
                            } catch (e) {
                                return 'caught';
                            }
                        })}
                        ;
                    </Select>
                    <FormHelperText>Seleccione la carrera asociada a la matería</FormHelperText>
                </FormControl>
                <Button variant="contained" onClick={guardarAlumno} sx={{ m: 1, minWidth: '31%', mt: 2 }} startIcon={<SaveIcon />}>
                    Guardar
                </Button>
            </div>
        </Box>
    );
}
