
import { createRouter, createWebHistory } from 'vue-router'
import AppLocal    from "../components/AppLocal.vue";
import HelloWorld from "../components/HelloWorld.vue";
import IndexView from "@/VIew/IndexView.vue";
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [

        {

            path: '/',
            name: 'home',
            component: AppLocal,
            children: [
                {
                    path: '',
                    component: IndexView,
                },
                {
                    path: '/main',
                    name: 'main',
                    component:HelloWorld,
                },
                {
                    path: '/about',
                    name: 'about',
                    component: () => import('../components/TheWelcome.vue')
                },
                {
                    path:'/Dingdan',
                    name:'Dingdan',
                    component:()=>import('../components/Dingdan.vue'),
                },
                {
                    path:'/test',
                    name:'test',
                    component:()=>import('../components/test.vue'),
                },
                {
                    path:'/Orde',
                    name:'Orde',
                    component:()=>import('../components/Orde.vue'),
                },
                {
                    path:'/Script',
                    name:'Script',
                    component:()=>import('../components/Script.vue'),

                },
                {
                    path:'/Process',
                    name:'Process',
                    component:()=>import('../components/Process.vue'),
                },
                {
                    path:'/Show',
                    name:'Show',
                    component:()=>import('../components/Show.vue'),
                }
            ],



        },
        {


            path: '/Login',
            name: 'login',
               component: () => import('../components/LoginView.vue')

        }

    ]
})



export default router
