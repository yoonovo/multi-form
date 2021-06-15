<template>
  <router-view />
</template>

<script>

export default {
  name: 'App',
  components: {}
}
</script>

<style>
* { margin: 0; padding: 0; }
html, 
body {
  display: block;
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-items: center;
}
</style>
