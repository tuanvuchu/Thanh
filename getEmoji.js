import fs from "fs";

const path = "node_modules/emoji-datasource-apple/emoji.json";
const data = JSON.parse(fs.readFileSync(path, "utf8"));
const filtered = data.map((item) => ({
  name: item.name,
  unified: item.unified,
  short_name: item.short_name,
  category: item.category,
}));
fs.writeFileSync(
  "public/emoji.json",
  JSON.stringify(filtered, null, 2),
  "utf8"
);

const src = "node_modules/emoji-datasource-apple/img/apple/64";
const dest = "public/64";
fs.cpSync(src, dest, { recursive: true });
