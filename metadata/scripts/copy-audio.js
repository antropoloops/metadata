// # copy-audio
// given a raw/loops directory with audio files
// convert them to mp3 and save into the the song dir
const toSlugCase = require("to-slug-case");
const data = require("../BDloops.json");
const raw = require("../audio-filenames.json")
  .filter(f => /wav$/.test(f))
  .reduce((raw, f) => {
    raw[f.replace(/ \(Congelar.*$/, "")] = { filename: f };
    return raw;
  }, {});

const pluck = name => obj => obj[name];

const songs = data.reduce((songs, loop) => {
  const name = loop.antropoloop;
  if (!songs[name]) songs[name] = [];
  songs[name].push(loop);
  return songs;
}, {});

const fileNames = songs.Lik.map(pluck("nombreArchivo"));

const stats = fileNames.reduce(
  (stats, name) => {
    const match = raw[name];
    if (match) {
      match.loopname = name;
      stats.found.push(match);
    } else {
      stats.missing.push(name);
    }
    return stats;
  },
  { missing: [], found: [] }
);

stats.unused = Object.keys(raw).reduce((unused, name) => {
  if (raw[name].loopname === undefined) unused.push(raw[name].filename);
  return unused;
}, []);

process.stdout.write(
  JSON.stringify(({ missing, unused } = stats), null, 2)
);
