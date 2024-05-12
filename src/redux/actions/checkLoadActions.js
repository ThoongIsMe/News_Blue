// checkLoadActions.js

export const setCheckLoad = (value) => async dispatch => {
    try {
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 3000);
        });

        dispatch({
            type: 'SET_CHECK_LOAD',
            payload: value,
        });
    } catch (error) {
        console.error(error);
    }
};