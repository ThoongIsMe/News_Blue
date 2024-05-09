import { CAP_NHAT_FULL_THONG_TIN, CAP_NHAT_MAT_KHAU, CAP_NHAT_HINH } from '../reducers/infoUserReducers';

export const updateTTUser = (id, firstName, lastName, image, email, password, role) => async dispatch => {
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
            role: role,
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


export const updateImgUser = (firstName, lastName, image, ) => async dispatch => {
    try {
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 3000);
        });

        dispatch({
            type: CAP_NHAT_HINH,
            firstName: firstName,
            lastName: lastName,
            image: image,
        });
    } catch (error) {
        console.error(error);
    }
};