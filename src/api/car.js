import api from "./baseApi";

export const AddCar = async (data) => {
    const response = await api().post("addCar", data, {
        headers: {
            Authorization: `${localStorage.getItem('token')}`,
        },
    })
    return response;

}