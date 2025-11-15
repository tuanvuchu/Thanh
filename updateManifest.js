import fs from "fs";

const distDir = "./dist/assets";
const manifestPath = "./dist/manifest.json";
const files = fs.readdirSync(distDir);
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
files.forEach((p) => {
  if (p.startsWith("background-")) {
    manifest.background.service_worker = `assets/${p}`;
  }
});

if (Array.isArray(manifest.content_scripts)) {
  manifest.content_scripts.forEach((script) => {
    // Cập nhật JS
    if (Array.isArray(script.js)) {
      script.js = script.js.map((jsFile) => {
        const baseName = jsFile.replace("assets/", "").replace(".js", "");
        const matchedFile = files.find(
          (file) => file.startsWith(`${baseName}-`) && file.endsWith(".js"),
        );
        return matchedFile ? `assets/${matchedFile}` : jsFile;
      });
    }

    // Cập nhật CSS
    if (Array.isArray(script.css)) {
      script.css = script.css.map((cssFile) => {
        const baseName = cssFile.replace("assets/", "").replace(".css", "");
        const matchedFile = files.find(
          (file) => file.startsWith(`${baseName}-`) && file.endsWith(".css"),
        );
        return matchedFile ? `assets/${matchedFile}` : cssFile;
      });
    }
  });
}

if (Array.isArray(manifest.web_accessible_resources)) {
  manifest.web_accessible_resources.forEach((script) => {
    script.resources = script.resources.map((resource) => {
      const baseName = resource.replace("assets/", "").replace(".js", "");
      const matchedFile = files.find((file) => file.startsWith(`${baseName}-`));
      return matchedFile ? `assets/${matchedFile}` : resource;
    });
  });
}

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
