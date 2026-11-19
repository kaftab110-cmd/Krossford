const fs = require('fs');
const path = require('path');

function walk(dir) {
  let out = [];
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    const s = fs.statSync(p);
    if (s.isDirectory()) {
      if (f === 'node_modules' || f === '.next' || f === '.git') continue;
      out = out.concat(walk(p));
    } else if (p.endsWith('.tsx') || p.endsWith('.ts')) {
      out.push(p);
    }
  }
  return out;
}

const open = String.fromCharCode(12304);
const close = String.fromCharCode(12305);
const pattern = new RegExp(open + "entity-[^" + close + "]*canonical_name=([^" + close + "]+)" + close, "g");

for (const file of walk("app")) {
  let text = fs.readFileSync(file, "utf-8");
  let orig = text;
  // 1. Saare kharab tags ko unke asli naam se badlo
  text = text.replace(pattern, "$1");
  // 2. About wali galat line fix karo
  text = text.replace('const DHLE = HL Express;', 'const DHLE = "D" + "HL Express";');
  text = text.replace('const D + "HLE" = "D" + "HL Express";', 'const DHLE = "D" + "HL Express";');
  if (text !== orig) {
    fs.writeFileSync(file, text, "utf-8");
    console.log("FIXED " + file);
  }
}
// Lib wale bhi check karo
for (const file of walk("lib")) {
  let text = fs.readFileSync(file, "utf-8");
  let orig = text;
  text = text.replace(pattern, "$1");
  if (text !== orig) {
    fs.writeFileSync(file, text, "utf-8");
    console.log("FIXED " + file);
  }
}
console.log("DONE - Sab tags saaf ho gaye");