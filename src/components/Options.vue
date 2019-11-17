<template>
  <div class="container">
    <div class="ruleName"> Rule {{ruleName}} </div>
    <div class="buttons">
        <div class="button" @click="onStart">
          {{runSystemValue ?  '&#10074;&#10074;' : '&#9658;'}}
        </div>
        <div class="button reset" @click="onClear">
          &#215;
        </div>
      </div>
    <div class='ruleEditorWrapper'>
      <div
        class="boxContainer"
        v-for="(key) in buttonOrder"
        :key="key + '-boxContainer'">

        <div class="ruleboxes">
          <div
            class="rulebox"
            v-bind:class="{ 'empty' : (val === '0') }"
            v-for="(val,j) in key.split('')"
            :key='val + j +"-ruleBox"'/>
        </div>
        <div class="ruleCheckWrapper" @click="onRuleButtonClick" :id="key">
          <div class="rulecheck" v-bind:class="{ 'empty' : rules[key] === 0 }"/>
        </div>

      </div>
    </div>
  </div>
</template>

<script>

  import {mapState, mapActions} from 'vuex'

  export default {
    name: 'Options',
    data: () => {
      return {
        buttonOrder: ['111', '110','101', '100', '011', '010', '001', '000']
      }
    },
    computed: {
      ...mapState({
        runSystemValue: 'systemRunValue',
        rules: 'rules',
        system: 'system'
      }),
      ruleName: function() {
        let binaryString = ''
        this.buttonOrder.forEach((key) => {
          binaryString += this.rules[key]
        })

        return parseInt(binaryString,2)
      }
    },
    methods: {
      ...mapActions([
        'toggleSystemRunState',
        'toggleRuleButton',
        'resetSystem'
      ]),
      onRuleButtonClick(e) {
        this.toggleRuleButton({id: e.currentTarget.id})
      },
      onStart() {
        this.toggleSystemRunState()
      },
      onClear() {
        this.resetSystem()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .ruleName {
    padding: 20px;
    font-weight: bold;
  }



  .container {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 30px;
  }

  .ruleEditorWrapper {
    display: flex;
    justify-content: center;
  }

  .buttons {
    display: flex;
    color: black;
    width: 100%;
    font-size: 1.8rem;
    cursor: pointer;
  }

  .button {
    border: solid;
    color: black;
    width: 100%;
    font-size: 1.8rem;
  }

  .reset {
    width: 8%;
    border-left: none;
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
