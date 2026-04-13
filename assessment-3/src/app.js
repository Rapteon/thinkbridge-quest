const InputLoader = require("./loader/InputLoader");

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

const loader = new InputLoader(process.argv[2]);
console.log(loader.json);
