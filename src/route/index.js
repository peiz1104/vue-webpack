import Vue from 'vue';
import Router from 'vue-router';
import ReportTemplate from '@/views/report-template/report-template.vue';

Vue.use(Router);

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      { path: '/', component: ReportTemplate },
      { path: '/reporttemplate', component: ReportTemplate },
      { path: '*', redirect: '/reporttemplate' }
    ]
  });
}