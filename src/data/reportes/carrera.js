import Api from '../Api';

const DataSourceCarrerasPorPeriodo = {
    getAsistenciaCarrera: async (idCarrera) => {
        try {
            return await Api.get(`/reportes/asistencia/carrera/${idCarrera}`);
        } catch (e) {
            return console.log('Error al obtener las asistencias de un programa de estudios');
        }
    },

    getAsistenciasCarrerasPorPeriodo: async (idCarrera, idPeriodo) => {
        try {
            return await Api.get(`/reportes/asistencia/carrera/${idCarrera}/${idPeriodo}`);
        } catch (err) {
            return console.log('Error al obtener las asistencias de una carrera dado un periodo de estudio');
        }
    }
};

export default DataSourceCarrerasPorPeriodo;
