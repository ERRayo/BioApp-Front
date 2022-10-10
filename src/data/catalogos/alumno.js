import Api from '../Api';

const DataSourceAlumno = {
    getStudentsData: async () => {
        try {
            return await Api.get('/alumno');
        } catch (e) {
            return 'caught';
        }
    },
    getStudentData: async (id) => {
        try {
            return await Api.get(`/alumno/${id}`);
        } catch (e) {
            return 'caught';
        }
    },
    postStudentData: async (newAlumno) => {
        try {
            return await Api.post('/alumno', newAlumno);
        } catch (e) {
            return 'caught';
        }
    },
    putStudentData: async (id, updateAlumno) => {
        try {
            return await Api.put(`/alumno/${id}`, updateAlumno);
        } catch (e) {
            return 'caught';
        }
    },
    deleteStudentData: async (id) => {
        try {
            return await Api.delete(`/alumno/${id}`);
        } catch (e) {
            return 'caught';
        }
    },

    getAlumnosPorCarrera: async (idCarrera) => {
        try {
            return await Api.get(`/alumno/carrera/${idCarrera}`);
        } catch (e) {
            return 'Error';
        }
    },

    getAlumnosPorGrupo: async (idGrupo) => {
        try {
            return await Api.get(`/grupo/alumno/${idGrupo}`);
        } catch (e) {
            return 'Error';
        }
    }
};

export default DataSourceAlumno;
