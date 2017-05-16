const yaml = require("js-yaml");
const shell = require("shelljs");
const toSlug = require("to-slug-case");
const join = require("path").join;
const read = require("fs").readFileSync;
const write = require("fs").writeFileSync;
const root = join(__dirname, "..");
const toJSON = obj => JSON.stringify(obj, null, 2);

// DATA
const loops = require("./data/BDloops.json");
const fields = Object.keys(loops[0]);
const songs = loops.reduce((songs, loop) => {
  const name = loop.antropoloop;
  if (!songs[name]) songs[name] = [];
  songs[name].push(loop);
  return songs;
}, {});
const songNames = Object.keys(songs);
const data = { songNames, songs, fields };

module.exports = {
  yaml,
  data,
  shell,
  toSlug,
  join,
  read,
  write,
  root,
  toJSON
};
