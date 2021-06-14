import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'multistep',
            component: () => import('@/components/MultiStep.vue'), 
        },
        {
            path: '/complete',
            name: 'Complete',
            component: () => import('@/components/Complete.vue'),
        },
    ]
}); 

export default router;