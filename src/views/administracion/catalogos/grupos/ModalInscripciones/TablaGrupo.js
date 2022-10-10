import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import TableHead from '@mui/material/TableHead';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import EditIcon from '@mui/icons-material/Edit';
import PropTypes from 'prop-types';
import {
    Table,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    IconButton,
    Box,
    Paper,
    TableFooter,
    TablePagination,
    TextField
} from '@mui/material';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';
import DataSourceGrupos from 'data/catalogos/grupo';

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
        disablePadding: true,
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
        id: 'opciones',
        numeric: false,
        disablePadding: false,
        label: 'Opciones'
    }
];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function getComparator(order, orderBy) {
    return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

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

export default function TablaGrupo({ datos, grupo, setTableUpdate }) {
    const [numberStudents, setNumberStudents] = React.useState(datos.length);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('id');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [selected, setSelected] = React.useState([]);
    const isSelected = (name) => selected.indexOf(name) !== -1;
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - datos.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const eliminarAlumnoInscrito = (idAlumno, idGrupo) => {
        DataSourceGrupos.deleteAlumnoInscrito(idAlumno, idGrupo);
        console.log(`Se eliminará al alumno ${idAlumno} del grupo ${idGrupo}`);
        setTableUpdate(true);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer>
                    <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={datos.length}
                        />
                        <TableBody>
                            {stableSort(datos, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.id);

                                    function estadoRow() {
                                        if (row.activo === true) {
                                            return 'Activo';
                                        }
                                        return 'Baja';
                                    }

                                    return (
                                        <TableRow hover tabIndex={-1} key={row.alumno.id} selected={isItemSelected}>
                                            <TableCell align="right">{row.alumno.id}</TableCell>
                                            <TableCell align="right">{row.alumno.nombre}</TableCell>
                                            <TableCell align="right">{row.alumno.apellido_paterno}</TableCell>
                                            <TableCell align="right">{row.alumno.apellido_materno}</TableCell>
                                            <TableCell aling="center">
                                                <IconButton
                                                    title="Eliminar"
                                                    onClick={() => eliminarAlumnoInscrito(row.alumno.id, grupo.id)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter sx={{ justifyContent: 'flex-end', pl: 500 }}>
                            <TableRow>
                                <TableCell colSpan={2} />
                                <TablePagination
                                    rowsPerPageOptions={[5, 10]}
                                    colSpan={3}
                                    count={datos.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    labelRowsPerPage="Filas por página"
                                    showFirstButton
                                    showLastButton
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
}

TablaGrupo.propTypes = {
    datos: PropTypes.object.isRequired,
    grupo: PropTypes.object.isRequired,
    setTableUpdate: PropTypes.func.isRequired
};
