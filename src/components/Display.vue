<template>
  <div>
    <canvas id="canvas" ref="display-canvas" width="700" height="1000"/>
  </div>
</template>

<script>

  import System, {Agent} from 'basic-system'
  import {mapState} from 'vuex'

  export default {
    name: 'Display',
    methods: {
      displayAgent(agent) {
        const {ctx} = this.provider

        if (agent.type === 0) {
          ctx.fillStyle = 'orange';
        } else if (agent.type === 1) {
          ctx.fillStyle = 'lightBlue';
        }

        ctx.fillRect((agent.x * 5), (agent.y * 5), 5, 5);
        ctx.fill()
      },

      startSystem() {
        this.currentInterval = setInterval(() => {
          this.system.runTick()
          this.system.display()
        }, 100);
      },

      stopSystem() {
        clearInterval(this.currentInterval)
      },

      updateCanvas() {

        const {width, height} = this.$refs['display-canvas']
        const {ctx} = this.provider

        ctx.clearRect(0, 0, width, height)
        ctx.stroke();
      }
    },

    data () {
      return {
        system: null,
        height: 100,
        currentInterval: null,
        provider: {
          ctx: null
        }
      }
    },

    computed: {
      ...mapState({runSystem: 'systemRunValue', rules: 'rules'})
    },

    watch: {
      runSystem: function() {
        this.runSystem ? this.startSystem() : this.stopSystem()
      },
      
      rules: function() {
        const rules = (agent, grid, neighborhood) => {
          const {nw, n, ne} = neighborhood
          const result = `${nw.type}${n.type}${ne.type}`
          agent.type = this.rules[result]
        }

        this.system.setAgentRules(rules)
      }
    },

    mounted() {
      this.provider.ctx = this.$refs['display-canvas'].getContext('2d')

      const sys = new System(200, 200)
      const rules = (agent, grid, neighborhood) => {
        const {nw, n, ne} = neighborhood
        const result = `${nw.type}${n.type}${ne.type}`
        agent.type = this.rules[result]
      }

      sys.initGrid()
      sys.setInGrid(((700/2)/5), 0, new Agent(1, ((700/2)/5), 0))
      sys.setAgentDisplay(this.displayAgent)
      sys.setAgentRules(rules)
      sys.display()

      this.system = sys
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
