import { createApp } from 'vue';
import './style.css';
import '@fontsource/space-grotesk/300.css';
import '@fontsource/space-grotesk/700.css';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
// import { VueRecaptchaPlugin } from 'vue-recaptcha-v3'; 


library.add(faGithub, faLinkedin);

import App from './App.vue';

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
