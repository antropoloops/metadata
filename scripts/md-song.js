const { shell, data, write, join, root, toSlug, toJSON } = require("./shared");
const { songs, fields } = data;

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

const normalize = song => ({
  name: song.nombreArchivo,
  slug: toSlug(song.nombreArchivo),
  album: song.album,
  artist: song.artista,
  year: song.fecha,
  country: song.lugar
});

data.songNames.forEach(name => {
  shell.mkdir("-p", join(root, "songs", toSlug(name), "data"));
  const loops = join(root, "songs", toSlug(name), "data", "loops.json");
  write(loops, toJSON(songs[name].map(normalize)));
  const song = join(root, "songs", toSlug(name), "data", "song.json");
  write(song, toJSON({ name }));
  const readme = join(root, "songs", toSlug(name), "README.md");
  write(readme, Song(name));
});
