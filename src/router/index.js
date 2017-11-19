import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HomeF from '@/containers/Home/HomeF'
import HomeS from '@/containers/Home/HomeS'
import Recruit from '@/containers/Recruit/Recruit'
import RecruitD from '@/containers/Recruit/RecruitD'
import RecruitPost from '@/containers/Recruit/RecruitPost'
import RecruitShow from '@/containers/Recruit/RecruitShow'
import Resume from '@/containers/Resume/Resume'
import ResumeD from '@/containers/Resume/ResumeD'
import ResumePost from '@/containers/Resume/ResumePost'
import BuyResume from '@/containers/Resume/BuyResume'
import MyInfo from '@/containers/MyInfo/MyInfo'
import PhoneNumber from '@/containers/MyInfo/PhoneNumber'
import TradeList from '@/containers/MyInfo/TradeList'
import About from '@/containers/MyInfo/About'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomeF',
      component: HomeF
    },
    {
      path: '/HomeS',
      name: 'HomeS',
      component: HomeS
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
    },
    {
      path: '/ResumePost',
      name: 'ResumePost',
      component: ResumePost
    },
    {
      path: '/RecruitShow',
      name: 'RecruitShow',
      component: RecruitShow
    },
    {
      path: '/MyInfo',
      name: 'MyInfo',
      component: MyInfo
    },
    {
      path: '/PhoneNumber',
      name: 'PhoneNumber',
      component: PhoneNumber
    },
    {
      path: '/TradeList',
      name: 'TradeList',
      component: TradeList
    },
    {
      path: '/BuyResume',
      name: 'BuyResume',
      component: BuyResume
    },
    {
      path: '/About',
      name: 'About',
      component: About
    }
    
    
  ]
})
