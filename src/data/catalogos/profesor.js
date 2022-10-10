import Api from '../Api';

const DataSourceProfesor = {
    getProfesoresData: async () => {
        try {
            return await Api.get('/profesor');
        } catch (e) {
            return 'Error al obtener profesores';
        }
    },

    postProfesor: async (nuevoProfesor) => {
        try {
            return await Api.post('/profesor', nuevoProfesor);
        } catch (e) {
            return console.log('Error al registrar un nuevo profesor');
        }
    },

    postUserProfesor: async (nuevoProfesor) => {
        try {
            return await Api.post('/auth/user/register/profesor', nuevoProfesor);
        } catch (e) {
            return console.log('Error al registrar un nuevo profesor');
        }
    },

    putProfesor: async (id, profesorActualizado) => {
        try {
            return await Api.put(`/profesor/${id}`, profesorActualizado);
        } catch (e) {
            return console.log('Error al actualizar al profesor');
        }
    },

    deleteProfesor: async (id) => {
        try {
            return await Api.delete(`/profesor/${id}`);
        } catch (e) {
            return console.log('Error al eliminar al profesor');
        }
    }
};

export default DataSourceProfesor;
