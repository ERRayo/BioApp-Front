import TableHead from '@mui/material/TableHead';
import PropTypes from 'prop-types';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Box from '@mui/material/Box';

// Se definen los atributos de las variables de la tabla
const headCells = [
    {
        id: 'id',
        numeric: true,
        disablePadding: false,
        label: 'ID'
    },
    {
        id: 'nombre',
        numeric: false,
        disablePadding: false,
        label: 'Nombre'
    },
    {
        id: 'paterno',
        numeric: false,
        disablePadding: false,
        label: 'Apellido paterno'
    },
    {
        id: 'materno',
        numeric: false,
        disablePadding: false,
        label: 'Apellido materno'
    },
    {
        id: 'no_trabajador',
        numeric: false,
        disablePadding: false,
        label: 'Número de empleado'
    },
    {
        id: 'opciones',
        numeric: false,
        disablePadding: false,
        label: 'Opciones'
    }
];

// Funciones genericas

// Se define la estructura de la cabezera de la tabla
function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired
};

export default EnhancedTableHead;
