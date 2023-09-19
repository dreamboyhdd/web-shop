import Axios from 'axios'
export const GROUPID=1
/* const DomainGROUP = window.location.host; */
//const API_DOMAIN = 'http://localhost:62608/'
const API_DOMAIN = 'https://cakshop-api.vps.vn'
//const API_DOMAIN = 'http://api-test-customer.netco.com.vn'

const VERSION_END_POINT = '/api'
const VERSION_END_POINT_APP = '/api/ApiMain'

export const APIKey = 'CAKApikey2025'
export const API_END_POINT = API_DOMAIN + VERSION_END_POINT
export const API_END_POINT_APP = API_DOMAIN + VERSION_END_POINT_APP
export const API_END_POINT_UPLOAD = 'https://cakshop-api.vps.vn/api/ApiMain'
export const LINKDomain ="https://cakshop-api.vps.vn"
export const LINK_IMAGE ="https://mediaimages.vps.vn"

export const api = Axios.create({
    baseURL: API_END_POINT,
    headers: {
        'Content-Type': 'application/json',
        'allowedHeaders': ["Content-Type", "Authorization"]
    },
})
export const setToken = (token) => {
    // api.defaults.headers.common.Authorization = `Bearer ${token}`
    api.defaults.headers.common.Authorization = token
}