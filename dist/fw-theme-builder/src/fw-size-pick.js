var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
let FwSizePick = class FwSizePick extends LitElement {
    constructor() {
        super(...arguments);
        this.value = "";
    }
    handleChange(e) {
        var _a;
        let size = (_a = e.target) === null || _a === void 0 ? void 0 : _a.value;
        let detail = {
            "section": this.value,
            "value": (size + "px"),
        };
        const event = new CustomEvent('size-change', { detail, bubbles: true, composed: true });
        this.dispatchEvent(event);
    }
    render() {
        var _a;
        return html `
    <span part="size-container" class="size-container">
      <p part="size-label">${this.label}</p>
      <input
        part="size-input"
        type="number"
        value="${((_a = (this.theme.Sizes[this.value])) === null || _a === void 0 ? void 0 : _a.slice(0, -2)) || -1}"
        @change="${this.handleChange}"
      />
    </span>
    `;
    }
};
FwSizePick.styles = css `
  .size-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    height: 3.2rem;
    max-width: 6rem;
    padding: 0.2rem 0.5rem;
  }
  .size-container > input {
    width: 3rem;
    box-sizing: border-box;
    padding: 0.5rem 0.3rem;
    font-size: 1.2rem;
    border-radius: 4px;
    border: solid 1px #1b1b1b1b;
  }
  .size-container > input:focus {
    outline: solid 1px #1b1b1b4b;
  }

  .size-container > p {
    margin: 0;
    font-family: "DM Sans", sans-serif;
  }
  `;
__decorate([
    property()
], FwSizePick.prototype, "label", void 0);
__decorate([
    property()
], FwSizePick.prototype, "theme", void 0);
__decorate([
    property()
], FwSizePick.prototype, "value", void 0);
FwSizePick = __decorate([
    customElement("fw-size-pick")
], FwSizePick);
//# sourceMappingURL=fw-size-pick.js.map