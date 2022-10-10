import Api from '../Api';
import Alerta from '../../layout/MainLayout/Alerta';

const DataSourceCarrera = {
    getCarrerasData: async () => {
        try {
            return await Api.get('/carrera');
        } catch (e) {
            return <Alerta mensaje="Error al obtener los planes de estudio" />;
        }
    },

    postCarrera: async (nuevaCarrera) => {
        try {
            return await Api.post('/carrera', nuevaCarrera);
        } catch (e) {
            return <Alerta mensaje="Error al guardar un nuevo plan de estudios" />;
        }
    },

    putCarrera: async (id, carreraActualizada) => {
        try {
            return await Api.put(`/carrera/${id}`, carreraActualizada);
        } catch (e) {
            return console.log('Error al actualizar el plan de estudios');
        }
    },

    deleteCarrera: async (id) => {
        try {
            return await Api.delete(`/carrera/${id}`);
        } catch (e) {
            return console.log('Error al eliminar el plan de estudios');
        }
    }
};

export default DataSourceCarrera;
