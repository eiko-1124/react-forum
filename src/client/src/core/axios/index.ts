import axios from "axios";
import { getCookie } from "../utils";
import Router from "next/router";
import jwt from "jsonwebtoken";

const config = {
    baseURL: 'http://localhost:3000/api',
    timeout: 20000
}

const _axios = axios.create(config)

_axios.interceptors.response.use(req => req, err => {
    if (err.response.status === 302) {
        Router.push('/login')
        return new Promise(() => { })
    } else {
        return Promise.reject(err)
    }
})

export default {
    lGet: (url: string, params: object) => {
        return new Promise((resolve, reject) => {
            _axios.get(url, params).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    lPost: (url: string, params: object) => {
        return new Promise((resolve, reject) => {
            _axios.post(url, params).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    get: (url: string, params: object) => {
        const token = getCookie('token')
        let id: string = ''
        if (token) id = jwt.decode(token)['id']
        return new Promise((resolve, reject) => {
            _axios.get(url, {
                params: {
                    ...params,
                    id
                }, headers: {
                    'Authorization': token
                }
            }).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    post: (url: string, params: object) => {
        const token = getCookie('token')
        let id: string = ''
        if (token) id = jwt.decode(token)['id']
        return new Promise((resolve, reject) => {
            _axios.post(url, {
                ...params,
                id
            }, {
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
        const token = getCookie('token')
        if (token) form.append('id', jwt.decode(token)['id'])
        return new Promise((resolve, reject) => {
            _axios.post(url, form, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': token
                }
            }).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    }
}