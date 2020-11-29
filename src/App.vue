<template>
  <div id="app">
    <ZApp>
      <Map />
      <AddDeleteBike />
    </ZApp>
  </div>
</template>

<script>
import Map from './components/Map.vue'
import AddDeleteBike from './components/AddDeleteBike.vue'

export default {
  name: 'App',
  components: {
    Map,
    AddDeleteBike
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
html {
  background: #a9b7c5;
}
</style>
