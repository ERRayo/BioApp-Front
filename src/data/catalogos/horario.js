import Api from '../Api';

const DataSourceHorario = {
    getHorarioData: async (id) => {
        try {
            return await Api.get(`/horario/${id}`);
        } catch (e) {
            return 'caught';
        }
    }
};

export default DataSourceHorario;
