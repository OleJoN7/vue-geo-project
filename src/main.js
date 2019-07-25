import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase";
import firebaseApp from "@/firebase/init";

Vue.config.productionTip = false;

let app = null;

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseApp);
}

firebase.auth().onAuthStateChanged(() => {
  //init app if not already created
  if (!app) {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
