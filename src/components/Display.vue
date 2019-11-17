<template>
  <div>
    <canvas
      class="canvas"
      id="canvas"
      @click="click"
      ref="display-canvas"
      :width="this.columns * this.scale"
      :height="this.scale*4"
    />
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'

  export default {
    name: 'Display',
    methods: {
      ...mapActions([
        'setSystem',
      ]),
      displayAgent(agent) {
        const {ctx} = this.provider

        if (agent.type === 0) {
          ctx.fillStyle = 'orange';
        } else if (agent.type === 1) {
          ctx.fillStyle = 'lightBlue';
        }

        ctx.fillRect(
          (agent.x * this.scale),
          (agent.y * this.scale),
          this.scale,
          this.scale
        );

        ctx.fill()
      },

      startSystem() {
        this.currentInterval = setInterval(() => {
          this.$refs['display-canvas'].height += this.scale
          this.system.runTick()
          this.system.display()
        }, 100);
      },

      stopSystem() {
        clearInterval(this.currentInterval)
      },

      clearCanvas() {
        const {width, height} = this.$refs['display-canvas']
        const {ctx} = this.provider

        ctx.clearRect(0, 0, width, height)
        ctx.stroke();
      },

      click(e) {
        const {top, left} = e.target.getBoundingClientRect()
        const { clientX, clientY } = e
        const gridX = Math.floor((clientX - left)/this.scale)
        const gridY = Math.floor((clientY - top)/this.scale)
        const clickedAgent = this.system.getInGrid(gridX, gridY)


        if (clickedAgent) {
          if (clickedAgent.type === 0) {
            clickedAgent.type = 1
          } else {
            clickedAgent.type = 0
          }
          this.system.display()
        }
      }
    },

    data () {
      return {
        // system: null,
        canvasHeight: 10,
        currentInterval: null,
        provider: {
          ctx: null
        }
      }
    },

    computed: {
      ...mapState({
        runSystem: 'systemRunValue',
        rules: 'rules',
        scale: 'scale',
        columns: 'columns',
        system: 'system'
      })
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
      this.setSystem({displayAgent: this.displayAgent, clearCanvas: this.clearCanvas})
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .canvas {
    cursor: pointer;
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
