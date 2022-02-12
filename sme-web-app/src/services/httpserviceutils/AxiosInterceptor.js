import { getLoggedInUser, setLoggedInUser } from "../user.service";
import httpHelper from "./HttpHelper";
const REFRESH_TOKEN_END_POINT = "/v1/user/refreshtoken"

export const setInterceptor = (axiosInstance) => {
    //Request interceptor
    axiosInstance.interceptors.request.use(function (config) {
        config.headers.common['Authorization'] = 'Bearer ' + getLoggedInUser()?.token
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

    //Response interceptor
    axiosInstance.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        return response;
    }, function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        if ((error?.response?.status === 401 || error?.toJSON()?.message === "Network Error") && error.config) {
            getRefreshToken().then(res => {
                setLoggedInUser(res.data)
                error.response.config.headers.common['Authorization'] = 'Bearer ' + getLoggedInUser()?.token
                return axios(error.response.config);
            })
        } else {
            return Promise.reject(error);
        }
    });
}

const getRefreshToken = async () => {
    try {
        const rft = (getLoggedInUser())?.refreshToken;
        const response = await httpHelper.post(REFRESH_TOKEN_END_POINT, { refreshToken: `${rft.toString()}` }, 
        {headers: {'Authorization': 'Bearer ' + getLoggedInUser()?.token}});

        return response;
    } catch (err) {
        console.error(err)
    }
};