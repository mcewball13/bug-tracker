import axios from "axios";

// TODO Add BASE URL API
const axiosInstance = axios.create({ baseURL: process.env.HOST_URL || "" });

axiosInstance.interceptors.request.use(
    (response) => response,
    (error) =>
        Promise.reject(
            (error.response && error.response.data) ||
                "Something went wrong please try again later"
        )
);

export default axiosInstance;
