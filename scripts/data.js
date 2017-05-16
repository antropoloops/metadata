const { shell, join, root } = require("./shared");

const songIds = shell.ls(join(root, "songs"))

module.export = {
  songIds
}