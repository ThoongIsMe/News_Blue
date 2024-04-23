export const getNewsFromApiAsync = async(code) => {
    try {
        const response = await fetch('http://192.168.4.102:3030/articles');
        const json = await response.json();
        return json; // Trả về toàn bộ đối tượng JSON từ API
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getCategoriesFromApiAsync = async(code) => {
    try {
        const response = await fetch('http://192.168.4.102:3030/categories');
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export default { getNewsFromApiAsync, getCategoriesFromApiAsync };