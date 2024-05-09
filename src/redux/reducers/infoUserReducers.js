export const CAP_NHAT_MAT_KHAU = "CAP_NHAT_MAT_KHAU";
export const CAP_NHAT_FULL_THONG_TIN = "CAP_NHAT_FULL_THONG_TIN";
export const CAP_NHAT_HINH = "CAP_NHAT_HINH";

const initialState = {
    id: "",
    lastName: "",
    firstName: "",
    image: "",
    email: "",
    password: "",
    role: "",
}

export default function actionForReducer(state = initialState, payload) {
    switch (payload.type) {
        case CAP_NHAT_MAT_KHAU:
            return {
                ...state,
                password: payload.password,
            };
        case CAP_NHAT_HINH:
            return {
                ...state,
                image: payload.image,
                lastName: payload.lastName,
                firstName: payload.firstName,
            };
        case CAP_NHAT_FULL_THONG_TIN:
            return {
                id: payload.id,
                firstName: payload.firstName,
                lastName: payload.lastName,
                image: payload.image,
                password: payload.password,
                email: payload.email,
                role: payload.role,

            };
        default:
            return state;
    }
}