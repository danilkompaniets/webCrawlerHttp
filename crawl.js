const { JSDOM } = require("jsdom");

async function crawlPage(baseUrl, currentUrl, pages) {
  console.log("actively crawling: ", currentUrl);

  const baseUrlObj = new URL(baseUrl);
  const currUrlObj = new URL(currentUrl);

  if (baseUrlObj.hostname != currUrlObj.hostname) {
    return pages;
  }

  const normCurrUrl = normalizeUrl(currentUrl);
  if (pages[normCurrUrl] > 0) {
    pages[normCurrUrl]++;
    return pages;
  }

  pages[normCurrUrl] = 1;

  try {
    const resp = await fetch(currentUrl);

    if (resp.status > 399) {
      console.log("error in fetch ", resp.status);
      return;
    }

    const contentType = resp.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log("error in fetch ");
    }

    const htmlBody = await resp.text();

    const nextUrls = getUrlsFromHtml(htmlBody, baseUrl);

    for (const nextUrl of nextUrls) {
      pages = await crawlPage(baseUrl, nextUrl, pages);
    }
  } catch (e) {
    console.log("error occured");
  }
  return pages;
}

const getUrlsFromHtml = (htmlBody, baseURL) => {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll("a");

  for (const linkElement of linkElements) {
    let link;

    if (linkElement.href.slice(0, 1) === "/") {
      // relative
      try {
        link = new URL(linkElement.href, baseURL);
        urls.push(link.href);
      } catch (err) {
        console.log("error with relative url: ", err);
      }
    } else {
      // absolute
      try {
        link = new URL(linkElement.href);
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
