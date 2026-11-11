const fs = require("fs");
const path = require("path");
function walk(dir, out) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== "node_modules" && e.name !== ".next") walk(p, out); }
    else if (e.name.endsWith(".tsx") || e.name.endsWith(".ts")) out.push(p);
  }
  return out;
}
const E = String.fromCharCode(101,110,116,105,116,121);
const C = String.fromCharCode(99,97,110,111,110,105,99,97,108,95,110,97,109,101);
const O1 = String.fromCharCode(12304);
const C1 = String.fromCharCode(12305);
const BAR = String.fromCharCode(124);
const p1 = new RegExp(O1 + E + "-[^" + BAR + "\n\r]+ " + BAR + C + "=([^" + C1 + "\n\r]+)" + C1, "g");
const p2 = new RegExp("\\[" + E + "-[^" + BAR + "\n\r]+ " + BAR + C + "=([^\\]\n\r]+)\\]", "g");
const files = [...walk("app", []), ...walk("components", [])];
for (const f of files) {
  const t = fs.readFileSync(f, "utf8");
  let n = t.replace(p1, "$1");
  n = n.replace(p2, "$1");
  if (t !== n) { fs.writeFileSync(f, n); console.log("Fixed", f); }
}
console.log("Done");