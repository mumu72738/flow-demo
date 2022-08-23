<!--
 * @Descripttion: 
 * @version: 
 * @Author: xuxinyu
 * @Date: 2022-08-16 14:40:35
 * @LastEditors: xuxinyu
 * @LastEditTime: 2022-08-16 16:45:07
-->
<template>
  <div>
    <div class="blocklyDiv" ref="blocklyDiv"></div>
  </div>
</template>

<script>
import Blockly from 'blockly';

export default {
  name: 'BlocklyComponent',
  props: ['options'],
  data() {
    return {
      workspace: null
    }
  },
  mounted() {
    var options = this.$props.options || {};
    if (!options.toolbox) {
      options.toolbox = this.$refs["blocklyToolbox"];
    }
    this.workspace = Blockly.inject(this.$refs["blocklyDiv"], options);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.blocklyDiv {
  height: 100%;
  width: 100%;
  text-align: left;
}
</style>
