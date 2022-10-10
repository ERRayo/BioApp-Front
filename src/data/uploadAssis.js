import Api from './Api';

const uploadAssis = {
    uploadFile: async (file) => {
        try {
            return await Api.post('/uploader', file);
        } catch (e) {
            return 'no file upload';
        }
    }
};

export default uploadAssis;
