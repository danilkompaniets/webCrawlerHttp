const { crawlPage } = require("./crawl.js");

const main = async () => {
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
  const pages = crawlPage(baseUrl, baseUrl, {});
  for (const page of Object.entries(pages)) {
    console.log(page);
  }
};

main();
