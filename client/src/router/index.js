import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import LogoutView from '../views/LogoutView.vue'
import LearningView from '../views/LearningView.vue'
import ProfileView from '../views/ProfileView.vue'
import LearnLesson from '../components/Topics/LearnLesson.vue'
import QuizView from '../views/QuizView.vue'
import ResultView from '../views/ResultView.vue'
import auth from '../app/auth.js'
import ContactUs from '../views/ContactUs.vue'

const ifNotAuthorized = (to, from, next) => {
  if(!auth.getters.isLoggedIn){
    next()
    return
  }
  next("/")
}
const ifAuthorized = (to, from, next) => {
  if(auth.getters.isLoggedIn){
    console.log(auth.getters.isLoggedIn)
    next()
    return
  }
  next("/login")
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/signup',
      name: 'register',
      component: RegisterView
    },  
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      beforeEnter: ifNotAuthorized
    },
    {
      path: '/logout',
      name: 'logout',
      component: LogoutView,
      beforeEnter: ifAuthorized
    },
    {
      path: '/learning',
      name: 'learn',
      component: LearningView
    },
    {
      path: '/learning/:id',
      name: 'learnLesson',
      props: true,
      component: LearnLesson,
      beforeEnter: ifAuthorized
    },
    {
      path: '/lesson/:id',
      name: 'Quiz',
      component: QuizView
    },
    {
      path: '/result/:id',
      name: 'result',
      component: ResultView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      beforeEnter: ifAuthorized
    },
    {
      path: '/contact-us',
      name: 'feedback',
      component: ContactUs,
      beforeEnter: ifAuthorized
    }
  ],
})

export default router
