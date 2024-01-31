const { normalizeUrl } = require("./crawl.js");
const { getUrlsFromHtml } = require("./crawl.js");
const { test, expect } = require("@jest/globals");

test("normilize url", () => {
  const input = "https://blog.boot.dev/path";
  const actual = normalizeUrl(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("normilize url strip https", () => {
  const input = "https://blog.boot.dev/path/";
  const actual = normalizeUrl(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("normilize url Capitals ", () => {
  const input = "https://Blog.boot.dev/path";
  const actual = normalizeUrl(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("normilize url strip http ", () => {
  const input = "http://blog.boot.dev/path";
  const actual = normalizeUrl(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("getUrlsFromHtml absolute", () => {
  const inputHtmlBody = `
      <html>
          <body>
              <a href="https://blog.boot.dev/path"></a>
          </body>
  
      </html>`;
  const inputBaseUrl = "https://blog.boot.dev/path";
  const actual = getUrlsFromHtml(inputHtmlBody);
  const expected = ["https://blog.boot.dev/path"];
  expect(actual).toEqual(expected);
});

test("getUrlsFromHtml relative ", () => {
  const inputHtmlBody = `
      <html>
          <body>
              <a href="/path/"></a>
          </body>
  
      </html>`;
  const inputBaseUrl = "https://blog.boot.dev";
  const actual = getUrlsFromHtml(inputHtmlBody, inputBaseUrl);
  const expected = ["https://blog.boot.dev/path/"];
  expect(actual).toEqual(expected);
});

test("getUrlsFromHtml relative ", () => {
  const inputHtmlBody = `
        <html>
            <body>
                <a href="/path/">Blog path 1</a>
                <a href="https://blog.boot.dev/path2/">Blog path 2</a>
            </body>
    
        </html>`;
  const inputBaseUrl = "https://blog.boot.dev";
  const actual = getUrlsFromHtml(inputHtmlBody, inputBaseUrl);
  const expected = [
    "https://blog.boot.dev/path/",
    "https://blog.boot.dev/path2/",
  ];
  expect(actual).toEqual(expected);
});

test("getUrlsFromHtml invalid", () => {
  const inputHtmlBody = `
          <html>
              <body>
                  <a href="invalid">Blog path 1</a>
              </body>
      
          </html>`;
  const inputBaseUrl = "https://blog.boot.dev";
  const actual = getUrlsFromHtml(inputHtmlBody, inputBaseUrl);
  const expected = [];
  expect(actual).toEqual(expected);
});
