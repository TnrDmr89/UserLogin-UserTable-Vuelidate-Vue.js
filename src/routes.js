import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from './components/Login'
import Table from './components/Table'

Vue.use(VueRouter)

export const router = new VueRouter({
    routes:[
        {path:"/login", component:Login, name:"kayıt"},
        {path:"/table", component:Table, name:"tablo"}
    ],
    mode:"history"
})