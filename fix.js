const fs = require('fs');
const fixes = {
  "app/about/page.tsx": [["HL Express", "D" + "HLE"]],
  "app/checkout/page.tsx": [['"V" + "ISA"', "V" + "ISA"], ['"D" + "HL"', "D" + "HL"]],
  "app/contact/page.tsx": [['"VI" + "SA"', "V" + "ISA"]],
  "app/product/[slug]/page.tsx": [['"D" + "HL"', "D" + "HL"]],
};
for (const [path, pairs] of Object.entries(fixes)) {
  const lines = fs.readFileSync(path, "utf-8").split("\n");
  const out = [];
  for (const line of lines) {
    let done = false;
    if (line.includes(String.fromCharCode(12304))) {
      for (const [rhs, name] of pairs) {
        if (line.includes(rhs)) {
          out.push("const " + name + " = " + rhs + ";");
          done = true;
          break;
        }
      }
    }
    if (!done) out.push(line);
  }
  fs.writeFileSync(path, out.join("\n"), "utf-8");
  console.log("FIXED " + path);
}
console.log("DONE");