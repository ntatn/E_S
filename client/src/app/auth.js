import Vuex from 'vuex';
import { axiosbase, axiosdefault } from '@/interceptors/axios-base.js';
export default new Vuex.Store({
    state: {
        accessToken: localStorage.getItem('access_token'),
        isLoggedIn: false,
    },
    getters: {
        isLoggedIn: (state) => !!state.accessToken  
    },
    mutations: {
        updateLocalStorage (state, {access, userId, role}) {
            localStorage.setItem('access_token', access)
            localStorage.setItem('user_id', userId)
            state.accessToken = access
        },
        destroyToken(state) {
            
            localStorage.removeItem('access_token')
            localStorage.removeItem('user_id')
            state.userId = null
            state.accessToken = null
        },
    },
    actions: {
        registerUser (context, data) {
            return new Promise ((resolve, reject) =>{
                console.log(data)
                axiosbase.post('/user/signup', {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    level: data.level

                }).then(response =>{
                    resolve(response)
                }).catch(err =>{
                    reject(err)
                })
            })
        },
        loginUser(context, data){
            return new Promise((resolve, reject) =>{
                axiosbase.post('/user/login', {
                    email: data.email,
                    password: data.password
                })
                .then(response => {
                    context.commit('updateLocalStorage', {access: response.data.metadata.token.accessToken, userId: response.data.metadata.user._id})
                    resolve()
                })
                .catch(err =>{
                    reject(err)
                })
            })
        },
        logoutUser(context){
            if(context.getters.isLoggedIn){
                return new Promise((resolve, reject) =>{
                    axiosdefault.post('/user/logout')
                    .then(response => {
                        context.commit('destroyToken')
                        resolve(response)
                    })
                    .catch(err => {
                        reject(err)
                    })
                })
            }
        }
    }
})