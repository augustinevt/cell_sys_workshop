<template>
  <div class="container">
    <div class="versionTag">alpha 1.0.3</div>
    <div class="wrapper">
      <Options/>
      <Display/>
    </div>
  </div>
</template>

<script>
  import Options from './Options'
  import Display from './Display'

  export default {
    name: 'Wrapper',
    components: {
      Options,
      Display
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .container {
    display: flex;
    justify-content: center;
  }

  .versionTag {
    position: absolute;
    top: 20px;
    left: 20px;
  }

  .wrapper {
    width: 700px;
  }

  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
