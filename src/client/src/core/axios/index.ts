import axios from "axios";
import qs from 'qs'
import { getCookie } from "../utils";

const config = {
    baseURL: 'http://localhost:3000/api',
    timeout: 20000,
}

const _axios = axios.create(config)

export default {
    get: (url: string, params: unknown) => {
        const token = getCookie('token')
        return new Promise((resolve, reject) => {
            _axios.get(url, {
                params, headers: {
                    'Authorization': token
                }
            }).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    post: (url: string, params: unknown) => {
        const token = getCookie('token')
        return new Promise((resolve, reject) => {
            _axios.post(url, qs.stringify(params), {
                headers: {
                    'Authorization': token
                }
            }).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    form: (url: string, form: FormData) => {
        return new Promise((resolve, reject) => {
            _axios.post(url, form, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    }
}