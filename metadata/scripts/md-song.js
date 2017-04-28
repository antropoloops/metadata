const loops = require("../BDloops.json");

const fields = Object.keys(loops[0]);
const songs = loops.reduce((songs, loop) => {
  const name = loop.antropoloop;
  if (!songs[name]) songs[name] = [];
  songs[name].push(loop);
  return songs;
}, {});
const songNames = Object.keys(songs);

const each = (list, fn) => list.map(fn).join("");

// Components

const tableHead = fields =>
  `
|${fields.join("|")}|
|${fields.map(() => " --- ").join("|")}|`;

const tableBody = (fields, rows) =>
  each(rows, row => "|" + fields.map(field => row[field]).join("|") + "|\n");

const SongItem = name =>
  `
- ${name} (${songs[name].length} loops)`;

const Song = name => {
  const song = songs[name];
  return `
# ${name}

- Number of loops: ${song.length}

## Loops
${tableHead(fields)}
${tableBody(fields, song)}
`;
};

process.stdout.write(Song("Lik"));
