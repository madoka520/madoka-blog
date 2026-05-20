import { createApp } from 'vue'
import App from './App.vue'
import move from "@/directive/move";
import router from "@/router";

const app = createApp(App)
app.use(router)
app.directive('MadokaMove', move)


app.mount("#app");
