import Api from '../Api';

const DataSourceReportesGrupos = {
    getAsistenciasPorGrupo: async (idGrupo) => {
        try {
            return await Api.get(`/reportes/asistencia/grupo/asistencias/${idGrupo}`);
        } catch (e) {
            return console.log('Error al obtener las asistencias de un grupo');
        }
    },

    getAsistenciasCarrerasPorPeriodo: async (idCarrera, idPeriodo) => {
        try {
            return await Api.get(`/reportes/asistencia/materia/${idCarrera}/${idPeriodo}`);
        } catch (err) {
            return console.log('Error al obtener las asistencias de una carrera dado un periodo de estudio');
        }
    },

    getAsistenciasCarrerasPorMes: async (idCarrera, fecha) => {
        try {
            return await Api.get(`/reportes/asistencia/grupo/${idCarrera}/${fecha}`);
        } catch (e) {
            return console.log('Error al obtener las asistencias de los alumnos de un grupo por mes');
        }
    }
};

export default DataSourceReportesGrupos;
