const { shell, data, toSlug, root, join } = require("./shared");

data.songNames.forEach(name => {
  shell.mkdir("-p", join(root, "songs", toSlug(name)))
})
