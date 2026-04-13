class Invoice {
  constructor(customer, apiCalls, storageGb, computeMinutes) {
    this.customer = customer;
    this.apiCalls = apiCalls ? Number(apiCalls) : 0;
    this.storageGb = storageGb ? Number(storageGb) : 0;
    this.computeMinutes = computeMinutes ? Number(computeMinutes) : 0;
  }
}

module.exports = Invoice;
