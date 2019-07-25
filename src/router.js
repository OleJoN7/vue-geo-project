import Vue from "vue";
import Router from "vue-router";
import Map from "./views/Map.vue";
import firebase from "firebase";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Map",
      component: Map,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/profile/:id",
      name: "Profile",
      component: () => import("./views/Profile.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/signup",
      name: "Signup",
      component: () => import("./views/auth/Signup.vue")
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("./views/auth/Login.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  //check to see if routes requires auth
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // check auth state of user
    let user = firebase.auth().currentUser;
    if (user) {
      next();
    } else {
      //no use sighned in
      next({ name: "Login" });
    }
  } else {
    next();
  }
});

export default router;
