<template>
  <div>
    <h1>I'm a timeout machine</h1>
  </div>
</template>

<script>
import axios from "axios";
import { navigationTarget } from "../../shared";

export default {
  name: "TestTimeOut",
  data() {
    return {};
  },
  mounted() {
    this.run();
  },
  methods: {
    run() {
      this.apiCall()
        .then(this.updateUser)
        .catch((error) => {
          console.log(error);
        });
    },
    apiCall() {
      return axios.post("https://jsonplaceholder.typicode.com/posts", {
        title: "foo",
        body: "bar",
        userId: 1,
      });
    },
    updateUser() {
      setTimeout(() => {
        this.redirectSomeWhere();
      }, 4000);
    },
    redirectSomeWhere() {
      window.location.href = navigationTarget;
    },
  },
};
</script>
