import { getTemplate, registerComponent } from "./component/index.js";

const manifest = ["container", "dropdown", "app", "header", "main", "navbar"];

// Dumb Components
Promise.all(manifest.map(getTemplate)).then((templates) => {
  templates.forEach((template, index) => {
    if (template) {
      registerComponent(manifest[index], template);
    }
  });
});
