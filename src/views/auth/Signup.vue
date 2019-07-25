<template>
  <div class="signup container">
    <form v-on:submit.prevent="signUp" class="card-panel">
      <h2 class="center deep-purple-text">Sign Up</h2>
      <div class="field">
        <label for="email">Email:</label>
        <input type="email" name="email" v-model="email" />
      </div>
      <div class="field">
        <label for="password">Password:</label>
        <input type="password" name="password" v-model="password" />
      </div>
      <div class="field">
        <label for="alias">Alias:</label>
        <input type="text" name="alias" v-model="alias" />
      </div>
      <p v-if="feedback" class="red-text center">{{feedback}}</p>
      <div class="field center">
        <button class="btn deep-purple">Signup</button>
      </div>
    </form>
  </div>
</template>

<script>
import slugify from "slugify";
import db from "@/firebase/init";
import firebase from "firebase";
export default {
  name: "Signup",
  data() {
    return {
      email: null,
      password: null,
      alias: null,
      feedback: null,
      slug: null
    };
  },
  methods: {
    signUp() {
      if (this.alias && this.email && this.password) {
        this.slug = slugify(this.alias, {
          replacement: "-",
          remove: /[$*+~.()'"!\-:@]/g,
          lower: true
        });
        let ref = db.collection("users").doc(this.slug);
        ref.get().then(doc => {
          if (doc.exists) {
            this.feedback = "This alias already exists";
          } else {
            firebase
              .auth()
              .createUserWithEmailAndPassword(this.email, this.password)
              .then(cred => {
                 ref.set({
                     alias: this.alias.charAt(0).toUpperCase() + this.alias.slice(1),
                     geolocation:null,
                     user_id:cred.user.uid
                 })
              }).then(() => this.$router.push({name:"Map"}))
              .catch(err => {
                console.log(err);
                this.feedback = err.message;
              });
            this.feedback = "This alias is free to use";
          }
        });
      } else {
        this.feedback = "You must enter all fields";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.signup {
  max-width: 400px;
  margin-top: 60px;
  h2 {
    font-size: 2.4em;
  }
  .field {
    margin-bottom: 16px;
  }
}
</style>

