<template>
  <div class="container">
    <div class="wrapper">
      <Options  @run-system="toggleSystem"  />
      <Display :runSystem="runSystemValue"  />
    </div>
  </div>
</template>

<script>
  import Options from './Options'
  import Display from './Display'

  export default {
    name: 'Wrapper',
    props: {
      msg: String
    },
    components: {
      Options,
      Display
    },
    data: () => ({
      runSystemValue: false,
      myBaby: 'is Fred'
    }),
    computed: {

    },
    methods: {

      toggleSystem(val) {
        this.runSystemValue = val
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .container {
    display: flex;
    justify-content: center;
  }

  .wrapper {
    /* display: flex; */
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
