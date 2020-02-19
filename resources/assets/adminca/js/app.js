/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
import moment from 'moment';

import VueProgressBar from 'vue-progressbar'
Vue.use(VueProgressBar, {
    color: 'rgb(143, 255, 199)',
    failedColor: 'red',
    height: '2px'
})

import Vue from 'vue';
import VueRouter from 'vue-router';
// Check error form
import { Form, HasError, AlertError } from 'vform';


// ES6 Modules or TypeScript
import Swal from 'sweetalert2';
window.Swal = Swal;
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    //timerProgressBar: true,
    // onOpen: (Toast) => {
    //     Toast.addEventListener('mouseenter', Swal.stopTimer)
    //     Toast.addEventListener('mouseleave', Swal.resumeTimer)
    // }
});
window.Toast = Toast;

window.Form = Form;
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

Vue.use(VueRouter)


let routes = [
    { path: '/adminca/dashboard', component: require('./components/dashboard/Dashboard.vue').default },
    { path: '/adminca/users', component: require('./components/Users.vue').default },
    { path: '/adminca/profile', component: require('./components/Profile.vue').default }
]

const router = new VueRouter({
    mode: 'history',
    routes // short for `routes: routes`
})

Vue.filter('upText', function(text) {
    return text.charAt(0).toUpperCase() + text.slice(1)
});

Vue.filter('myDate', function(created) {
    return moment(created).format('MMMM Do YYYY');
});



const app = new Vue({
    router
}).$mount('#app')