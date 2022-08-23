<!--
 * @Descripttion: 
 * @version: 
 * @Author: xuxinyu
 * @Date: 2022-08-12 15:43:08
 * @LastEditors: xuxinyu
 * @LastEditTime: 2022-08-16 17:30:37
-->

<template>
  <div class="vue-flow-content">
    <Space wrap>
      <!-- <Button type="info" @click="resetTransform">重置</Button>
      <Button type="info" @click="updatePos">修改属性</Button>
      <Button type="info" @click="toggleclass">修改样式</Button>
      <Button type="info" @click="logToObject">查看属性</Button> -->
    </Space>
    <VueFlow v-model="messList" class="vue-flow-content">
      <Background />
      <MiniMap />
      <Controls />
    </VueFlow>
  </div>
</template>
<script lang="ts" setup>
import ButtonCounter from "../page/index.vue";
import type { AppContext } from "@netless/window-manager";
import Blockly from "blockly";
import * as Ch from "blockly/msg/zh-hans";
import "@braks/vue-flow/dist/style.css";
import "@braks/vue-flow/dist/theme-default.css";
//根据使用情况，引入相关组件
import type { Elements } from "@braks/vue-flow";
import {
  Background,
  Controls,
  MiniMap,
  VueFlow,
  isNode,
  useVueFlow,
} from "@braks/vue-flow";

import { computed, inject, onMounted, ref, reactive, watchEffect } from "vue";

const elementsDefault = [
  {
    id: "1",
    type: "input",
    label: "Node 1",
    position: { x: 250, y: 5 },
    class: "node-light",
  },
  {
    id: "2",
    label: "Node 2",
    position: { x: 100, y: 100 },
    class: "node-light",
  },
  {
    id: "3",
    label: "Node 3",
    position: { x: 400, y: 100 },
    class: "node-light",
  },
  {
    id: "4",
    label: "Node 4",
    position: { x: 400, y: 200 },
    class: "node-light",
  },
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e1-3", source: "1", target: "3" },
];

const elements = ref<Elements>(elementsDefault);

const context = inject<AppContext>("context");
if (!context) throw new Error("must call provide('context') before mount App");

const storage = context.createStorage("mess-list", { arr: elementsDefault });

const messList = ref(storage.state.arr);


const {
  onPaneReady,
  onNodeDragStop,
  onConnect,
  addEdges,
  setTransform,
  toObject,
} = useVueFlow({
  defaultZoom: 1.5,
  minZoom: 0.2,
  maxZoom: 4,
});

onPaneReady(({ fitView }) => {
  fitView();
});
onNodeDragStop((e) => 
{
  
  storage.setState({arr:messList.value});
}
);
onConnect((params) => 
{
  addEdges([params])
  storage.setState({arr:messList.value});
}

);

const updatePos = () => {
  elements.value.forEach((el) => {
    if (isNode(el)) {
      el.position = {
        x: Math.random() * 400,
        y: Math.random() * 400,
      };
    }
  });
};

onMounted(() => {
  storage.addStateChangedListener(() => {
    messList.value = storage.state.arr;
  });
});

watchEffect(() => {
 
});
</script>

<style scoped>
.vue-flow-content {
  width: 800px;
  height: 500px;
}
</style>