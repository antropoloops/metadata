const { yaml, shell, data, write, join, root, toSlug, toJSON } = require("./shared");
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
  id: toSlug(song.nombreArchivo),
  title: song.titulo,
  album: song.album,
  artist: song.artista,
  year: song.fecha,
  country: song.lugar
});

data.songNames.forEach(name => {
  shell.mkdir("-p", join(root, "songs", toSlug(name), "data"));
  const data = join(root, "songs", toSlug(name), "data.yaml");
  write(data, yaml.safeDump({
    id: toSlug(name),
    name: name,
    loops: songs[name].map(normalize)
  }))
  const readme = join(root, "songs", toSlug(name), "README.md");
  write(readme, Song(name));
});
