const yaml = require("js-yaml");
const chalk = require("chalk")
const shell = require("shelljs");
const toSlug = require("to-slug-case");
const join = require("path").join;
const read = require("fs").readFileSync;
const write = require("fs").writeFileSync;
const root = join(__dirname, "..");
const toJSON = obj => JSON.stringify(obj, null, 2);

module.exports = {
  chalk,
  yaml,
  shell,
  toSlug,
  join,
  read,
  write,
  root,
  toJSON
};
