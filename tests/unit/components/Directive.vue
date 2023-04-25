<template>
  <div>
    <p v-uppercase="text" />
  </div>
</template>

<script>
export default {
  name: "TestDirective",
  data() {
    return {
      text: "example text",
    };
  },
};
</script>
