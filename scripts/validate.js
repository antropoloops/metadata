const { yaml, read, shell, chalk, join, root } = require("./shared")
const { songIds } = require("./data")

console.log(chalk.green("Validating data"))

const songs = shell.ls(join(root, "songs"))

songs.forEach(songId => {
  const data = yaml.safeLoad(read(join(root, "songs", songId, "data.yaml")))
  console.log(chalk.blue("SONG %s"), songId)
  console.log(data)
})

