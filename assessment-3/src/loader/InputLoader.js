"use strict";
const Ajv = require("ajv");
const ajv = new Ajv();
const fs = require("fs");

class InputLoader {
  static FATAL_ERROR = 5;
  constructor(filePath) {
    this.filePath = filePath;
  }

  async readFile(filePath) {
    return await fs.readFileSync(filePath, "utf-8");
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
      console.error(ajv.errors);
    }
  }

  get data() {
    if (this.json === undefined) {
      this.readFile(filePath)
        .then((data) => {
          const json = this.parseJSON(data);
          this.validateJSON(json);
          this.json = json;
        })
        .catch((err) => {
          console.error(err);
          process.exit(InputLoader.FATAL_ERROR);
        });
    }
    return this.json;
  }
}

module.exports = InputLoader;
