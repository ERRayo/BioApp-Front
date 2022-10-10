import Api from '../Api';

const DataSourceReportesAlumnos = {
    getAsistenciaAlumno: async (idAlumno) => {
        try {
            return await Api.get(`/reportes/asistencia/alumno/${idAlumno}`);
        } catch (e) {
            return console.log('Error al obtener las estadísticas de asistencia del alumno');
        }
    },

    getAsistenciaAlumnoPorIntervaloTiempo: async (idAlumno, fechaInicio, fechaFin) => {
        try {
            return await Api.get(`/reportes/asistencia/alumno/${idAlumno}/${fechaInicio}/${fechaFin}`);
        } catch (e) {
            return console.log('Error al consultar la asistencia del alumno por intervalo de tiempo');
        }
    }
};

export default DataSourceReportesAlumnos;
