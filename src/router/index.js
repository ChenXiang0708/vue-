import Vue from 'vue'
import Router from 'vue-router'

import index from '@/components/index'
import project from '@/components/project'
import pano from '@/components/pano'
import areaImg from '@/components/areaImg'
Vue.use(Router)

export default new Router({
  routes: [
    {


      path: '/',
      name: 'index',
      component: index,
      redirect: '/project',
      children: [
        {
          path: '/pano',
          name: 'pano',
          component: pano
        },
        {
          path: '/areaImg',
          name: 'areaImg',
          component: areaImg
        },
        {
          path: '/project',
          name: 'project',
          component: project
        },

      ]

    },

  ]
})
