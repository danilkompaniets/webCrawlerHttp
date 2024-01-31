const { JSDOM } = require("jsdom");

const crawlPage = async (currentUrl) => {
  console.log(`actively crawling on: ${currentUrl}`);

  const resp = await fetch(currentUrl);
  if (resp.status > 399) {
    console.log("error in fetch with status code: ", resp.status);
  }
  const contentType = resp.headers.get("content-type");
  if (!contentType.includes("text/html")) {
    console.log("no html detected in response");
    return;
  }
};

const getUrlsFromHtml = (htmlBody, baseURL) => {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll("a");
  for (const linkElement of linkElements) {
    if (linkElement.href.slice(0, 1) === "/") {
      // relative
      try {
        link = new URL(`${baseURL}${linkElement.href}`);
        urls.push(link.href);
      } catch (err) {
        console.log("error with relative url: ", err);
      }
    } else {
      // absolute
      try {
        link = new URL(`${linkElement.href}`);
        urls.push(link.href);
      } catch (err) {
        console.log("error with absolute url: ", err);
      }
    }
  }
  return urls;
};

const normalizeUrl = (urlString) => {
  const urlObj = new URL(urlString);
  const hostpath = `${urlObj.hostname}${urlObj.pathname}`;
  if (hostpath.length > 0 && hostpath.slice(-1) === "/") {
    return hostpath.slice(0, -1);
  }
  return hostpath;
};

module.exports = {
  normalizeUrl,
  getUrlsFromHtml,
  crawlPage,
};
