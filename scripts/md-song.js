const { data, write, join, root, toSlug } = require("./shared");
const { songs, fields } = data

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

data.songNames.forEach(name => {
  const out = join(root, "songs", toSlug(name), "README.md");
  write(out, Song(name))
});
