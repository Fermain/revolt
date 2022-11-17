import { templatePath } from "../revolt.config.js";

export async function getTemplate(templateName: string) {
  const response = await fetch(`${templatePath}${templateName}.html`);
  const text = await response.text();
  const parser = new DOMParser();
  return parser.parseFromString(text, "text/html").querySelector("template");
}