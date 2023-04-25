<template>
  <div>
    <button @click="fetch">Fetch</button>
    <span v-if="loading === false">
      {{ data.greeting }}
    </span>

    <span v-if="loading === true">Loading</span>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    url: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      data: null,
      loading: null,
    };
  },
  methods: {
    fetch() {
      this.loading = true;
      axios.get(this.url).then((response) => {
        this.data = response.data.data;
        this.loading = false;
      });
    },
  },
};
</script>
