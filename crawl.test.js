const { normalizeUrl } = require("./crawl.js");
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
  const input = "https://Blog.boot.dev/path/";
  const actual = normalizeUrl(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("normilize url strip http ", () => {
  const input = "http://Blog.boot.dev/path/";
  const actual = normalizeUrl(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});
