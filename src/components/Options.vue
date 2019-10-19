<template>
  <div class="container">
    <div class="button" @click="onStart">
      {{runSystemValue ?  '&#10074;&#10074;' : '&#9658;'}}
    </div>
    <div class='ruleEditorWrapper'>
      <div class="" v-for="(value, key) in rules" :key='key'>

        <div class="ruleboxes">
          <div class="rulebox" v-bind:class="{ 'empty' : (val === '0') }" v-for="val in key.split('')" :key='val'/>
        </div>
        <div class="ruleCheckWrapper" @click="onRuleButtonClick" :id='key'>
          <div class="rulecheck" v-bind:class="{ 'empty' : value === 0 }"/>
        </div>

      </div>
    </div>
  </div>
</template>

<script>

  import {mapState, mapActions} from 'vuex'

  export default {
    name: 'Options',
    data: () => ({

    }),

    computed: {
      ...mapState({runSystemValue: 'systemRunValue', rules: 'rules'})
    },

    methods: {
      ...mapActions([
        'toggleSystemRunState',
        'toggleRuleButton'
      ]),
      onRuleButtonClick(e) {

        this.toggleRuleButton({id: e.currentTarget.id})
      },
      onStart() {

        this.toggleSystemRunState()
        // this.$emit('run-system', !this.runSystemValue)
        // this.runSystemValue = !this.runSystemValue
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 30px;
  }

  .ruleEditorWrapper {
    display: flex;
    justify-content: center;
  }

  .button {
    border: solid;
    width: 100%;
    /* padding: 12px; */
    font-size: 1.8rem;
  }

  .rulebox {
    border: solid;
    background: black;
    margin: 2px;
    width: 12px;
    height: 12px;
  }

  .ruleCheckWrapper {
    display: flex;
    justify-content: center;
  }

  .rulecheck {
    border: solid;
    background: black;
    cursor: pointer;
    margin: 2px;
    width: 12px;
    height: 12px;
  }

  .empty {
    background: white;
    border: solid;
  }

  .rulecheck:hover {
    color: grey;
  }

  .ruleboxes {
    display: flex;
    margin: 8px;
    /* border: solid; */
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
