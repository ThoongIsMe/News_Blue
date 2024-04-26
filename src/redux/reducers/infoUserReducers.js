export const CAP_NHAT_MAT_KHAU = "CAP_NHAT_MAT_KHAU";
export const CAP_NHAT_FULL_THONG_TIN = "CAP_NHAT_FULL_THONG_TIN";
const initialState = {
    id: "",
    lastName: "",
    firstName: "",
    image: "",
    email: "",
    password: "",
}

export default function actionForReducer(state = initialState, payload) {
    switch (payload.type) {
        case CAP_NHAT_MAT_KHAU:
            return {
                ...state,
                password: payload.password,
            };
        case CAP_NHAT_FULL_THONG_TIN:
            return {
                id: payload.id,
                firstName: payload.firstName,
                lastName: payload.lastName,
                image: payload.image,
                password: payload.password,
                email: payload.email,

            };
        default:
            return state;
    }
}