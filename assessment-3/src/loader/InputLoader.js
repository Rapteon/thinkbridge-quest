"use strict";
const Ajv = require("ajv");
const ajv = new Ajv();
const fs = require("fs");

class InputLoader {
  static FATAL_ERROR = 5;
  constructor(filePath) {
    this.fileData = fs.readFileSync(filePath, "utf-8");
  }

  json() {
    const json = this.parseJSON(this.fileData);
    this.validateJSON(json);
    return json;
  }

  parseJSON(fileContents) {
    const json = JSON.parse(fileContents);
    return json;
  }

  validateJSON(json) {
    const schema = {
      type: "array",
      items: {
        type: "object",
        properties: {
          CustomerId: { type: "string" },
          API_Calls: { type: "number" },
          Storage_GB: { type: "number" },
          Compute_Minutes: { type: "number" },
        },
        required: ["CustomerId", "API_Calls", "Storage_GB", "Compute_Minutes"],
        additionalProperties: false,
      },
    };

    const valid = ajv.validate(schema, json);
    if (!valid) {
      console.log("Encountered the following errors when reading the file.");
      console.error(ajv.errors);
      json["errorIndices"] = new Set();
      for (let err of ajv.errors) {
        const errIdx = err["instancePath"].split("/")[1];
        json["errorIndices"].add(Number(errIdx));
      }
    }
  }
}

module.exports = InputLoader;
