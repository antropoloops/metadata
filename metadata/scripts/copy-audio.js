const shell = require("shelljs");
const path = require("path");

const from = path.join(__dirname, "../../raw/loops/");
const to = path.join(__dirname, "../../lik/");
const fullPath = filename => path.join(from, filename);

const found = require("../../lik/missing.json").found;

const convert = file => {
  const input = fullPath(file.filename);
  const output = path.join(to, file.matched + ".mp3");
  const cmd = `lame -V0 --resample 44100 "${input}" ${output}`;
  if (shell.exec(cmd)) {
    console.log("Done!");
  }
};
found.slice(0, 10).map(convert);

const print = () => {
  found.forEach(data => {
    const full = fullPath(data.filename);
    if (fs.existsSync(full)) {
      console.log("PATH", full);
      console.log("FILE", data.matched);
    }
  });
};
