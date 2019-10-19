<template>
  <div id="app">
    <Wrapper />
  </div>
</template>

<script>
import Wrapper from '@/components/Wrapper'

export default {
  name: 'app',
  components: {
    Wrapper
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
</style>
