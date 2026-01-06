
// configuração
import axios from "axios"
//https://react-recipes-eta.vercel.app/api
//http://localhost:3000/api
const programFetch = axios.create({
    baseURL: "https://react-recipes-eta.vercel.app/api",
    headers: {
        "Content-Type": "application/json"
    }
})

programFetch.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

export const linkToImg = "https://react-recipes-eta.vercel.app"
export default programFetch;