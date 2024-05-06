import { CAP_NHAT_FULL_THONG_TIN, CAP_NHAT_MAT_KHAU } from '../reducers/infoUserReducers';

export const updateTTUser = (id, firstName, lastName, image, email, password) => async dispatch => {
    try {
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 3000);
        });

        dispatch({
            type: CAP_NHAT_FULL_THONG_TIN,
            id: id,
            firstName: firstName,
            lastName: lastName,
            image: image,
            email: email,
            password: password,
        });
    } catch (error) {
        console.error(error);
    }
};


export const updatePassUser = (password) => async dispatch => {
    try {
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 3000);
        });

        dispatch({
            type: CAP_NHAT_MAT_KHAU,
            password: password,
        });
    } catch (error) {
        console.error(error);
    }
};