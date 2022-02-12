
import axios from 'axios';
import { setInterceptor } from './AxiosInterceptor'

class HttpHelper {
    // The axios instnace, new instance in the wrappe so that the default one using other areas will not have any impact.
    axiosInstance;
    constructor() {
        this.axiosInstance = axios.create();
        // TODO: move this to env variable
        this.axiosInstance.defaults.baseURL = 'https://localhost:5011/api'
        setInterceptor(this.axiosInstance);
    }

    /**
     * The function to initiate the http get method
     * @param {String} url  - the endpoint (relational url of API)
     * @param {Boolean} bypassGlobalError - Whether to bypass the global error handling or not
     * @param {Object} config - Additional configurations if any
     */
    async get(url, bypassGlobalError= false,config) {
        let that = this;
        const result = await this.axiosInstance.get(url, config).catch(err => {
            that.handleError(err, bypassGlobalError);
        });
        return result;
    }

    /**
     * The function to initiate the http post method
     * @param {String} url  - the endpoint (relational url of API)
     * @param {Object} payload - the data to create
     * @param {Boolean} showLoading - Whether to show global spinner or not while api call in process.
     * @param {Boolean} bypassGlobalError - Whether to bypass the global error handling or not
     * @param {Object} config - Additional configurations if any
     */
    async post(url, payload, bypassGlobalError= false,config) {
        let that = this;
        const result= await this.axiosInstance.post(url, payload, config).catch(err => {
            that.handleError(err, bypassGlobalError);
        });
        return result;
    }

    /**
     * 
     * @param {String} url  - the endpoint (relational url of API)
     * @param {Object} payload - the data to update
     * @param {Boolean} showLoading - Whether to show global spinner or not while api call in process.
     * @param {Boolean} bypassGlobalError - Whether to bypass the global error handling or not
     * @param {Object} config - Additional configurations if any
     */
    async put(url, payload, bypassGlobalError= false,config) {
        let that = this;
        const result= await this.axiosInstance.put(url, payload, config).catch(err => {
            that.handleError(err, bypassGlobalError);
        });
        return result;
    }

    /**
     * 
     * @param {String} url  - the endpoint (relational url of API)
     * @param {Object} payload - the data to update
     * @param {Boolean} showLoading - Whether to show global spinner or not while api call in process.
     * @param {Boolean} bypassGlobalError - Whether to bypass the global error handling or not
     * @param {Object} config - Additional configurations if any
     */
    async patch(url, payload, bypassGlobalError= false,config) {
        let that = this;
        const result= await this.axiosInstance.patch(url, payload, config).catch(err => {
            that.handleError(err, bypassGlobalError);
        });
        return result;
    }

    /**
     * 
     * @param {String} url  - the endpoint (relational url of API)
     * @param {Boolean} showLoading - Whether to show global spinner or not while api call in process.
     * @param {Boolean} bypassGlobalError - Whether to bypass the global error handling or not
     * @param {Object} config - Additional configurations if any
     */
    async delete(url, bypassGlobalError= false,config) {
        let that = this;
        const result= await this.axiosInstance.delete(url, config).catch(err => {
            that.handleError(err, bypassGlobalError);
        });
        return result;
    }

    handleError(err, bypassGlobalError) {
        // TODO: log the error.
        if(bypassGlobalError){
            throw err;
        } else if (err.response.status === 401 || err.response.status === 403) {
            throw err;
        } else {
            if(err?.response?.data?.ErrorInfo) {
                alert(err?.response?.data?.ErrorInfo)
            } else if(err?.response?.data?.Message) {
                alert(err?.response?.data?.Message)
            }else{
                alert('Oops! Something went wrong ! Please try again. ')
            }
        }
    }
}

const httpHelper = new HttpHelper()
export default httpHelper
