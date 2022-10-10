import Api from '../Api';

const DataSourceReportesMateria = {
    getMateriasPeriodo: async (idPeriodo) => {
        try {
            return await Api.get(`reportes/asistencia/materia/${idPeriodo}`);
        } catch (e) {
            return console.log('Error al guardar un nuevo grupo');
        }
    },
    getAsistenciasMateriaPeriodo: async (idMateria, idPeriodo) => {
        try {
            return await Api.get(`reportes/asistencia/materia/${idMateria}/${idPeriodo}`);
        } catch (e) {
            return console.log('Error al guardar un nuevo grupo');
        }
    },
    getAsistenciasMaterias: async (idMateria) => {
        try {
            return await Api.get(`reportes/asistencia/materia/estadisticas/${idMateria}`);
        } catch (e) {
            return console.log('Error al consultar la asistencia de una materia');
        }
    }
};

export default DataSourceReportesMateria;
