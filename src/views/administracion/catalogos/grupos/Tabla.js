import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
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
import EnhancedTableHead from './HeadTable';
import DataSourceGrupo from '../../../../data/catalogos/grupo';
import ModalEditar from './ModalEditar';
import ModalInscripciones from './ModalInscripciones/ModalInscripciones';
import Swal from 'sweetalert2';

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

export default function Tabla({ datos, setTableUpdate }) {
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

    const eliminarGrupo = (id) => {
        Swal.fire({
            title: '¿Deseas eliminar el grupo?',
            text: 'Está acción es irreversible!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                DataSourceGrupo.deleteGrupo(id);
                setTableUpdate(true);
                Swal.fire('Grupo eliminado!');
            }
        });
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

                                    console.log('Datos de la tabla---->', row);

                                    return (
                                        <TableRow hover tabIndex={-1} key={row.id} selected={isItemSelected}>
                                            <TableCell align="right">{row.id}</TableCell>
                                            <TableCell align="left">{`${row.periodo.fecha_ini} - ${row.periodo.fecha_fin}`}</TableCell>
                                            <TableCell align="left">{row.materia.carrera.nombre}</TableCell>
                                            <TableCell align="left">{row.materia.nombre}</TableCell>
                                            <TableCell align="left">{`${row.profesor.nombre} ${row.profesor.apellido_paterno} ${row.profesor.apellido_materno}`}</TableCell>
                                            <TableCell align="left">{row.aula}</TableCell>
                                            <TableCell align="left">{row.grupo_estado ? 'Activo' : 'Inactivo'}</TableCell>
                                            <TableCell aling="center">
                                                <IconButton>
                                                    <ModalEditar idGrupo={row} setTableUpdate={setTableUpdate} />
                                                </IconButton>
                                                <IconButton title="Eliminar" onClick={() => eliminarGrupo(row.id)}>
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
                                <TableCell colSpan={4} />
                                <TablePagination
                                    rowsPerPageOptions={[5, 10]}
                                    colSpan={4}
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

Tabla.propTypes = {
    datos: PropTypes.object.isRequired,
    setTableUpdate: PropTypes.func.isRequired
};
