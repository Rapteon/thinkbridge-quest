const InputLoader = require("./loader/InputLoader");
const InvoiceCalculator = require("./calculator/InvoiceCalculator");
const InvoicePrinter = require("./printer/InvoicePrinter");
const Invoice = require("./Invoice");

const args = process.argv;

const INVALID_ARG_EXIT_CODE = 9;

function printUsage() {
  console.log("Usage:");
  console.log(`node ${process.argv[0]} <pathToJSONFile>`);
}

if (args.length != 3) {
  printUsage();
  process.exit(INVALID_ARG_EXIT_CODE);
}

const printer = new InvoicePrinter();
const loader = new InputLoader(process.argv[2]);
// Because I know the JSON has an array.
const jsonArr = loader.json();

jsonArr.forEach((row, idx) => {
  if (jsonArr["errorIndices"].has(idx)) {
    console.log(`RowIdx:${idx} has errors`);
  } else {
    const i = new Invoice(
      row["CustomerId"],
      row["API_Calls"],
      row["Storage_GB"],
      row["Compute_Minutes"],
    );
    const cost = InvoiceCalculator.calculate(
      i.apiCalls,
      i.storageGb,
      i.computeMinutes,
    );
    printer.add(i, cost);
  }
  printer.printAll();
});
