import Component from "./index.js";
import { prefix } from "../revolt.config.js";

export function registerComponent(
  templateName: string,
  template: HTMLTemplateElement,
) {
  try {
    customElements.define(
      `${prefix}-${templateName}`.toLowerCase(),
      class extends Component {
        constructor() {
          super(template);
        }
      }
    );
  } catch {
    console.error(`Failed to register component: ${templateName}`);
  }
}