<template>
  <div id="app">
    <BlocklyComponent id="blockly1" style="display:none">
      <category name="Controls">
        <block type="controls_ifelse"></block>
        <block type="controls_repeat_ext">
          <value name="TIMES">
              <shadow type="math_number">
                  <field name="NUM">10</field>
              </shadow>
          </value>
        </block>
      </category>
      <category name="逻辑">
        <block type="logic_compare"></block>
        <block type="logic_operation"></block>
        <block type="logic_operation"></block>
        <block type="logic_negate"></block>
        <block type="logic_boolean"></block>
        <block type="logic_null" disabled="true"></block>
        <block type="logic_ternary"></block>
      </category>
      <category name="Text">
        <block type="text_charAt">
          <value name="VALUE">
              <block type="variables_get">
                  <field name="VAR">text</field>
              </block>
          </value>
        </block>
      </category>
      <category name="Variables" custom="VARIABLE" colour="%{BKY_VARIABLES_HUE}">
      </category>
      <category name="Custom">
        <block type="string_length"></block>
      </category>
    </BlocklyComponent>

    <BlocklyComponent id="blockly2" :options="options" ref="foo"></BlocklyComponent>
    <p id="code">
      <button v-on:click="showCode()">Show JavaScript</button>
      <button v-on:click="showXml()">Show Xml</button>
      <button v-on:click="change1()">Change1</button>
      <button v-on:click="change2()">Change2</button>
      <pre v-html="code"></pre>
    </p>
  </div>
</template>

<script>
import BlocklyComponent from "../components/BlocklyComponent.vue";
import "../blocks/stocks";
import "../blocks/present";


import BlocklyJS from "blockly/javascript";
import Blockly from "blockly";

export default {
  name: "app",
  components: {
    BlocklyComponent,
  },
  data() {
    return {
      code: "",
      options: {
        media: "media/",
        grid: {
          spacing: 25,
          length: 3,
          colour: "#ccc",
          snap: true,
        },
        toolbox: `<xml>
          <category name="Logic" colour="%{BKY_LOGIC_HUE}">
            <block type="controls_if"></block>
            <block type="logic_compare"></block>
            <block type="logic_operation"></block>
            <block type="logic_negate"></block>
            <block type="logic_boolean"></block>
          </category>
          <category name="Loops" colour="%{BKY_LOOPS_HUE}">
            <block type="controls_repeat_ext">
              <value name="TIMES">
                <block type="math_number">
                  <field name="NUM">10</field>
                </block>
              </value>
            </block>
            <block type="controls_whileUntil"></block>
          </category>
          <category name="Math" colour="%{BKY_MATH_HUE}">
            <block type="math_number">
              <field name="NUM">123</field>
            </block>
            <block type="math_arithmetic"></block>
            <block type="math_single"></block>
          </category>
          <category name="Text" colour="%{BKY_TEXTS_HUE}">
            <block type="text"></block>
            <block type="text_length"></block>
            <block type="text_print"></block>
            <block type="variables_get"></block>
            <block type="variables_set"></block>
          </category>
          <category name="Variables" custom="VARIABLE" colour="%{BKY_VARIABLES_HUE}">
          </category>
          <category name="Stocks" colour="%{BKY_LOOPS_HUE}">
            <block type="stock_buy_simple"></block>
            <block type="stock_buy_prog"></block>
            <block type="stock_fetch_price"></block>
          </category>
          <category name="Custom">
            <block type="string_length"></block>
            <block type="text_charAt">
              <value name="VALUE">
                  <block type="variables_get">
                      <field name="VAR">text</field>
                  </block>
              </value>
            </block>
            <block type="stock_buy_simple"></block>
            <block type="page_var_set"></block>
            <block type="page_var_get"></block>
          </category>
          <category name="Functions" custom="PROCEDURE"></category>
        </xml>`,
      },
    };
  },
  methods: {
    showCode() {
      this.code = BlocklyJS.workspaceToCode(this.$refs["foo"].workspace);
    },
    showXml() {
      let xml = Blockly.Xml.workspaceToDom(this.$refs["foo"].workspace);
      let txt = Blockly.Xml.domToPrettyText(xml);
      console.log(xml);
      console.log(txt);

      let ws = new Blockly.Workspace();
      Blockly.Xml.domToWorkspace(xml, ws);
      console.log(ws);
      console.log("js: " + BlocklyJS.workspaceToCode(ws));
    },
    change1() {
      const page_var_set_json = {
        type: "page_var_set",
        message0: "set page var %1 to %2",
        args0: [
          {
            "type": "field_dropdown",
            "name": "PAGE_VAR",
            "options": [
              ["dialogVisible", "dialogVisible"],
              ["dataTable", "dataTable"],
              ["dataTable3", "dataTable3"]
            ]
          },
          {
            "type": "input_value",
            "name": "PAGE_VAR_INPUT"
          }
        ],
        previousStatement: null,
        nextStatement: null,
        colour: 160,
        tooltip: "Returns number of letters in the provided text.",
        helpUrl: "http://www.w3schools.com/jsref/jsref_length_string.asp",
      };

      Blockly.Blocks["page_var_set"] = {
        init: function () {
          this.jsonInit(page_var_set_json)
        },
      };
    }
  },
  mounted() {
    Blockly.Blocks["string_length"] = {
      init: function () {
        this.appendValueInput("VALUE")
          .setCheck("String")
          .appendField("length of");
        this.setOutput(true, "Number");
        this.setColour(160);
        this.setTooltip("Returns number of letters in the provided text.");
        this.setHelpUrl(
          "http://www.w3schools.com/jsref/jsref_length_string.asp"
        );
      },
    };

    Blockly.JavaScript["string_length"] = function (block) {
      var argument0 =
        Blockly.JavaScript.valueToCode(
          block,
          "VALUE",
          Blockly.JavaScript.ORDER_FUNCTION_CALL
        ) || "''";
      return [argument0 + ".length", Blockly.JavaScript.ORDER_MEMBER];
    };
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

html,
body {
  margin: 0;
}

#code {
  position: absolute;
  right: 0;
  top: 0;
  width: 50%;
  height: 100%;
  margin: 0;
  background-color: beige;
}

#blockly1 {
  position: absolute;
  right: 0;
  top: 0;
  width: 50%;
  height: 50%;
}

#blockly2 {
  position: absolute;
  left: 0;
  top: 0;
  width: 50%;
  height: 100%;
}
</style>
