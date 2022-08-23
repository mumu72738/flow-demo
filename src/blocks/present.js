import * as Blockly from 'blockly/core';

const page_var_set_json = {
    type: "page_var_set",
    message0: "set page var %1 to %2",
    args0: [
        {
            "type": "field_dropdown",
            "name": "PAGE_VAR",
            "options": [
                ["dialogVisible", "dialogVisible"],
                ["dataTable", "dataTable"]
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

Blockly.JavaScript["page_var_set"] = function (block) {
    const pageVar = block.getFieldValue('PAGE_VAR')
    const varInput = Blockly.JavaScript.valueToCode(
        block,
        "PAGE_VAR_INPUT",
        Blockly.JavaScript.ORDER_FUNCTION_CALL
    ) || "''";
    return "this." + pageVar + " = " + varInput;
};

const page_var_get_json = {
    type: "page_var_get",
    message0: "page var %1",
    args0: [
        {
            "type": "field_dropdown",
            "name": "PAGE_VAR",
            "options": [
                ["dialogVisible", "dialogVisible"],
                ["dataTable", "dataTable"]
            ]
        }
    ],
    output: null,
    colour: 160,
    tooltip: "Returns number of letters in the provided text.",
    helpUrl: "http://www.w3schools.com/jsref/jsref_length_string.asp",
};

Blockly.Blocks["page_var_get"] = {
    init: function () {
        this.jsonInit(page_var_get_json)
    },
};

Blockly.JavaScript["page_var_get"] = function (block) {
    const pageVar = block.getFieldValue('PAGE_VAR')
    return ["this." + pageVar, Blockly.JavaScript.ORDER_MEMBER];
};