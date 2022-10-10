import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import PieChartIcon from '@mui/icons-material/PieChart';
import SearchIcon from '@mui/icons-material/Search';
import { PieChart, Pie, Sector } from 'recharts';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Box, TextField, Button, Select, FormControl, InputLabel, MenuItem } from '@mui/material';
import DataSourcePeriodo from 'data/catalogos/periodo';
import DataSourceReportesCarreras from 'data/reportes/carrera';
import Swal from 'sweetalert2';

const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Frecuencia ${value}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`(Porcentaje ${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

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

export default function ModalGrafica({ carrera }) {
    const [open, setOpen] = React.useState(false);
    const [periodo, setPeriodo] = React.useState('');
    const [listaPeriodos, setListaPeriodos] = React.useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [estadisticas, setEstadisticas] = React.useState([]);
    const [updateEstadisticas, setUpdateEstadisticas] = React.useState(false);

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250
            }
        }
    };

    const onPieEnter = useCallback(
        (_, index) => {
            setActiveIndex(index);
        },
        [setActiveIndex]
    );

    const fetchPeriodos = async () => {
        const lista = await DataSourcePeriodo.getPeriodosData();
        setListaPeriodos(lista.data);
    };

    const fetchEstadisticas = async (idCarrera) => {
        let estadisticas = await DataSourceReportesCarreras.getAsistenciaCarrera(idCarrera);
        estadisticas = estadisticas.data;
        const datos = [
            { name: 'Asistencias', value: estadisticas.asistencias },
            { name: 'Faltas', value: estadisticas.faltas }
        ];
        setEstadisticas(datos);
    };

    const buscarAsistenciasPeriodo = async (idCarrera, idPeriodo) => {
        let estadisticas = await DataSourceReportesCarreras.getAsistenciasCarrerasPorPeriodo(idCarrera, idPeriodo);
        estadisticas = estadisticas.data;
        const datos = [
            { name: 'Asistencias', value: estadisticas.asistencias },
            { name: 'Faltas', value: estadisticas.faltas }
        ];
        console.log(datos);
        setEstadisticas(datos);
    };

    useEffect(() => {
        fetchPeriodos();
        fetchEstadisticas(carrera.id);
        setUpdateEstadisticas(false);
    }, [updateEstadisticas]);

    const handleClickOpen = () => {
        setOpen(true);
        setPeriodo('');
    };

    const handleClose = () => {
        setOpen(false);
        setPeriodo('');
    };

    const handleChangePeriodo = (event) => {
        setPeriodo(event.target.value);
    };

    const consultarAsistencias = () => {
        if (periodo !== '') {
            console.log('Se buscarán las asistencias');
            buscarAsistenciasPeriodo(carrera.id, periodo);
        } else {
            Swal.fire({
                position: 'bottom-end',
                icon: 'warning',
                title: '¡Verifique los campos!',
                showConfirmButton: false,
                timer: 1500,
                toast: true,
                target: document.getElementById('form-modal')
            });
        }
    };

    return (
        <div>
            <PieChartIcon onClick={handleClickOpen} />
            <Dialog id="form-modal" sx={{ display: 'block' }} open={open} onClose={handleClose}>
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {`Reporte de asistencias del programa ${carrera.nombre}`}
                </BootstrapDialogTitle>
                <DialogContent sx={{ minWidth: 575, display: 'block' }}>
                    <Box component="form" noValidate autoComplete="off">
                        <div>
                            <FormControl sx={{ m: 1, minWidth: '60%', width: '60%', p: 1 }} size="small" required>
                                <InputLabel>Periodo de estudios</InputLabel>
                                <Select onChange={handleChangePeriodo} value={periodo} MenuProps={MenuProps}>
                                    {listaPeriodos.map((periodo) => {
                                        try {
                                            return (
                                                <MenuItem key={periodo.id} value={periodo.id}>
                                                    {`${periodo.fecha_ini} - ${periodo.fecha_fin}`}
                                                </MenuItem>
                                            );
                                        } catch (e) {
                                            return 'Error';
                                        }
                                    })}
                                    ;
                                </Select>
                            </FormControl>
                            <Button
                                variant="contained"
                                onClick={consultarAsistencias}
                                sx={{ m: 1, minWidth: '30%', p: 1.5 }}
                                startIcon={<SearchIcon />}
                            >
                                Buscar
                            </Button>
                        </div>
                    </Box>
                    <Box component="form" noValidate autoComplete="off">
                        <PieChart width={575} height={300}>
                            <Pie
                                activeIndex={activeIndex}
                                activeShape={renderActiveShape}
                                data={estadisticas}
                                innerRadius={70}
                                outerRadius={90}
                                fill="#2196f3"
                                dataKey="value"
                                onMouseEnter={onPieEnter}
                            />
                        </PieChart>
                    </Box>
                </DialogContent>
            </Dialog>
        </div>
    );
}

ModalGrafica.propTypes = {
    carrera: PropTypes.object.isRequired
};
