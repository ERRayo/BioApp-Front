import Api from '../Api';

const DataSourceSesion = {
    getSesionesData: async () => {
        try {
            return await Api.get('/sesion');
        } catch (e) {
            return 'Error al obtener sesiones';
        }
    },

    postSesion: async (nuevoSesion) => {
        try {
            return await Api.post('/sesion', nuevoSesion);
        } catch (e) {
            return console.log('Error al registrar un nuevo sesion');
        }
    },

    putSesion: async (id, sesionActualizado) => {
        try {
            return await Api.put(`/sesion/${id}`, sesionActualizado);
        } catch (e) {
            return console.log('Error al actualizar al sesion');
        }
    },

    deleteSesion: async (id) => {
        try {
            return await Api.delete(`/sesion/${id}`);
        } catch (e) {
            return console.log('Error la sesion');
        }
    }
};

export default DataSourceSesion;
