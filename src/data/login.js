import Api from './Api';

const loginUser = {
    authUser: async (user) => {
        try {
            return await Api.post('/auth/user/login', user);
        } catch (e) {
            return 'aqui esta el error';
        }
    },
    getUser: async () => {
        try {
            return await Api.get('/auth/user/me', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
        } catch (e) {
            return 'Sin usuario';
        }
    }
};

export default loginUser;
