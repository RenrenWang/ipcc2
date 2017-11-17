import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/containers/Home/Home'
import Recruit from '@/containers/Recruit/Recruit'
import RecruitD from '@/containers/Recruit/RecruitD'
import RecruitPost from '@/containers/Recruit/RecruitPost'
import Resume from '@/containers/Resume/Resume'
import ResumeD from '@/containers/Resume/ResumeD'
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
    },
     {
      path: '/recruitpost',
      name: 'RecruitPost',
      component: RecruitPost
    },
    {
      path: '/resume',
      name: 'Resume',
      component: Resume
    },
    {
      path: '/resumed',
      name: 'ResumeD',
      component: ResumeD
    }


  ]
})
