import Api from '../Api';

const DataSourcePeriodo = {
    getPeriodosData: async () => {
        try {
            return await Api.get('/periodo');
        } catch (e) {
            return 'Error al consultar los periodos de estudio';
        }
    },

    postPeriodo: async (nuevoPeriodo) => {
        try {
            return await Api.post('/periodo', nuevoPeriodo);
        } catch (e) {
            return console.log('Error al registrar un nuevo periodo');
        }
    },

    putPeriodo: async (id, periodoActualizado) => {
        try {
            return await Api.put(`/periodo/${id}`, periodoActualizado);
        } catch (e) {
            return console.log('Error al actualizar el periodo de estudios');
        }
    },

    deletePeriodo: async (id) => {
        try {
            return await Api.delete(`/periodo/${id}`);
        } catch (e) {
            return console.log('Error al eliminar el periodo de estudios');
        }
    }
};

export default DataSourcePeriodo;
