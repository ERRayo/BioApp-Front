import Api from '../Api';

const DataSourceMateria = {
    getMateriasData: async () => {
        try {
            return await Api.get('/materia');
        } catch (e) {
            return 'caught';
        }
    },
    getMateriaData: async (id) => {
        try {
            return await Api.get(`/materia/${id}`);
        } catch (e) {
            return 'caught';
        }
    },
    getMateriasByCarreraData: async (id) => {
        try {
            return await Api.get(`/materia/carrera/${id}`);
        } catch (e) {
            return 'Error';
        }
    },
    postMateriaData: async (newAlumno) => {
        try {
            return await Api.post('/materia', newAlumno);
        } catch (e) {
            return 'caught';
        }
    },
    putMateriaData: async (id, updateAlumno) => {
        try {
            return await Api.put(`/materia/${id}`, updateAlumno);
        } catch (e) {
            return 'caught';
        }
    },
    deleteMateriaData: async (id) => {
        try {
            return await Api.delete(`/materia/${id}`);
        } catch (e) {
            return 'caught';
        }
    }
};

export default DataSourceMateria;
