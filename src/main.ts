import { createApp } from 'vue'
import App from './App.vue'
import move from "@/directive/move";

const app = createApp(App)
app.directive('MadokaMove', move)


app.mount("#app");
