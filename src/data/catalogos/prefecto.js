import Api from '../Api';

const DataSourcePrefecto = {
    getPrefectoData: async () => {
        try {
            return await Api.get('/prefecto');
        } catch (e) {
            return console.log('Error al obtener grupos');
        }
    },

    postPrefectoUser: async (prefecto) => {
        try {
            return await Api.post('/auth/user/register/prefecto', prefecto);
        } catch (e) {
            return console.log('Error al guardar un nuevo grupo');
        }
    },

    putPrefecto: async (id, prefecto) => {
        try {
            return await Api.put(`/auth/user/update/prefecto/${id}`, prefecto);
        } catch (e) {
            return console.log('Error al actualizar el grupo');
        }
    },

    deletePrefecto: async (id) => {
        try {
            return await Api.delete(`/prefecto/${id}`);
        } catch (e) {
            return console.log('Error al eliminar el grupo');
        }
    }
};

export default DataSourcePrefecto;
