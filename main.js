const {crawlPage} = require("./crawl.js")

const main = () => {
  if (process.argv.length < 3) {
    console.log("no website provided");
    process.exit(1);
  }

  if (process.argv.length > 3) {
    console.log("Too many CLI args");
    process.exit(1);
  }
  const baseUrl = process.argv[2];

  console.log(`starting crawl of ${baseUrl}`);
  crawlPage(baseUrl)
};

main();
