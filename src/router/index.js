import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/containers/Home/Home'
import Recruit from '@/containers/Recruit/Recruit'
import RecruitD from '@/containers/Recruit/RecruitD'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
     {
      path: '/recruit',
      name: 'Recruit',
      component: Recruit
    },
     {
      path: '/recruitD',
      name: 'RecruitD',
      component: RecruitD
    }

  ]
})
