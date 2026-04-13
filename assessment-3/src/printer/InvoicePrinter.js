class InvoicePrinter {
  constructor() {
    this.data = [];
  }

  add(invoice, cost) {
    this.data.push([invoice, cost]);
  }

  printAll() {
    for (let row of this.data) {
      const [invoice, cost] = row;
      console.log(
        "--------------------------------------------------------------------------------",
      );
      console.log(`Invoice for customer: ${invoice.customer}`);
      console.log(
        "--------------------------------------------------------------------------------",
      );
      console.log(`API Calls: ${invoice.apiCalls} -> $${cost.api}`);
      console.log(`Storage: ${invoice.storageGb} -> $${cost.storage}`);
      console.log(
        `Compute Time: ${invoice.computeMinutes} -> $${cost.compute}`,
      );
      console.log(
        "--------------------------------------------------------------------------------",
      );
      console.log(`Total Due: $${cost.api + cost.storage + cost.compute}`);
      console.log(
        "--------------------------------------------------------------------------------",
      );
    }
  }
}

module.exports = InvoicePrinter;
