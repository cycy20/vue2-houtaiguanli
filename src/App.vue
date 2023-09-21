<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      input: "",
    };
  },
};
</script>

<style lang="less">
html,
body,
h3,
p {
  padding: 0;
  margin: 0;
}
</style>
