const shell = require("shelljs");
const path = require("path");

const from = path.join(__dirname, "../../raw/loops/");
const to = path.join(__dirname, "../../lik/loops");
shell.mkdir(to)

const found = require("../../lik/missing.json").found;

const convert = (file, i, arr) => {
  const input = path.join(from, file.filename);
  const output = path.join(to, file.matched + ".mp3");
  const cmd = `lame -V0 --resample 44100 "${input}" ${output}`;
  if (shell.exec(cmd)) {
    console.log(`DONE ${i}/${arr.length}`)
  }
};
console.log(found.length)
found.map(convert);
