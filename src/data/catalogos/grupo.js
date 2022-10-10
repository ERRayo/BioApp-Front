import Api from '../Api';

const DataSourceGrupos = {
    getGruposData: async () => {
        try {
            return await Api.get('/grupo');
        } catch (e) {
            return console.log('Error al obtener grupos');
        }
    },

    postGrupo: async (nuevoGrupo) => {
        try {
            return await Api.post('/grupo', nuevoGrupo);
        } catch (e) {
            return console.log('Error al guardar un nuevo grupo');
        }
    },

    postGrupoHorario: async (nuevoGrupo) => {
        try {
            return await Api.post('/grupo/horario', nuevoGrupo);
        } catch (e) {
            return console.log('Error al guardar un nuevo grupo');
        }
    },

    putGrupo: async (id, grupoActualizado) => {
        try {
            return await Api.put(`/grupo/${id}`, grupoActualizado);
        } catch (e) {
            return console.log('Error al actualizar el grupo');
        }
    },

    putGrupoHorario: async (id, grupoActualizado) => {
        try {
            return await Api.put(`/grupo/horario/${id}`, grupoActualizado);
        } catch (e) {
            return console.log('Error al actualizar el grupo');
        }
    },

    deleteGrupo: async (id) => {
        try {
            return await Api.delete(`/grupo/${id}`);
        } catch (e) {
            return console.log('Error al eliminar el grupo');
        }
    },

    getAlumnosPorCarrera: async (idCarrera) => {
        try {
            return await Api.get(`/alumno/carrera/${idCarrera}`);
        } catch (e) {
            return console.log('Error al obtener los alumnos de un programa de estudios');
        }
    },

    getAlumnosPorGrupo: async (idGrupo) => {
        try {
            return await Api.get(`/grupo/alumno/${idGrupo}`);
        } catch (e) {
            return console.log('Error al obtener alumnos de un grupo');
        }
    },

    getAlumnosNoGrupo: async (idCarrera, idGrupo) => {
        try {
            return await Api.get(`/alumnos/grupo/${idCarrera}/${idGrupo}`);
        } catch (e) {
            return console.log('Error al obtener los alumnos de una carrera que no estan inscritos en un grupo');
        }
    },

    deleteAlumnoInscrito: async (idAlumno, idGrupo) => {
        try {
            return await Api.delete(`/grupo/alumno/${idAlumno}/${idGrupo}`);
        } catch (e) {
            return console.log(`Error al eliminar al alumno ${idAlumno} del grupo ${idGrupo}. Error: ${e}`);
        }
    },

    postInscribirAlumnoGrupo: async (nuevoAlumno) => {
        try {
            return await Api.post('/grupo/alumno', nuevoAlumno);
        } catch (e) {
            return console.log('Error al inscribir un alumno en un grupo');
        }
    }
};

export default DataSourceGrupos;
