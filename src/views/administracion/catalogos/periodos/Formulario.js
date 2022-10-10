import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import DataSourcePeriodo from 'data/catalogos/periodo';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import format from 'date-fns/format';
import Swal from 'sweetalert2';

export default function Formulario({ setTableUpdate }) {
    const [inicio, setInicio] = React.useState(null);
    const [fin, setFin] = React.useState(null);

    function validarCampos() {
        if (inicio !== '' && fin !== '' && inicio !== null && fin !== null) {
            return true;
        }
        return false;
    }

    const guardarPeriodo = () => {
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

        const ini = format(inicio, 'yyyy-MM-dd');
        const fi = format(fin, 'yyyy-MM-dd');
        const nuevoPeriodo = {
            fecha_ini: `${ini}`,
            fecha_fin: `${fi}`
        };

        DataSourcePeriodo.postPeriodo(nuevoPeriodo);
        Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            title: '¡Periodo académico registrado!',
            showConfirmButton: false,
            timer: 1500,
            toast: true
        });
        setTableUpdate(true);
        setInicio(null);
        setFin(null);
    };

    return (
        <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '30%' } }} noValidate autoComplete="off">
            <div>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Inicio de curso"
                        value={inicio}
                        showToolbar
                        onChange={(newValue) => {
                            setInicio(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                        required
                    />
                    <DatePicker
                        label="Fin de curso"
                        value={fin}
                        showToolbar
                        onChange={(newValue) => {
                            setFin(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                        required
                    />
                </LocalizationProvider>
                <Button variant="contained" onClick={guardarPeriodo} sx={{ m: 1, minWidth: '30%', p: 1.5 }} startIcon={<SaveIcon />}>
                    Guardar
                </Button>
            </div>
        </Box>
    );
}
