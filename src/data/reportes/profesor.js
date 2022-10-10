import Api from '../Api';

const DataSourceReportesProfesores = {
    getAsistenciaProfesor: async () => {
        try {
            return await Api.get('/asistencia');
        } catch (e) {
            return console.log('Error al obtener las estadísticas de asistencia de alumnos por profesor');
        }
    },

    getAsistenciaProfesorID: async (idProfesor) => {
        try {
            return await Api.get(`/asistencia/${idProfesor}`);
        } catch (e) {
            return console.log('Error al consultar la asistencia de alumnos de un profesor dado un periodo academico');
        }
    },

    postAsistenciaBusqueda: async (DatosBusqueda) => {
        try {
            return await Api.post('/asistencia/reporte', DatosBusqueda);
        } catch (e) {
            return console.log('Error al consultar la asistencia de alumnos de un profesor dado un periodo academico');
        }
    }
};

export default DataSourceReportesProfesores;
