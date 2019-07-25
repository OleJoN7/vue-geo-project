<template>
  <div class="navbar">
    <nav class="deep-purple darken-1">
      <div class="container">
        <router-link class="brand-logo left" :to="{name:'Map'}">
          <div class="img-container">
            <img src="../assets/logo.png" alt="logo" />
            <h3>Geo</h3>
          </div>
        </router-link>
        <ul class="right">
          <li v-if="!user">
            <router-link :to="{name:'Signup'}">Sign Up</router-link>
          </li>
          <li v-if="!user">
            <router-link v-bind:to="{name:'Login'}">Login</router-link>
          </li>
          <li v-if="user">{{user.email}}</li>
          <li v-if="user">
            <a @click="logout">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Navbar",
  data() {
    return {
      user: null
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "Login" });
        });
    }
  },
  created() {
    let user = firebase.auth().currentUser;
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.img-container {
  display: flex;
  align-items: center;
  margin-top: 5px;
  width: 50px;
  height: 50px;
  h3 {
    margin: 0;
    font-size: 20px;
    font-weight: bold;
    font-style: italic;
  }
  img {
    width: 100%;
    height: auto;
  }
}
</style>
