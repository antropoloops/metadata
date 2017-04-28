// # copy-audio
// given a raw/wavs directory with audio files
// convert them to mp3 and save into the the song dir
const toSlugCase = require("to-slug-case");
const data = require("../BDloops.json");
const raw = require("../audio-filenames.json").filter(f => /wav$/.test(f));

const pluck = name => obj => obj[name];

const songs = data.reduce((songs, loop) => {
  const name = loop.antropoloop;
  if (!songs[name]) songs[name] = [];
  songs[name].push(loop);
  return songs;
}, {});

const loops = songs.Lik
  .map(pluck("nombreArchivo"))
  .map(file => ({ name: file, slug: toSlugCase(file) }));
const wavs = raw.map(f => ({ filename: f, slug: toSlugCase(f) }));

const find = slug => {
  for (let i = 0; i < wavs.length; i++) {
    if (wavs[i].slug.startsWith(slug)) return wavs[i];
  }
};

const stats = loops.reduce(
  (stats, loop) => {
    const match = find(loop.slug);
    if (match) {
      match.matched = loop.slug;
      stats.found.push(match);
    } else {
      stats.missing.push(loop);
    }
    return stats;
  },
  { missing: [], found: [] }
);

stats.unused = wavs.reduce((unused, loop) => {
  if (!loop.matched) unused.push(loop);
  return unused;
}, []);

process.stdout.write(JSON.stringify(stats, null, 2));
