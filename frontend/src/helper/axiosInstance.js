import axios from "axios";

const url = import.meta.env.VITE_BACKEND_URL;
console.log(url);
const axiosInstance=axios.create({
    baseURL:url,
    withCredentials:true,
});

axiosInstance.interceptors.request.use(config=>{
     const accessToken=JSON.parse(sessionStorage.getItem('accessToken'));
     if(accessToken){
         config.headers.Authorization=`Bearer ${accessToken}`
     }
     return config
})

export default axiosInstance
