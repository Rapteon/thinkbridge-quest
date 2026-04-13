const Cost = require("../Cost");

const API_COSTING = {
  less_than_10k: 0.01,
  above_10k: 0.008,
};

// Per GB costing.
const STORAGE_COSTING = 0.25;

// per minute costing
const COMPUTE_COSTING = 0.05;

class InvoiceCalculator {
  static calculate(apiCalls, storageInGB, computeMinutes) {
    let cost = new Cost();
    if (apiCalls > 10000) {
      cost.api = apiCalls * API_COSTING["above_10k"];
    } else {
      cost.api = apiCalls * API_COSTING["less_than_10k"];
    }

    cost.storage = storageInGB * STORAGE_COSTING;

    cost.compute = computeMinutes * COMPUTE_COSTING;
    return cost;
  }
}

module.exports = InvoiceCalculator;
