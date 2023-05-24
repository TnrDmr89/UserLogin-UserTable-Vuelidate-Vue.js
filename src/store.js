import Vue from 'vue'
import Vuex from 'vuex'
import { router } from './routes'


Vue.use(Vuex)

export const store = new Vuex.Store({
    
    state:{
        users:[],
        clickUpdate:false,
    },
    getters:{
        getUser(state){
            return state.users
        },
        getClickUpdate(state){
            return state.clickUpdate;
        }
    },
    mutations:{
        saveUser(state,user){
            state.users.push(user);
            router.replace("/table")
        },
        updateUser(state,user){
            state.users[user.index] = user
            router.replace("/login")
            
            
        },
        deleteUser(state,index){
            state.users.splice(index,1)
        }
    },
    actions:{

    }
})