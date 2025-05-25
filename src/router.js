import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './components/HomePage.vue';
import AboutPage from './components/AboutPage.vue';
import ContactPage from './components/ContactPage.vue';
import ApplicantList from './components/ApplicantList.vue';
import VacancyList from './components/VacancyList.vue';
import LoginPage from './components/LoginPage.vue';
import RegisterPage from './components/RegisterPage.vue';
import ViewApplicant from './components/ViewApplicant.vue';
import ViewVacancy from './components/ViewVacancy.vue';

const routes = [
  { path: '/', component: HomePage },          
  { path: '/about', component: AboutPage },    
  { path: '/contact', component: ContactPage },
  { path: '/applicants', component: ApplicantList },
  { path: '/vacancies', component: VacancyList },
  { path: '/login', component: LoginPage },    
  { path: '/register', component: RegisterPage }, 
  { path: '/view-applicants/:id', component: ViewApplicant },
  { path: '/view-vacancies/:id', component: ViewVacancy },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;