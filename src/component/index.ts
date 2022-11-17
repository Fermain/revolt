export { getTemplate } from "./get.js";
export { registerComponent } from "./register.js";

export type ComponentTemplateInput = HTMLTemplateElement | string | undefined

export interface ComponentLifecycle {
  onCreate?: (element: HTMLElement) => void;
  onHydration?: (element: HTMLElement) => void;
  onRemove?: (element: HTMLElement) => void;
}

export default class Component<T> extends HTMLElement {
  public template?: HTMLTemplateElement

  constructor(template: ComponentTemplateInput, public data?: T, public lifecycle?: ComponentLifecycle) {
    if (!template) {
      throw new Error("Component must have a template");
    }
    super();
    this.setupTemplate(template);
  }

  setupTemplate(template: ComponentTemplateInput) {
    this.template = template instanceof HTMLTemplateElement ? template : this.parseTemplate(template);
    if (!this.template) {
      throw new Error("Component must have a valid template");
    }
    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.appendChild(this.template.content.cloneNode(true));
  }

  parseTemplate(htmlString?: string) {
    try {
      if (!htmlString) {
        throw new Error("Component must have a template");
      }
      const doc = (new DOMParser()).parseFromString(htmlString, "text/html");
      const template = doc.querySelector("template");
      if (!template) {
        throw new Error("Template not found");
      }
      return template
    } catch(error) {
      console.warn(error);
    }
  }
}

export interface ComponentOptions {
  specialProp: string;
}

const test = new Component<ComponentOptions>(`<temp/>`, {
  specialProp: "hello"
}, {
  onCreate: (element) => {
    console.log("created", element);
  }
})